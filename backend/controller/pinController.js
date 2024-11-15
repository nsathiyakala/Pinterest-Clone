const Pin = require("../model/PinModel.js");
const TryCatch = require("../utils/TryCatch.js");
const getDataUrl = require("../utils/generateUri.js");
const cloudinary = require("cloudinary");

exports.createPin = TryCatch(async (req, res) => {
    const { title, pin } = req.body;

    const file = req.file;
    const fileUrl = getDataUrl(file);

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    await Pin.create({
        title,
        pin,
        image: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
        owner: req.user._id,
    });

    res.json({
        message: "Pin Created",
    });
});


exports.getAllPins = TryCatch(async (req, res) => {
    const pins = await Pin.find().sort({ createdAt: -1 });

    res.json(pins);
});

exports.getSinglePin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id).populate("owner", "-password");

    res.json(pin);
});

exports.commentOnPin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);

    if (!pin)
        return res.status(400).json({
            message: "No Pin with this id",
        });

    pin.comments.push({
        user: req.user._id,
        name: req.user.name,
        comment: req.body.comment,
    });

    await pin.save();

    res.json({
        message: "Comment Added",
    });
});

exports.deleteComment = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);

    if (!pin)
        return res.status(400).json({
            message: "No Pin with this id",
        });

    if (!req.query.commentId)
        return res.status(404).json({
            message: "Please give comment id",
        });

    const commentIndex = pin.comments.findIndex(
        (item) => item._id.toString() === req.query.commentId.toString()
    );

    if (commentIndex === -1) {
        return res.status(404).json({
            message: "Comment not found",
        });
    }

    const comment = pin.comments[commentIndex];

    if (comment.user.toString() === req.user._id.toString()) {
        pin.comments.splice(commentIndex, 1);

        await pin.save();

        return res.json({
            message: "Comment Deleted",
        });
    } else {
        return res.status(403).json({
            message: "You are not owner of this comment",
        });
    }
});


exports.deletePin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);

    if (!pin)
        return res.status(400).json({
            message: "No Pin with this id",
        });

    if (pin.owner.toString() !== req.user._id.toString())
        return res.status(403).json({
            message: "Unauthorized",
        });

    await cloudinary.v2.uploader.destroy(pin.image.id);

    await pin.deleteOne();

    res.json({
        message: "Pin Deleted",
    });
});

exports.updatePin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);

    if (!pin)
        return res.status(400).json({
            message: "No Pin with this id",
        });

    if (pin.owner.toString() !== req.user._id.toString())
        return res.status(403).json({
            message: "Unauthorized",
        });

    pin.title = req.body.title;
    pin.pin = req.body.pin;

    await pin.save();

    res.json({
        message: "Pin updated",
    });
});

exports.likePin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);

    if (!pin)
        return res.status(400).json({
            message: "No Pin with this id",
        });

    // Check if the user has already liked the pin
    const alreadyLiked = pin.likes.includes(req.user._id);

    if (alreadyLiked) {
        // Unlike the pin
        pin.likes = pin.likes.filter(userId => userId.toString() !== req.user._id.toString());
    } else {
        // Like the pin
        pin.likes.push(req.user._id);
    }

    await pin.save();

    res.json({
        message: alreadyLiked ? "Pin Unliked" : "Pin Liked",
        likes: pin.likes.length, // Return the updated number of likes
    });
});
