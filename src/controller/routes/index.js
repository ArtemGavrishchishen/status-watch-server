const express = require("express");

const homeRoute = require("./homePage");

const apiRoutes = express.Router();

apiRoutes.get("/", homeRoute);

module.exports = apiRoutes;
