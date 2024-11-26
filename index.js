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

// Routes Client
const routeClient = require("./routes/client/index.route.js");
routeClient(app);

// Routes Admin
const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);


// /admin
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})