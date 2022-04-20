function hasOnlyValidProperties(VALID_PROPERTIES) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    console.log(data);
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
    console.log(invalidFields);

    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  };
}

module.exports = hasOnlyValidProperties;
