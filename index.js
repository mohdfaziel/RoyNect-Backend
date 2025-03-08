const express = require('express');
const axios = require('axios');
require('dotenv').config();
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const DELHIVERY_API_KEY = process.env.DELHIVERY_API;
const DELHIVERY_URL = process.env.DELHIVERY_SHIPPING_URL;

app.get('/',(req,res)=>{
    res.send(`Dawood-Beekeeper server is running on port ${PORT}`);
});
app.get('/api/city-state',async (req,res)=>
{
    const {pincode} = req.query;
    const response = await fetch(`https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`,
      {
          method: "GET",
          headers: {
              "Authorization": `Token ${DELHIVERY_API_KEY}`,
              "Accept": "application/json"
          }
      }
  );
  const data = await response.json();
  res.json(data);
});

app.get('/api/shipping-cost', async (req, res) => {
    const { origin_pincode, dest_pincode, weight } = req.query; // Get query params

    try {
        const response = await axios.get(DELHIVERY_URL, {
            params: {
                md: "E",
                cgm: (weight*1000),   // Weight in grams
                o_pin: origin_pincode,  // Origin Pincode
                d_pin: dest_pincode,    // Destination Pincode
                ss: "Delivered" 
            },
            headers: {
                'Authorization': `Token ${DELHIVERY_API_KEY}`
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching shipping cost", error: error.message });
    }
});

app.post("/api/order", async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      const options = req.body;
      const order = await razorpay.orders.create(options);
      if (!order) {
        return res.status(500).send("Some error occured");
      }
      res.json(order);
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  });

  app.post("/api/order/validate", async (req, res) => {
    try {
     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
      shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = shasum.digest("hex");
      if (digest !== razorpay_signature) {
        return res.status(400).json({msg:"Transaction not legit!"});
      }
      res.json({ msg: "Payment successful", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
