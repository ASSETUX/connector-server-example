import axios from "axios";
import crypto from "crypto";

import {
  ASSETUX_TOKEN,
  ASSETUX_TOKEN_ALGORITHM,
  ASSETUX_BACKEND_URL,
} from "../secrets/env.js";

const webhook = async (req, res) => {
  try {
    const { paymentId, amount, email } = req.body.data;

    const preparedString = `${paymentId}:${amount}`;

    const signature = crypto
      .createHmac(ASSETUX_TOKEN_ALGORITHM, ASSETUX_TOKEN)
      .update(preparedString)
      .digest("hex");

    if (signature !== req.headers.signature) throw new Error("Wrong signature"); // verify signature

    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: error.message || "Internal Server Error" });
  }
};

const createPayment = async () => {
  try {
    const { data } = await axios.post(
      `${ASSETUX_BACKEND_URL}/api/v4/payment/create`,
      {
        amountIn: 500,
        currency: "KZT",
        paymentMethod: "QIWIVISAMASTER",
        creditCard: "2200220022002200",
        email: "wifi-215@yandex.ru",
        lang: "ru",
      },
      {
        headers: {
          "ASSETUX-V4-TOKEN": ASSETUX_TOKEN,
        },
      }
    );

    console.log(data);

    res.status(200);
  } catch (err) {
    console.log(err.response.data);
    res.json(400);
  }
};

export { webhook, createPayment };
