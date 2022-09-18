module.exports = (req, res, next) => {
    req.query.sort = 'rank';
    req.query.fields = 'email,rank';
    req.query.limit = 3;
    
    next();
}
