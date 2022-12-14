const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1M6LwYGjvQ8kI9VgOr3LaxCt",
            quantity: 1,
          },
        ],
        metadata: {
          reservation: req.body,
          type: "cancel",
        },
        mode: "payment",
        success_url: `${req.headers.origin}/profile`,
        cancel_url: `${req.headers.origin}/hotels`,
      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
