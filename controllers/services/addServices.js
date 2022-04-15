import mongoose from "mongoose";
import servicesSchema from "../../models/services.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import usersSchema from "../../models/users.js";

export const addServices = async (req, res) => {
  try {
    let serviceToAdd = req?.body;
    let mentor_id = mongoose.Types.ObjectId(serviceToAdd?.mentor_id);

    let { name } = await usersSchema.findById(mentor_id);
    console.log(name);

    let data = await servicesSchema.create({
      ...serviceToAdd,
      mentor_name: name,
    });

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
