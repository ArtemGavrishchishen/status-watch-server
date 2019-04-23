const path = require("path");
const fs = require("fs");
const util = require("util");

const filePath = path.join(__dirname, "../../../../", "data", "watches.json");
const readFileAsync = util.promisify(fs.readFile);

const getAllWatches = (req, res) => {
  const { query } = req;

  const sendResponse = data => {
    const items = JSON.parse(data);

    const gender = Array.from(new Set(items.map(item => item.gender)));
    const color = Array.from(new Set(items.map(item => item.color)));
    const brand = Array.from(new Set(items.map(item => item.brand)));

    const page = query.page || 1;
    const view = query.view || 6;

    const filterGender = (query.gender && query.gender.split(",")) || gender;
    const filterBrand = (query.brand && query.brand.split(",")) || brand;
    const filterColor = (query.color && query.color.split(",")) || color;

    const filteredItems = items.filter(
      ({ gender, brand, color }) =>
        filterGender.includes(gender) &&
        filterBrand.includes(brand) &&
        filterColor.includes(color)
    );

    const countAll = items.length;
    const filteredCount = filteredItems.length;
    const maxPage = Math.ceil(filteredCount / view);

    const resultData =
      page === 1
        ? filteredItems.slice(0, view)
        : filteredItems.slice(page * view - view, page * view);

    res.status(200);
    res.json({
      status: "success",
      watches: resultData,
      gender,
      color,
      brand,
      countAll,
      filteredCount,
      maxPage
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

module.exports = getAllWatches;
