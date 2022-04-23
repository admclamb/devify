function hasOnlyValidProperties(properties) {
  console.log(properties);
  return function (req, res, next) {
    const { data = {} } = req.body;
    const invalidFields = Object.keys(data).filter(
      (field) => !properties.includes(field)
    );
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    return next();
  };
}

module.exports = hasOnlyValidProperties;
