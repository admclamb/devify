const service = require('./images.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadFile } = require('../s3/s3');
const VALID_PROPERTIES = [];
async function create(req, res, next) {
  const { file } = req;
  console.log(file);
  const result = await uploadFile(file);
  console.log(result);
  res.send('🔥');
}
module.exports = {
  create: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(VALID_PROPERTIES),
    upload.single('avatar'),
    asyncErrorBoundary(create),
  ],
};
