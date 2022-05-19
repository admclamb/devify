const service = require('./images.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { uploadFile } = require('../s3/s3');
const VALID_PROPERTIES = [];
async function uploadTo(req, res, next) {
  const { file } = req;
  console.log(file);
  const result = await uploadFile(file);
  console.log(result);
  const { Location } = await result.json();
  console.log(Location);
  res.locals.location = Location;
  next();
}

async function updateProfile(req, res, next) {
  console.log('here');
  const { user_id } = req.params;
  const { location } = res.locals;
  console.log(location);
  const updatedUserProfile = await service.update(user_id, location);
  res.status(203).json({ data: updatedUserProfile });
}
module.exports = {
  update: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(VALID_PROPERTIES),
    upload.single('avatar'),
    asyncErrorBoundary(uploadTo),
    asyncErrorBoundary(updateProfile),
  ],
};
