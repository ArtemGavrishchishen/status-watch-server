const path = require("path");
const fs = require("fs");
const util = require("util");

const filePath = path.join(__dirname, "../../../../", "data", "watches.json");
const readFileAsync = util.promisify(fs.readFile);

const getWatchesHit = (req, res) => {
  const sendResponse = data => {
    const parsedData = JSON.parse(data);
    const hit = parsedData.filter(item => item.label === "hit");
    const hitCount = hit.length;

    res.status(200);
    res.json({
      status: "success",
      watches: hit,
      count: hitCount
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

module.exports = getWatchesHit;
