const Toy = require("../modals/Toys");
const ErrorResponse = require("../utills/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");
const { networkInterfaces } = require("os");

//@desc         Add toy
//@Method       Post
//@route        /api/v1/register
//@access       private
exports.addToy = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const nets = networkInterfaces();
  // const results = Object.create(null); // Or just '{}', an empty object

  // for (const name of Object.keys(nets)) {
  //   for (const net of nets[name]) {
  //     // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
  //     if (net.family === "IPv4" && !net.internal) {
  //       if (!results[name]) {
  //         results[name] = [];
  //       }
  //       results[name].push(net.address);
  //     }
  //   }
  // }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload an image for toy`, 400));
  }
  const file = req.files.file;
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${
          process.env.MAX_FILE_UPLOAD / 1000000
        } Mb`,
        400
      )
    );
  }
  file.name = `Photo_${Math.floor(100000 + Math.random() * 900000)}${
    path.parse(file.name).ext
  }`;
  //   console.log(file.name);
  let filePath = process.env.TOY_IMAGE_UPLOAD_PATH.substring(8);
  //   console.log(filePath);
  file.mv(`${process.env.TOY_IMAGE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return new ErrorResponse(`Problem with file upload`, 500);
    }
    req.body.image = `http://evening-bastion-13666.herokuapp.com${filePath}/${file.name}`;
  });
  const toy = await Toy.create({
    ...req.body,
    image: `http://evening-bastion-13666.herokuapp.com${filePath}/${file.name}`,
  });
  res.status(201).json({ success: true, data: toy });
});

//@desc         Get User toys
//@Method       Get
//@route        /api/v1/register
//@access       private
exports.getUserToys = asyncHandler(async (req, res, next) => {
  const toys = await Toy.find({ user: { $eq: req.user._id } });
  res.status(200).json({ success: true, data: toys });
});

exports.getAllToys = asyncHandler(async (req, res, next) => {
  const toys = await Toy.find({ user: { $ne: req.user._id } });
  res.status(200).json({ success: true, data: toys });
});
