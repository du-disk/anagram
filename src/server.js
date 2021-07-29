/**
 * @title Initial Server
 * @date July 29, 2021 19:20
 * @author Dudi Iskandar
 */

require('dotenv').config();

const app = require('express')();
const config = require('./configs/config');

const router = require('./routers');
/**
 * Static Router
 * for check service is running
 */
app.use('/ping', (req, res) => {
    res.send("PONG!!!")
});

app.use('/', router);
/**
 * Listen service on port {process.env.SERVERPORT || 3003}
 */

app.listen(config.PORT, () => {
    console.log(`Server running on port: ${config.PORT} at ${new Date()}`)
});
