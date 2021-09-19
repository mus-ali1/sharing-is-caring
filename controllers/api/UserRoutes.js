const router = require("express");
const { User } = require("../../model/User");

const router = router();
//create route for a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    //req.session.save
  } catch (error) {
    res.status(400).json(error);
  }
});
//logging in an existing user so they already have a user name & cridentials
router.post("/login", async(req, res) => {
   try{
      const user = await User.findOne ({
         where:{
            email: req.body.email,

         }
      });
      if (!user){
         res
         .status (400)
         .json ({message: "You have provided an incorrect email address and or password"});
         return;
      }
      
      //error handling for not a valid password

      const validPassword = await user.checkPassword (req.body.password);
      
      if (!validPassword){
         res
         .status(400)
         .json ({message: "you have provided an incorrect email and or password"});
         return;

         
      }

      
   }
})

