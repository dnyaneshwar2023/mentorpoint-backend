import mongoose from "mongoose";
import { generateHashedPassword } from "../../utils/passwords.js";
import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

export const addUser = async (req, res) => {
  try {
    const userToAdd = req?.body;

    const password = generateHashedPassword();
    let data = await usersSchema.create({ ...userToAdd, password });
    delete data["password"];

    sendSuccessResponse({
      res,
      data,
    });
  } catch (err) {
    console.log(err);
    sendFailResponse({
      res,
      err: err,
      statusCode: 500,
    });
  }
};
