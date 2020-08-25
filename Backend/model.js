const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let claims = new Schema({
    EmployeeId: {
    type: Number
  },
    EmployeeName: {
    type: String
  },
  ClaimNumber: {
    type: String
  },
  ClaimType: {
    type: String
  },
  ClaimProgram: {
    type: String
  },
  StartDate: {
    type: String
  },
  EndDate: {
    type: String
  }

});

module.exports = mongoose.model("claims", claims);