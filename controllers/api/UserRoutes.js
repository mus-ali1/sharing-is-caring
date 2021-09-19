const router = require("express");
const { User } = require("../../model/User");

const router = router();

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    //req.session.save
  } catch (error) {
    res.status(400).json(error);
  }
});
