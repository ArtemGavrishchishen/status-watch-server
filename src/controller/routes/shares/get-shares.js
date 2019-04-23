const path = require("path");
const fs = require("fs");
const util = require("util");

const filePath = path.join(__dirname, "../../../../", "data", "shares.json");
const readFileAsync = util.promisify(fs.readFile);

const getShares = (req, res) => {
  const sendResponse = data => {
    const parsedData = JSON.parse(data);
    const count = parsedData.length;

    res.status(200);
    res.json({
      status: "success",
      shares: parsedData,
      count: count
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

module.exports = getShares;
