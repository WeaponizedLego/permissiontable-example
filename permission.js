
/**
 * this function will run a permission check on a user, it will check if they have
 * the required permissions to view the path they are visiting. A false will
 * result in :: 401:You are not authorized to view this path
 * @param {*} permission string format with what permissions it should check for
 * @param {*} array array of all roles to check on. can be found in req.userData.permissions
 * @param {*} res express res object. to send 401 request denied response
 */
const check = async (permission, array, res) => {

  console.log('starting the permission check');

  try {

    let authState = false;

    for (let i = 0; array.length > i; i++) {
      Object.keys(array[i].permissions).forEach(k => {
        if (k === permission) {
          if (array[i].permissions[k] === true) authState = true;
        }
      })
    }

    if (authState) {
      console.log('permissions found, allowing action');

      return true
    } else {
      console.log('no permissions found. returning error');

      return res.status(401).json({
        status: 401,
        message: `You are not authorized to view this path`
      })
    }

  } catch (error) {
    console.log(error);
    return false;
  }

}

exports.check = check;
