const app = require("express")();
const morgan = require("morgan");
const http = require("http").createServer(app);
const body_parser = require("body-parser");
const allRoutes = require('./routes/routes');

// middleware
app.use(morgan("common"));
app.use(body_parser.json());

// endpoint
app.use("/",allRoutes);

// server
http.listen(8000, () => {
    console.log("server running at port 8000");
})
