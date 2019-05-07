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
    const minPrice = Math.min(
      ...Array.from(new Set(items.map(item => parseFloat(item.price))))
    );
    const maxPrice = Math.max(
      ...Array.from(new Set(items.map(item => parseFloat(item.price))))
    );

    const page = query.page || 1;
    const view = query.view || 6;

    const filterGender =
      (query.gender &&
        (Array.isArray(query.gender)
          ? query.gender
          : Array.of(query.gender))) ||
      gender;
    const filterBrand =
      (query.brand &&
        (Array.isArray(query.brand) ? query.brand : Array.of(query.brand))) ||
      brand;
    const filterColor =
      (query.color &&
        (Array.isArray(query.color) ? query.color : Array.of(query.color))) ||
      color;

    const filteredItems = items.filter(
      ({ gender, brand, color }) =>
        filterGender.includes(gender) &&
        filterBrand.includes(brand) &&
        filterColor.includes(color)
    );

    const filteredPriceItems = filteredItems.filter(
      ({ price }) =>
        (query.minPrice ? price >= query.minPrice : price >= minPrice) &&
        (query.maxPrice ? price <= query.maxPrice : price <= maxPrice)
    );

    const countAll = items.length;
    const filteredCount = filteredPriceItems.length;
    const maxPage = Math.ceil(filteredCount / view);

    const resultData =
      page === 1
        ? filteredPriceItems.slice(0, view)
        : filteredPriceItems.slice(page * view - view, page * view);

    res.status(200);
    res.json({
      status: "success",
      watches: resultData,
      gender,
      color,
      brand,
      countAll,
      filteredCount,
      maxPage,
      minPrice,
      maxPrice
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
