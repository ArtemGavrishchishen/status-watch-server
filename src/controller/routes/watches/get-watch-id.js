const path = require("path");
const fs = require("fs");
const util = require("util");

const filePath = path.join(__dirname, "../../../../", "data", "watches.json");
const readFileAsync = util.promisify(fs.readFile);

const getWatchId = (req, res) => {
  const id = req.params.id;

  const sendResponse = data => {
    const parsedData = JSON.parse(data);
    const watchId = parsedData.find(watch => watch.id === id);

    res.status(200);
    res.json({
      status: "success",
      watches: watchId
    });
  };

  const sendError = err => {
    res.status(400);
    res.json({
      status: "error",
      error: err
    });
  };

  readFileAsync(filePath, "utf8")
    .then(sendResponse)
    .catch(sendError);
};

module.exports = getWatchId;
