const isAction = (action) => {
    return (req, res, next) => {
        if (req.query.action === action) {
            next();
            return;
        } else {
            next("route");
        }
    };
};

module.exports = { isAction };
