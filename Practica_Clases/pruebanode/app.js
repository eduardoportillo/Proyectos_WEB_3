let express = require('express');
let cors = require('cors');
let app = express()
let http = require('http').createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

//use express-slowdown
const slowDown = require("express-slow-down");

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

const speedLimiter = slowDown({
  windowMs: 2 * 60 * 1000, // 1 minutes
  delayAfter: 50, // allow 100 requests per 1 minutes, then...
  delayMs: 100 // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});

//  apply to all requests
app.use(speedLimiter);




app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

const db = require("./models");
db.sequelize.sync().then(() => {
    console.log("db resync");
});


require("./routes/prueba.routes")(app);
require("./routes/persona.routes")(app);

http.listen(3000, '0.0.0.0',() => {
    console.log('listening on *:3000');
});
