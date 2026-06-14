const fetchBseGlobal =
    require("../services/fetchBseGlobal");

const repo =
    require("../repositories/announcementRepository");

const jobRepo =
    require("../repositories/downloadJobRepository");

const bseCompanies =
    require("../config/bseCompanies");

const symbolProvider =
    require("../services/symbolProvider");

const metrics =
    require("../services/metrics");

const processing =
    new Set();


async function saveAnnouncement(
    symbol,
    item
) {

    if (
        !item.attchmntFile
    ) {
        return;
    }

    if (
        processing.has(item.attchmntFile)
    ) {
        return;
    }

    processing.add(item.attchmntFile);

    try {

        const filename =
            `BSE_${symbol}_${item.dt}.pdf`;

        const inserted =

            await repo.save({

                company_symbol:
                    symbol,

                title:
                    item.desc,

                pdf_url:
                    item.attchmntFile,

                local_path:
                    `storage/pdf/${filename}`,

                announcement_time:
                    item.sort_date,

                download_status:
                    "PENDING"

            });

        if (
            !inserted
        ) {
            return;
        }

        console.log(
            `\nBSE Queued: ${symbol}\nTitle: ${item.desc}`
        );

        await jobRepo.add(
            item.attchmntFile,
            filename
        );

        metrics.increment("downloads");

    }
    finally {

        processing.delete(item.attchmntFile);

    }

}


async function checkBseAnnouncements() {

    console.log(
        "\n=== BSE Cycle ==="
    );

    metrics.increment("cycles");

    const symbols =
        await symbolProvider.getSymbols();

    if (
        symbols.length === 0
    ) {

        console.log(
            "\nNo subscribed companies. Skipping BSE cycle."
        );

        return;

    }

    // Reverse map: BSE scrip code -> subscribed NSE symbol. Only companies
    // that actually have a BSE scrip code are monitored on BSE.
    const scripToSymbol =
        new Map();

    for (
        const raw
        of symbols
    ) {

        const symbol =
            String(raw).toUpperCase().trim();

        const code =
            bseCompanies[symbol];

        if (
            code
        ) {

            scripToSymbol.set(
                String(code).trim(),
                symbol
            );

        }

    }

    if (
        scripToSymbol.size === 0
    ) {

        console.log(
            "\nNo subscribed companies have a BSE scrip code. Skipping BSE cycle."
        );

        return;

    }

    console.log(
        `\nBSE monitoring ${scripToSymbol.size} subscribed companies via global feed`
    );

    // One request returns ALL companies' recent announcements; filter locally.
    const records =
        await fetchBseGlobal();

    let matched =
        0;

    for (
        const item
        of records
    ) {

        const symbol =
            scripToSymbol.get(item.scrip_cd);

        if (
            !symbol
        ) {
            continue;
        }

        matched++;

        await saveAnnouncement(symbol, item);

    }

    metrics.increment("companies", matched);
    metrics.print();

    console.log(
        "\nBSE Cycle Complete"
    );

}

module.exports =
    checkBseAnnouncements;
