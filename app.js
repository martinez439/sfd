// // const express = require('express')
// // const app = express()
// // const port = 3000

// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })

// // app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`)
// // })




// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
// const express = require("express");
// const path = require("path");

// // Initialize WooCommerce API client
// const WooCommerce = new WooCommerceRestApi({
//   url: "https://sundayfundaysoccer.org",
//   consumerKey: "ck_8a36b6f19fc67ee056452b5ca0b73df104914f75",
//   consumerSecret: "cs_dc4107b0459af3c655b9a909ff739e303210698f",
//   version: "wc/v3"
// });

// // Initialize Express app
// const app = express();
// const PORT = 3000;

// // Serve static files (if needed)
// app.use(express.static(path.join(__dirname, "public")));

// // Endpoint to fetch orders
// app.get("/orders", async (req, res) => {
//   try {
//     const response = await WooCommerce.get("orders");
//     const orders = response.data.map(order => ({
//       id: order.id,
//       billing_email: order.billing.email,
//       billing_phone: order.billing.phone,
//       playernames_: order.meta_data.find(meta => meta.key === "playernames_")?.value,
//       teammatereq_: order.meta_data.find(meta => meta.key === "teammatereq_")?.value,
//       over14_: order.meta_data.find(meta => meta.key === "over14_")?.value,
//       teamname_: order.meta_data.find(meta => meta.key === "teamname_")?.value,
//       date_paid: order.date_paid
//     }));
//     res.json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error.response ? error.response.data : error.message);
//     res.status(500).send("Error fetching orders");
//   }
// });

// // Endpoint to serve HTML page
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running at ${PORT}`);
// });

// // HTML (index.html) and CSS (style.css) content should be added in a public folder.

// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
// const express = require("express");
// const path = require("path");
// const compression = require("compression");
// const helmet = require("helmet");

// // Initialize WooCommerce API client
// const WooCommerce = new WooCommerceRestApi({
//   url: process.env.WC_API_URL || "https://sundayfundaysoccer.org",
//   consumerKey: process.env.WC_CONSUMER_KEY || "ck_8a36b6f19fc67ee056452b5ca0b73df104914f75",
//   consumerSecret: process.env.WC_CONSUMER_SECRET || "cs_dc4107b0459af3c655b9a909ff739e303210698f",
//   version: "wc/v3"
// });

// // Initialize Express app
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware for security and performance
// app.use(compression());
// app.use(helmet());

// // Serve static files
// app.use(express.static(path.join(__dirname, "public")));

// // Endpoint to fetch orders
// app.get("/orders", async (req, res) => {
//   try {
//     const response = await WooCommerce.get("orders");
//     const orders = response.data.map(order => ({
//       id: order.id,
//       billing_email: order.billing.email,
//       billing_phone: order.billing.phone,
//       playernames_: order.meta_data.find(meta => meta.key === "playernames_")?.value,
//       teammatereq_: order.meta_data.find(meta => meta.key === "teammatereq_")?.value,
//       over14_: order.meta_data.find(meta => meta.key === "over14_")?.value,
//       teamname_: order.meta_data.find(meta => meta.key === "teamname_")?.value,
//       date_paid: order.date_paid
//     }));
//     res.json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error.response ? error.response.data : error.message);
//     res.status(500).send("Error fetching orders");
//   }
// });

// // Endpoint to serve HTML page
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });

// // HTML (index.html) and CSS (style.css) content should be added in a public folder.


const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");

// Initialize WooCommerce API client
const WooCommerce = new WooCommerceRestApi({
  url: process.env.WC_API_URL || "https://sundayfundaysoccer.org",
  consumerKey: process.env.WC_CONSUMER_KEY || "ck_8a36b6f19fc67ee056452b5ca0b73df104914f75",
  consumerSecret: process.env.WC_CONSUMER_SECRET || "cs_dc4107b0459af3c655b9a909ff739e303210698f",
  version: "wc/v3",
  queryStringAuth: true 
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for security and performance
app.use(compression());
app.use(helmet());

// Log route access
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Endpoint to fetch orders
app.get("/orders", async (req, res) => {
  console.log("Fetching orders...");
  try {
    const response = await WooCommerce.get("orders");
    const orders = response.data.map((order) => ({
      id: order.id,
      billing_email: order.billing.email,
      billing_phone: order.billing.phone,
      playernames_: order.meta_data.find((meta) => meta.key === "playernames_")?.value,
      teammatereq_: order.meta_data.find((meta) => meta.key === "teammatereq_")?.value,
      over14_: order.meta_data.find((meta) => meta.key === "over14_")?.value,
      teamname_: order.meta_data.find((meta) => meta.key === "teamname_")?.value,
      date_paid: order.date_paid,
    }));
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.response ? error.response.data : error.message);
    res.status(500).send("Error fetching orders");
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to serve HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
 // console.log(`Server is running at http://localhost:${PORT}`);
 console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
