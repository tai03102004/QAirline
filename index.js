const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// Hide important things
require("dotenv").config();

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

// file pug
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');

// Connected Databsae
const database = require("./config/database");
database.connect();

// Flash
const flash = require("express-flash");
app.use(flash());

// Cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser("LHNASDASDAD"));

// Session
const session = require("express-session");
app.use(session({
    cookie: {
        maxAge: 60000
    }
}));

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

//method-override:  use patch , delete ,.. 
const methodOverride = require('method-override');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// moment
const moment = require('moment');
// local moment
app.locals.moment = moment;

// Routes Client
const routeClient = require("./routes/client/index.route.js");
routeClient(app);

// Routes Admin
const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);

// Import router
const loginRouter = require('./routes/client/login.route.js');

// Đăng ký router
app.use('/login', loginRouter);

// /admin
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
