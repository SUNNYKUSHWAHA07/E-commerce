const express = require("express")
const app  = express();
const indexRouter = require("./routes")
const authRouter = require("./routes/auth")
const adminRouter = require("./routes/admin")
const productRouter = require("./routes/product")
const categoryRouter = require("./routes/category")
const userRouter = require("./routes/user")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
const paymentRouter = require("./routes/payment")
const expressSession = require("express-session")
const path = require("path")
const cookieParser = require("cookie-parser");
const passport = require("passport");

require("dotenv").config();
require("./config/db")

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
})
);
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser());

require("./config/google_auth_config");



app.use("/" , indexRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentRouter);
app.use("/order", orderRouter);

app.listen(process.env.PORT || 3000 );



