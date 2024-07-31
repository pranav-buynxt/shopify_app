const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();
const crypto = require('crypto');
const nonce = require('nonce')();
const request = require('request-promise');
const querystring = require('querystring');
const cookie = require('cookie');

const app = express();
const port = 5000;

const frontendURL = process.env.ondc_frontendURL;
// Database configuration
const dbConfig = {
    user: process.env.ondc_DB_USER,
    password:"W#BhaGn4Jyr8@oM",
    server: process.env.ondc_DB_SERVER,
    database: process.env.ondc_DB_NAME,
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: true // Allow self-signed certificates
    }
};

// Connect to the database
sql.connect(dbConfig)
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Database connection failed:', err));

// Middleware
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
  }));


// Sample route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});
//demo
app.get('/users', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT top 10 * FROM EL_ITEMS_ATTRIBUTES');
        console.log(result.recordset);
        res.json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Server Error');
    }
});

//insert form data
app.post('/save-form', (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData);
    res.status(200).json({ message: 'Form data saved successfully!' });
  });



//shopify API's below
app.get('/shopify-api', (req, res) => {
    const shopName = req.query.shop;
    if (shopName) {
        const shopState = nonce();
        const redirectURL = encodeURIComponent(process.env.ondc_SHOPIFY_APP_URL + '/shopify-api/callback');
        const shopifyURL = `https://${shopName}/admin/oauth/authorize?client_id=${process.env.ondc_SHOPIFY_API_KEY}&scope=${process.env.ondc_SHOPIFY_API_SCOPES}&state=${shopState}&redirect_uri=${redirectURL}`;

        res.cookie('state', shopState);
        res.redirect(shopifyURL);
    } else {
        res.status(400).send('Missing "Shop Name" parameter!!');
    }
});



//previous one

// app.get('/shopify-api/callback', (req, res) => {
//     const { shop, hmac, code, state } = req.query;
//     const stateCookie = cookie.parse(req.headers.cookie).state;

//     if (state !== stateCookie) {
//         return res.status(403).send('Request origin cannot be verified');
//     }

//     if (shop && hmac && code) {
//         const queryMap = Object.assign({}, req.query);
//         delete queryMap.signature;
//         delete queryMap.hmac;

//         const message = querystring.stringify(queryMap);
//         const providedHmac = Buffer.from(hmac, 'utf-8');
//         const generatedHash = Buffer.from(crypto.createHmac('sha256', process.env.ondc_SHOPIFY_API_SECRET).update(message).digest('hex'), 'utf-8');

//         let hashEquals = false;

//         try {
//             hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
//         } catch (e) {
//             hashEquals = false;
//         }

//         if (!hashEquals) {
//             return res.status(400).send('HMAC validation failed');
//         }

//         const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
//         const accessTokenPayload = {
//             client_id: process.env.ondc_SHOPIFY_API_KEY,
//             client_secret: process.env.ondc_SHOPIFY_API_SECRET,
//             code,
//         };

//         request.post(accessTokenRequestUrl, { json: accessTokenPayload })
//             .then((accessTokenResponse) => {
//                 const accessToken = accessTokenResponse.access_token;
//                 const shopRequestURL = `https://${shop}/admin/api/2020-04/shop.json`;
//                 const shopRequestHeaders = { 'X-Shopify-Access-Token': accessToken };

//                 request.get(shopRequestURL, { headers: shopRequestHeaders })
//                     .then((shopResponse) => {
//                         res.redirect(`${frontendURL}?shop=${shop}`);

//                     })
//                     .catch((error) => {
//                         res.status(error.statusCode).send(error.error.error_description);
//                     });
//             })
//             .catch((error) => {
//                 res.status(error.statusCode).send(error.error.error_description);
//             });
//     } else {
//         res.status(400).send('Required parameters missing');
//     }
// });


app.get('/shopify-api/callback', (req, res) => {
    const { shop, hmac, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).state;

    if (state !== stateCookie) {
        return res.status(403).send('Request origin cannot be verified');
    }

    if (shop && hmac && code) {
        const queryMap = Object.assign({}, req.query);
        delete queryMap.signature;
        delete queryMap.hmac;

        const message = querystring.stringify(queryMap);
        const providedHmac = Buffer.from(hmac, 'utf-8');
        const generatedHash = Buffer.from(crypto.createHmac('sha256', process.env.ondc_SHOPIFY_API_SECRET).update(message).digest('hex'), 'utf-8');

        let hashEquals = false;

        try {
            hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
        } catch (e) {
            hashEquals = false;
        }

        if (!hashEquals) {
            return res.status(400).send('HMAC validation failed');
        }

        const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
        const accessTokenPayload = {
            client_id: process.env.ondc_SHOPIFY_API_KEY,
            client_secret: process.env.ondc_SHOPIFY_API_SECRET,
            code,
        };

        request.post(accessTokenRequestUrl, { json: accessTokenPayload })
            .then((accessTokenResponse) => {
                const accessToken = accessTokenResponse.access_token;
                const shopRequestURL = `https://${shop}/admin/api/2020-04/shop.json`;
                const shopRequestHeaders = { 'X-Shopify-Access-Token': accessToken };

                // Save shop and access token to the database
                const saveToDatabase = async () => {
                    try {
                        const pool = await sql.connect(config);
                        await pool.request()
                            .input('shop', sql.NVarChar, shop)
                            .input('accessToken', sql.NVarChar, accessToken)
                            .query('INSERT INTO Shops (shop, accessToken) VALUES (@shop, @accessToken)');
                        
                        request.get(shopRequestURL, { headers: shopRequestHeaders })
                            .then((shopResponse) => {
                                res.redirect(`${frontendURL}?shop=${shop}`);
                            })
                            .catch((error) => {
                                res.status(error.statusCode).send(error.error.error_description);
                            });
                    } catch (err) {
                        res.status(500).send('Database error');
                    }
                };

                saveToDatabase();
            })
            .catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
            });
    } else {
        res.status(400).send('Required parameters missing');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
