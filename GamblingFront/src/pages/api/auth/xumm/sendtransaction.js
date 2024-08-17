const { XummSdk } = require("xumm-sdk");

export default async function handler(req, res) {
    try {
        const xumm = new XummSdk(
            process.env.XUMM_KEY,
            process.env.XUMM_KEY_SECRET
        );
        const trans = {
            txjson: {
                TransactionType: "Payment",
                Amount: (req.query.depositAmount * (10 ** 6)).toString(),
                Destination: req.query.depositAddress,
            },
        };
        const payload = await xumm.payload.create(trans, true);
        res.status(200).json({ payload: payload });
    } catch (error) {
        res.status(400).json(error);
    }
}