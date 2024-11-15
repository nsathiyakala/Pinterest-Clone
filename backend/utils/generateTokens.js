const jwt = require("jsonwebtoken") ;

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  // res.cookie("token", token, {
  //   maxAge: 15 * 24 * 60 * 60 * 1000,
  //   httpOnly: true,
  //   sameSite: "strict",
  // });
  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax", // "none" for cross-domain
    secure: process.env.NODE_ENV === "production", // Secure in production
  });
  

};

module.exports= generateToken;
