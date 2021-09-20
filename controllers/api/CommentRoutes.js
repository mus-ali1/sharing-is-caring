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

// comment created
router.post("/", authMiddleware, async (req, res) => {
    // check the session
    if (req.session) {
        await Comment.create({
            comment: req.body.comment_text,
            // use the id from the session
            user_id: req.session.user_id,
        })
            .then((dbCommentData) => res.json(dbCommentData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

