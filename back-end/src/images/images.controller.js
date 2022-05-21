const service = require('./images.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadFile } = require('../s3/s3');
const VALID_PROPERTIES = [];

async function read(req, res, next) {}

async function uploadTo(req, res, next) {
  const { file } = req;
  const result = await uploadFile(file);
  const { Location } = result;
  res.locals.location = Location;
  next();
}

function returnUrl(req, res, next) {
  res.status(201).json({ data: res.locals.location });
}

async function updateProfile(req, res, next) {
  const { user_id } = req.params;
  const { location } = res.locals;
  const updatedUserProfile = await service.update(user_id, location);
  res.status(200).json({ data: location });
}
module.exports = {
  get: [asyncErrorBoundary(read)],
  update: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(VALID_PROPERTIES),
    upload.single('avatar'),
    asyncErrorBoundary(uploadTo),
    asyncErrorBoundary(updateProfile),
  ],
  create: [upload.single('image'), asyncErrorBoundary(uploadTo), returnUrl],
};
