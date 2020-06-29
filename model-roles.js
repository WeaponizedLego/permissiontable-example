require('dotenv').config();
const mongoose = require('mongoose');

const roles = mongoose.Schema({
  isDeleted: {
    type: Boolean,
    required: true,
    unique: false,
    trim: false,
    default: false
  },
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    maxlength: 30
  },
  company: {
    type: String
  },
  permissions: {
    roleCreate: {
      type: Boolean,
      default: false
    },
    roleView: {
      type: Boolean,
      default: false,
    },
    roleEdit: {
      type: Boolean,
      default: false,
    },
    roleDelete: {
      type: Boolean,
      default: false
    },
    roleAddUser: {
      type: Boolean,
      default: false,
    },
    roleRemoveUser: {
      type: Boolean,
      default: false
    },
    logsView: {
      type: Boolean,
      default: true
    },
    profileView: {
      type: Boolean,
      default: true
    },
    userCreate: {
      type: Boolean,
      default: false
    },
    userView: {
      type: Boolean,
      default: true
    },
    userEdit: {
      type: Boolean,
      default: false
    },
    userDelete: {
      type: Boolean,
      default: false
    },
    venueCreate: {
      type: Boolean,
      default: false
    },
    venueView: {
      type: Boolean,
      default: true
    },
    venueEdit: {
      type: Boolean,
      default: false
    },
    venueDelete: {
      type: Boolean,
      default: false
    },
    eventCreate: {
      type: Boolean,
      default: false
    },
    eventView: {
      type: Boolean,
      default: true
    },
    eventEdit: {
      type: Boolean,
      default: false
    },
    eventDelete: {
      type: Boolean,
      default: false
    },
  }
});

module.exports = mongoose.model("roles", roles);
