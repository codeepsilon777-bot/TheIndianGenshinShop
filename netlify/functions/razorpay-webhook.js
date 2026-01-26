const crypto = require("crypto");

exports.handler = async (event) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = event.headers["x-razorpay-signature"];
  const body = event.body;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return {
      statusCode: 400,
      body: "Invalid signature"
    };
  }

  const payload = JSON.parse(body);

  // At this point, payment is verified
  console.log("Verified payment:", payload.event);

  return {
    statusCode: 200,
    body: "OK"
  };
};
