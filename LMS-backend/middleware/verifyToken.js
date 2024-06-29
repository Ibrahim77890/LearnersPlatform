const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
        return res.status(401).json("User not authenticated");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json("Token not valid");
        }
        req.user = user;
        next();
    });
};

const verifyTokenAndAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token not valid" });
        }

        // Check if user is an admin
        if (!user || (user.role !== "Admin" && user.role !== "admin")) {
            return res.status(401).json({ error: "User not permitted" });
        }
        console.log("Admin Verified");
        req.user = user;
        next();
    });
};

module.exports = { verifyToken, verifyTokenAndAdmin };

// function checkJwtTokenCookie() {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.startsWith('jwtToken=')) {
//             return true; // 'jwtToken' cookie exists
//         }
//     }
//     return false; // 'jwtToken' cookie does not exist
// }

// // Example usage
// if (checkJwtTokenCookie()) {
//     console.log("jwtToken cookie exists");
// } else {
//     console.log("jwtToken cookie does not exist");
// }
