const express = require('express');
const cors = require('cors');
require("dotenv").config();
const SSLCommerzPayment = require('sslcommerz-lts');
const { ObjectId } = require('mongodb');
const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASS;
const is_live = false;


// Ports
const port = process.env.PORT || 5000;
const app = express();


// Middleware.
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json({ limit: '50mb' }));


// Server Code.
async function run() {
    try {
        // await client.connect();

        // 
        app.post('/order', async (req, res) => {
            const tran_id = new ObjectId().toString();
            // console.log(req.body);
            const data = {
                total_amount: 100,
                currency: 'BDT',
                tran_id: tran_id,
                success_url: 'http://localhost:3030/success',
                fail_url: 'http://localhost:3030/fail',
                cancel_url: 'http://localhost:3030/cancel',
                ipn_url: 'http://localhost:3030/ipn',
                shipping_method: 'Courier',
                product_name: 'Computer.',
                product_category: 'Electronic',
                product_profile: 'general',
                cus_name: 'Customer Name',
                cus_email: 'customer@example.com',
                cus_add1: 'Dhaka',
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: '01711111111',
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            };
            // console.log(data);
            const sslcz = new SSLCommerzPayment(
                store_id,
                store_passwd,
                is_live
            )
            sslcz.init(data).then(apiResponse => {
                // Redirect the user to payment gateway
                let GatewayPageURL = apiResponse.GatewayPageURL
                res.send({ url: GatewayPageURL });
                //     console.log('Redirecting to: ', GatewayPageURL)
            });
        });

    }
    finally {
        // await client.close();
    }
};
run().catch(console.dir);



// Default Get.
app.get('/', (req, res) => {
    res.send('Running MF_House_Server');
});


// Listening Port.
app.listen(port, () => {
    console.log('server running on port:', port);
});