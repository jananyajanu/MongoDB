const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Schema is a class in mongoose & it is started with Upper case letter

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    issuedBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: false,
    },
    issuedDate: {
      type: String,
      required: true,
    },
    returnDate: {
      type: String,
      required: true,
    },
    subscriptionType: {
      type: String,
      required: true,
    },
    subscriptionDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
