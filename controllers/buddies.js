const Buddies = require("../modals/Buddies");
const ErrorResponse = require("../utills/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");

// @desc        AddBuddy
// @method      Put
// @Access      Private
// route        /buddies

exports.addBuddy = asyncHandler(async (req, res, next) => {
  const { toyId, toyData, userId } = req.body;
  const bud = {
    userId: userId,
    toy_id: toyId,
    toyData: toyData,
  };
  let alreadyCreated = await Buddies.findById(userId);
  console.log(alreadyCreated);
  if (alreadyCreated) {
    alreadyCreated.data.push(bud);
    // newArray.push(bud);
    console.log(alreadyCreated);
    await Buddies.findByIdAndUpdate(userId, alreadyCreated);
    return res.status(200).json({ success: true, data: alreadyCreated });
  }
  const buddy = Buddies.create({ _id: userId, data: bud });
  // if (!buddy) return next(new ErrorResponse("not done", 400));
  res.status(200).json({ success: true, data: buddy });
});

exports.getBuddies = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  const buddies = await Buddies.findById(userId);
  res.status(200).json({ success: true, data: buddies });
});
