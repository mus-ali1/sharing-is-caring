const router = require("express");
const { User } = require("../../model/User");

const router = router();
//create route for a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    //adding sessions
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = newUser.id;

      res.status(200).json(newUser);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
//logging in an existing user so they already have a user name & cridentials
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(400).json({
        message: "You have provided an incorrect email address and or password",
      });
      return;
    }

    //error handling for not a valid password

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: "you have provided an incorrect email and or password",
      });
      return;
    }
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = user.id;

      res.json({ user: user, message: "you are now logged in" });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//communicating with database if post req for logout -> destroy session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
