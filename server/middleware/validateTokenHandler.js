const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    // let authHeader = req.headers.Authorization || req.headers.authorization;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    // console.log({authHeader,blogId:req.params.blogId});

    if (authHeader && (authHeader.startsWith('Bearer '))) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({error:"you must be logged in..."});
                return;
                // throw new Error("User is not authorized ");
            }
            console.log(decoded);

            req.user = { username: decoded.username, email: decoded.email, id: decoded.id }
            // req.user = decoded;
            next();
        });
        if (!token) {
            res.status(401).json({ error: "you must be logged in..." });
            // throw new Error("you must be logged in...");
        }

    }
});
module.exports = validateToken;