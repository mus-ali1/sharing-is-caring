const router = require('express').Router();
const { Comment } = require('../../model');
const authMiddleware = require("../../utils/auth");


// get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
