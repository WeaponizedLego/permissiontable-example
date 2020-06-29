const model_roles = require('../../models/auth/model-roles');

exports.createRole = async (req, res, next) => {

  try {

    const item = {
      name: req.body.name,
      company: req.body.company,
      permissions: {
        roleCreate: (!req.body.roleCreate) ? false : req.body.roleCreate,
        roleView: (!req.body.roleView) ? false : req.body.roleView,
        roleEdit: (!req.body.roleEdit) ? false : req.body.roleEdit,
        roleDelete: (!req.body.roleDelete) ? false : req.body.roleDelete,
        roleAddUser: (!req.body.roleAddUser) ? false : req.body.roleDelete,
        roleRemoveUser: (!req.body.roleRemoveUser) ? false : req.body.roleRemoveUser,
        logsView: (!req.body.logsView) ? true : req.body.logsView,
        logsExport: (!req.body.logsExport) ? true : req.body.logsExport,
        profileView: (!req.body.profileView) ? true : req.body.profileView,
        userCreate: (!req.body.userCreate) ? false : req.body.userCreate,
        userView: (!req.body.userView) ? true : req.body.userView,
        userEdit: (!req.body.userEdit) ? false : req.body.userEdit,
        userDelete: (!req.body.userDelete) ? false : req.body.userDelete,
        venueCreate: (!req.body.venueCreate) ? false : req.body.venueCreate,
        venueView: (!req.body.venueView) ? true : req.body.venueView,
        venueEdit: (!req.body.venueView) ? false : req.body.venueEdit,
        venueDelete: (!req.body.venueDelete) ? false : req.body.venueDelete,
        eventCreate: (!req.body.eventCreate) ? false : req.body.eventCreate,
        eventView: (!req.body.eventView) ? true : req.body.eventView,
        eventEdit: (!req.body.eventEdit) ? false : req.body.eventEdit,
        eventDelete: (!req.body.eventDelete) ? false : req.body.eventDelete
      }
    }

    const role = await model_roles.create(item);

    if (role) {
      console.log(role);
      return res.status(200).json({
        status: 200,
        message: `A new role has been created`
      })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: `The server encountered an error`
    })
  }

}

exports.updateRole = async (id, item) => {

  try {

    // const permissions = {};

    // if (item.profileView) permissions.profileView = item.profileView;
    // if (item.userCreate) permissions.userCreate = item.userCreate;
    // if (item.userView) permissions.userView = item.userView;
    // if (item.userEdit) permissions.userEdit = item.userEdit;
    // if (item.userDelete) permissions.userDelete = item.userDelete;
    // if (item.eventCreate) permissions.eventCreate = item.eventCreate;
    // if (item.eventView) permissions.eventView = item.eventView;
    // if (item.eventEdit) permissions.eventEdit = item.eventEdit;
    // if (item.eventDelete) permissions.eventDelete = item.eventDelete;

    const needle = {
      _id: id,
    }

    // TODO: check if this actually works, if you have to build a object from post
    const query = {permissions: item};


    const updatedRole = model_roles.updateOne(needle, query)



  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: `The server encountered an error`
    })
  }

}

exports.createAdmin = async (company) => {

  try {

    const item = {
      name: `Admin`,
      company: company,
      permissions: {
        roleCreate: true,
        roleView: true,
        roleEdit: true,
        roleDelete: true,
        roleAddUser: true,
        roleRemoveUser: true,
        logsView: true,
        logsExport: true,
        profileView: true,
        userCreate: true,
        userView: true,
        userEdit: true,
        userDelete: true,
        venueCreate: true,
        venueView: true,
        venueEdit: true,
        venueDelete: true,
        eventCreate: true,
        eventView: true,
        eventEdit: true,
        eventDelete: true,
      }
    }

    const role = model_roles.create(item)

    return role;

  } catch (error) {
    console.log(error);
    return false
  }

}

exports.findOneRole = async (req, res, next) => {

  const id = req.body.roleId

  try {

    const role = await model_roles.findById(id);

    return role

  } catch (error) {
    console.log(error);
    return false
  }

}

/**
 * this will return all roles on a selected user
 * @user should be an user object
 * @array array containing user id's example: [4314124243,31412424134,31431424]
 */
exports.findAll = async (array) => {

  const params = [];

  array.forEach(element => {
    params.push(element.role);
  });

  try {

    const query = ({
      '_id': {
        $in: params
      }
    });

    const roles = await model_roles.find(query);

    if (roles) {
      return roles
    } else {
      return
    }

  } catch (error) {
    console.log(error);
    return false
  }

}
