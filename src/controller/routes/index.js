const express = require("express");

const getWatchesHit = require("./watches/get-watches-hit");
const getAllWatches = require("./watches/get-all-watches");
const getWatchId = require("./watches/get-watch-id");
const getShares = require("./shares/get-shares");

const apiRoutes = express.Router();

apiRoutes
  .get("/watches/:id", getWatchId)
  .get("/watches", getAllWatches)
  .get("/hit", getWatchesHit)
  .get("/shares", getShares);

module.exports = apiRoutes;
