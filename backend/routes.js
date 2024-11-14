const express=require("express")
const router=express.Router()

const { registerUser,loginUser,myProfile, userProfile, followAndUnfollowUser, logOutUser} = require("./controller/userController")
const {isAuth} = require("./middleware/isAuth")
const uploadFile = require("./middleware/multer");
const { createPin, getAllPins, getSinglePin, commentOnPin, deleteComment, updatePin, deletePin } = require("./controller/pinController");

// user router
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",isAuth, myProfile);
router.get("/logout", isAuth, logOutUser);
router.post("/follow/:id", isAuth, followAndUnfollowUser);


// pins routes
router.post("/newPin", isAuth, uploadFile, createPin);
router.get("/allPins", isAuth, getAllPins);
router.get("/pin/:id", isAuth, getSinglePin);
router.put("/:id", isAuth, updatePin);
router.delete("/:id", isAuth, deletePin);
router.post("/comment/:id", isAuth, commentOnPin);
router.delete("/comment/:id", isAuth, deleteComment);



// user profile
router.get("/:id", isAuth,userProfile);



module.exports=router 