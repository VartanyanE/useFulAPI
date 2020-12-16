import mongoose from "mongoose";

const crudSchema = mongoose.Schema({
  title: "String",
  message: "String",
  selectedFile: "String",
});

const crudModel = mongoose.model("Crud", crudSchema);

export default crudModel;
