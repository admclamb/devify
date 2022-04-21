function hasOnlyValidProperties(...VALID_PROPERTIES) {
  return function (req, res, next) {
    console.log(
      VALID_PROPERTIES,
      "PROPERTIES-----------------------------------------------"
    );
    const { data = {} } = req.body;
    console.log("DATA: ==========================", data);
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
    console.log("INVALID FIELDS-------------------------------", invalidFields);

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
