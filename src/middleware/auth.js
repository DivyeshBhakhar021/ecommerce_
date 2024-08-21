var jwt = require('jsonwebtoken');
const Users = require('../modal/users.modal');

const auth = (roles = []) => async (req, res, next) => {
// console.log("mmmmmmmmmmm",req);

    try {

        const token = req.cookies?.accrestoken || req.header('Authorization')?.replace("Bearer ", "")
        // console.log("token",token);
        // console.log("mmmmmmmmmmm", roles);

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please Provide AccresToken"
            });
        }

        try {
            const validateToken = await jwt.verify( token, "Qwerty123")

            const user = await Users.findById(validateToken._id);

            console.log(user, "user");
            if (!roles.some((v) => v === user.role)) {
                return res.status(400).json({
                    success: false,
                    message: "You have not access"
                });
            }

            req.user = user
            next()

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: "Invalid Token " + error.message
            });

        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

}

module.exports = auth