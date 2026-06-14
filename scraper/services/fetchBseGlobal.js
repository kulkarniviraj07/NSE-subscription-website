const axios = require("axios");
const https = require("https");
const http = require("http");

const limiter = require("./requestLimiter");
const retry = require("./retry");

https.globalAgent = new https.Agent({
    insecureHTTPParser: true,
    keepAlive: true
});

http.globalAgent = new http.Agent({
    insecureHTTPParser: true,
    keepAlive: true
});

const BSE_API_BASE =
    "https://api.bseindia.com/BseIndiaAPI/api";

const BSE_ATTACHMENT_BASE =
    "https://www.bseindia.com/xml-data/corpfiling/AttachLive/";

const BSE_AXIOS_OPTS = {
    httpAgent: http.globalAgent,
    httpsAgent: https.globalAgent
};

/**
 * Fetch BSE's GLOBAL announcements feed for the last ~2 days in ONE request
 * (strScrip empty => all scrips), instead of one request per company. Each
 * row carries its own SCRIP_CD, which the watcher maps back to a subscribed
 * symbol. Returns [] on failure so a transient error never blanks the cycle.
 */
async function fetchBseGlobal() {

    const toDate =
        formatDate(new Date());

    const fromDate =
        formatDate(
            new Date(
                Date.now() -
                2 * 24 * 60 * 60 * 1000
            )
        );

    return limiter.execute(

        () =>
            retry(

                async () => {

                    const response =
                        await axios.get(

                            `${BSE_API_BASE}/AnnSubCategoryGetData/w`,

                            {
                                ...BSE_AXIOS_OPTS,

                                params: {
                                    strCat: "-1",
                                    strPrevDate: fromDate,
                                    strToDate: toDate,
                                    strScrip: "",
                                    strSearch: "P",
                                    strType: "C",
                                    subcategory: "-1"
                                },

                                headers: {
                                    "User-Agent":
                                        "Mozilla/5.0",
                                    "Referer":
                                        "https://www.bseindia.com/",
                                    "Origin":
                                        "https://www.bseindia.com",
                                    "Accept":
                                        "application/json"
                                },

                                timeout: 20000
                            }

                        );

                    const data =
                        response.data;

                    if (
                        !data ||
                        data.Status === false
                    ) {

                        return [];

                    }

                    const rows =
                        data.Table || [];

                    return rows.map(row => ({

                        scrip_cd:
                            String(
                                row.SCRIP_CD ||
                                row.SCRIPCD ||
                                row.scrip_cd ||
                                ""
                            ).trim(),

                        desc:
                            row.NEWSSUB ||
                            row.HEADLINE ||
                            "",

                        sort_date:
                            row.DT_TM ||
                            row.News_submission_dt,

                        dt:
                            (
                                row.DT_TM ||
                                row.News_submission_dt ||
                                ""
                            )
                                .replace(/[: ]/g, "_"),

                        attchmntFile:
                            row.ATTACHMENTNAME
                                ?
                                `${BSE_ATTACHMENT_BASE}${row.ATTACHMENTNAME}`
                                :
                                null,

                        news_id:
                            row.NEWSID,

                        category:
                            row.CATEGORYNAME,

                        exchange:
                            "BSE"

                    }));

                },

                3,
                2000

            )

    ).catch(err => {

        console.log(
            `BSE global feed failed: ${err.message}`
        );

        return [];

    });

}

function formatDate(date) {

    const y =
        date.getFullYear();

    const m =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const d =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${y}${m}${d}`;

}

module.exports =
    fetchBseGlobal;
