const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use("/assets", express.static(`${__dirname}/assets`));
app.use("/css", express.static(`${__dirname}/assets/css`));
app.use("/script", express.static(`${__dirname}/assets/js`));

app.get("/", (req, res) => res.render("pages/index"));

app.listen(process.env.PORT || 8080, err => {
    if (err) throw err;
    console.log("Server is up!")
});
