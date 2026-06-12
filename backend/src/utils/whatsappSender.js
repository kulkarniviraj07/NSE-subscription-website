/**
 * whatsappSender.js
 * Sends a plain-text WhatsApp message via Meta Cloud API.
 * Used by authController to deliver OTPs via WhatsApp.
 */

const https = require("https");

/**
 * Send a text message to `toPhone` using the Meta WhatsApp Cloud API.
 * @param {string} toPhone  - E.164 phone number without +, e.g. "919876543210"
 * @param {string} message  - The text body to send
 * @returns {Promise<object>} - Resolves with the parsed Meta API response
 */
async function sendWhatsAppText(toPhone, message) {
    const token   = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!token || !phoneId) {
        throw new Error(
            "WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID not set in .env"
        );
    }

    // Normalise the phone: strip leading + if present, prepend 91 if 10-digit
    let phone = toPhone.replace(/\D/g, "");
    if (phone.length === 10) phone = "91" + phone;

    const body = JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message },
    });

    return new Promise((resolve, reject) => {
        const options = {
            hostname: "graph.facebook.com",
            path:     `/v19.0/${phoneId}/messages`,
            method:   "POST",
            headers: {
                "Authorization":  `Bearer ${token}`,
                "Content-Type":   "application/json",
                "Content-Length": Buffer.byteLength(body),
            },
        };

        const req = https.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => { data += chunk; });
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsed);
                    } else {
                        reject(new Error(
                            `WhatsApp API error ${res.statusCode}: ${data}`
                        ));
                    }
                } catch (e) {
                    reject(new Error(`WhatsApp parse error: ${data}`));
                }
            });
        });

        req.on("error", reject);
        req.write(body);
        req.end();
    });
}

module.exports = { sendWhatsAppText };
