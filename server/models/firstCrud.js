import mongoose from "mongoose";

// we build our schema
const crudSchema = mongoose.Schema({
  _id: String,
  title: "String",
  message: "String",
  likeCount: {
    type: Number,
    default: 0,
  },
  selectedFile: "String",
});
// turn our schema into a model
const crudModel = mongoose.model("Crud", crudSchema);
// export our model to our controller
export default crudModel;
