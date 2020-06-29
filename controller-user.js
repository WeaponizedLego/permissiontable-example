const model_user = require('../../models/user/model-users');
const permission = require('../../helpers/permission');
const time = require('../../helpers/time');

const bcrypt = require('bcryptjs');


exports.authFindUser = async (req, res, next) => {
  try {

    const userData = req.userData;

    const user = await model_user.findById(userData._id)

    return user

  } catch (error) {
    console.log(error);
    return false
  }
}

exports.findUser = async (req, res, next) => {

  const userData = req.userData;

  permission.check("profileView", req.userData.permissions, res);

  try {

    const user = await model_user.findById(userData._id);

    user.password = `************`

    return res.status(200).json({
      status: 200,
      message: "Found single user",
      data: user
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: `Server error 500`
    });
  }

}

exports.updateOneUser = async(req, res, next) => {

  permission.check("userEdit", req.userData.permissions, res);

  const request = req.body;

  try {

    const id = {_id: request._id};


    // TODO: figure out if users should be allowed to edit other things than this? phone number and such?
    const query = {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      contact: {
        phone: request.phone
      }
    }

    if (request.newPassword) {

      if (request.newPassword !== request.newPassword2) {
        return res.status(400).json({
          status: 400,
          message: `new passwords does not match`
        })
      } else {
        const tmpUser = model_user.findById({_id: request._id});

        if (tmpUser.password !== bcrypt.hash(request.password)) {
          return res.status(400).json({
            status: 400,
            message: `old password was incorrect`
          })
        } else {
          query.password = bcrypt.hash(request.password);
        }
      }
    }

    const user = await model_user.updateOne(id, query)

    if (user) {
      return res.status(200).json({
        status: 200,
        message: `User was updated`
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: `Server error 500`
    });
  }

}


/**
 * update on users for internal use, this should not be a available path
 * @needle id to look for. format: {_id: user._id}
 * @item the updated properties in object format. See model-user.js for structure
 */
exports.updateUser = async (needle, item) => {

  try {

    const user = await model_user.updateOne(needle, item)

    return user

  } catch (error) {
    console.log(error);
    return false
  }

}

exports.updateTokenTime = async (user, token) => {

  try {

    const needle = {
      _id: user._id,
      "tokens.token": token
    }

    const update = {
      '$set': {'tokens.$.lastUsed': time.now()}
    }

    const updatedUser = await model_user.updateOne(needle, update);

    // console.log(updatedUser);

    return (updatedUser) ? true : false;

  } catch (error) {
    console.log(error);
    return false;
  }

}
