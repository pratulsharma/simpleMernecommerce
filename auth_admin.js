const jwt = require('jsonwebtoken');

function Auth_admin(req, res, next) {
    const isToken = req.headers['authorization'];
    if (!isToken) {
      console.log("no token from the client");
      res.send("Please send the token in the client header");
    }
    else {
      const TokenfromClient = req.headers['authorization'].split(' ')[1];
      jwt.verify(TokenfromClient, "sdkjgkja;ksgskjgf994382749874392439(*(*&(*&(*&(*&(*&(kjdfsdfkgsdfgsfs9987987987", (err, user) => {
        if (err) {
          console.log(err);
          res.send("invalid signature. Please try after Login")
        } else {
            console.log(user.role);
            if (user.role == "admin") {
                req.user = user;
                // token and role matched, continue to the code to the next function
                next();
            }
            else {
                // stop the code and send this message 
                res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');
            }
        }
      });
    }
}
  module.exports = Auth_admin;