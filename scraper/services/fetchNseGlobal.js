const axios =
    require("axios");

const limiter =
    require("./requestLimiter");

const retry =
    require("./retry");

/**
 * Fetch ONE page of NSE's GLOBAL corporate-announcements feed.
 *
 * This is the same endpoint as the per-symbol fetch, but WITHOUT a `symbol`
 * param — so a single request returns the most recent announcements across
 * ALL companies (newest first). We page through a few of these per cycle and
 * filter locally to subscribed symbols, instead of making one slow request
 * per company (which does not scale past a handful of symbols).
 *
 * Returns [] on failure so a transient error never blanks out the cycle.
 */
async function fetchNsePage(
    pageNo
) {

    return limiter.execute(

        () => retry(

            async () => {

                const response =

                    await axios.get(

                        "https://www.nseindia.com/api/corporate-announcements",

                        {

                            params: {
                                index: "equities",
                                pageNo
                            },

                            headers: {
                                "User-Agent": "Mozilla/5.0"
                            },

                            timeout: 15000

                        }

                    );

                return (
                    response.data
                    ||
                    []
                );

            },

            3,

            2000

        )

    )

        .catch(

            err => {

                console.log(
                    `NSE global feed page ${pageNo} failed: ${err.message}`
                );

                return [];

            }

        );

}

module.exports =
    fetchNsePage;
