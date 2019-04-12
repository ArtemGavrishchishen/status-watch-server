const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../../../", "db", "db.json");

const getHomePageInfo = (request, response) => {
  const dbJson = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(dbJson);

  response.set("Content-Type", "application/json");
  response.header("Access-Control-Allow-Origin", "*");
  response.status(200);
  response.json({
    status: "success",
    shares: data.shares,
    watches: data.watches
  });
};

module.exports = getHomePageInfo;
