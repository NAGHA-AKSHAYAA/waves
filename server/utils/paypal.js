const paypal = require('@paypal/checkout-server-sdk')
require('dotenv').config();

let clientId = process.env.PAYPAL_CLIENT_ID
let clientSecret = process.env.PAYPAL_CLIENT_SECRET
console.log(clientId, clientSecret)
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
let client = new paypal.core.PayPalHttpClient(environment)

module.exports = {
    client
}