function hasRequiredProperties(...PROPERTIES) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    console.log(data);
    try {
      PROPERTIES.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' is required.`);
          error.status = 400;
          throw error;
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasRequiredProperties;
