const jwt = require('jsonwebtoken');
const accessTokenSecret = 'somerandomaccesstoken';


const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (req.user) {
      next();
    } else if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          res.status(401).send('Access Denied');
        }

        req.user = user;
        next();

      });
    }
    else {
      res.status(401).send('Access Denied');
    }
  } catch (error) {

  }

}


module.exports = isLoggedIn;
