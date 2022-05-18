const service = require('./posts.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const VALID_PROPERTIES = [];
async function create(req, res, next) {}
module.exports = {
  create: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(VALID_PROPERTIES),
    upload.single('avatar'),
    asyncErrorBoundary(create),
  ],
};
