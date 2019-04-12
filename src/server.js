const bodyParser = require("body-parser");
const morgan = require("morgan");

const { app, routes } = require("./controller");

const errorHandler = (req, res, next) => {
  res.status(404).send("Page not found");
  next();
};

const startServer = port => {
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan("dev"))
    .use("/", routes)
    .use(errorHandler);

  app.listen(port);

  console.log("Server: http://localhost:" + port);
};

module.exports = startServer;