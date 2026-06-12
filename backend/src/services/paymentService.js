const razorpay =
    require(
        "../config/razorpay"
    );

async function createOrder(
    amount
) {

    const order =

        await razorpay.orders.create({

            amount:
                Math.round(amount * 100),

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
