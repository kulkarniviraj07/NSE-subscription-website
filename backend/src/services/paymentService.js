const razorpay =
    require(
        "../config/razorpay"
    );

async function createOrder() {

    const order =

        await razorpay.orders.create({

            amount:
                119 * 100,

            currency:
                "INR",

            receipt:
                `rcpt_${Date.now()}`

        });

    return order;

}

module.exports = {

    createOrder

};