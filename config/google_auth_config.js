var GoogleStrategy = require('passport-google-oauth20').Strategy;
const {userModel} = require("../models/user");
const passport = require("passport")


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' ? process.env.GOOGLE_CALLBACK_URL:"http://localhost:4000/auth/google/callback",
  },
  async function(accessToken, refreshToken, profile, cb) {
  try{
    let user =  await userModel.findOne({ email: profile.emails[0].value  })

     if(!user) {
        user = new userModel({
            name: profile.displayName,
            email: profile.emails[0].value,
        })

        await user.save();
     }

     return cb(null, user)
   
  } catch (error){
    console.error("Error during authentication:", error);
    return cb(error, false)
  }
     
}
));

passport.serializeUser((user, cb)=>{
   cb(null, user._id);
 })

 passport.deserializeUser( async(id, cb)=>{
 try{
  const user = await userModel.findOne({ _id: id });

  if (user) {
    cb(null, user);
  } else {
    cb("User not found", null);
  }

} catch (error) {
  console.error("Error during user deserialization:", error);
  cb(error, null);
}
  
 })


module.exports = passport