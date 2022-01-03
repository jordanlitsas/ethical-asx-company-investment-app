const stripe = require("stripe")("sk_test_51Jf4PRGskhQpu1HfyCmJgOWKWFAdbJv8UErHdtw3hWqYlIz4zDL7Bq797Y88M4kdkD6BF2qI9PTXxjSdZzML86Os00ETHrnJSn");


const stripePayment = async (req, res) => {
    try {
        console.log(req.body);
        const product = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: 'aud',
                       product_data: {
                        name: product.name,
                        images: [product.image],
                       },
                       unit_amount: product.amount * 100,
                    },
                    quantity: product.quantity
                },
            ],
            mode: "payment",
            success_url: 'http://localhost:8080/PaymentSuccess.html',
            cancel_url: 'http://localhost:8080/PaymentError.html',
        });
        res.status(200).json({id: session.id, url: session.url});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.stripePayment = stripePayment;