require('dotenv').config();
const jwt = require('jsonwebtoken');
const controller_user = require('../api/controllers/user/controller-user');
const controller_roles = require('../api/controllers/auth/controller-roles');

module.exports = async (req, res, next) => {

  // const userIp = req.header('x-forwarded-for') || req.connection.remoteAddress;

  // console.log(userIp);

  try {

    console.log(req.headers.authorization);

    if (!req.headers.authorization) {
      console.log('missing request header');

      return res.status(401).json({
        status: 401,
        message: `Missing authentication`
      })
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // console.log(decoded);

    // TODO: setup so that if user logs in from a new ip with the same token, force them to login again
    req.userData = decoded;

    // if (req.userData.userIp !== userIp) {
    //   return res.status(401).json({
    //     status: 401
    //   })
    // }

    const user = await controller_user.authFindUser(req, res, next);

    await controller_user.updateTokenTime(user, token);

    const allRoles = await controller_roles.findAll(user.roles);

    req.userData.permissions = allRoles;

    next();

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      status: 401,
      message: "Authentication failed"
    })
  }

}
