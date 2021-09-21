const authMiddleware = (req, res, next) => {
    console.log('Hello from Auth Middleware!')
    if (!req.session.user_id) {
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = authMiddleware;