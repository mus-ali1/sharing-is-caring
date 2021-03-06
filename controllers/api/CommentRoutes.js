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

// get comment by id
router.get("/:commentId", async (req, res) => {
    const comment = await Comment.findByPk(req.params.commentId);

    if (comment) {
        return res.json(comment);
    } else {
        return res.status(404).end();
    }
});

// comment created
router.post("/", authMiddleware, async (req, res) => {
    // check the session
    if (req.session) {
        await Comment.create({
            comment: req.body.comment,
            // use the id from the session
            user_id: req.session.user_id,
            recipe_id: req.body.recipe_id,
            downvote: 0,
            upvote: 0
        })
            .then((dbCommentData) => res.json(dbCommentData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// comment deleted
router.delete('/:id', authMiddleware, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
