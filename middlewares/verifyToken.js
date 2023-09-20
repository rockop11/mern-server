const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken

        jwt.verify(req.token, process.env.JWT_SECRET_KEY, (error, data) => {
            if(error){
                res.status(403).json({
                    message: "acceso invalido"
                })
            } else {
                next();
            }  
        })
    } else {
        res.status(403).json({
            message: "el token es invalido"
        })
    }
}

module.exports = verifyToken