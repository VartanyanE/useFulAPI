import express from "express";

import {
  getData,
  createData,
  editData,
  deleteData,
  likeCount
} from "../controllers/crudController.js";
const router = express.Router();

// specify the endpoints and the functions we want to call
router.get("/", getData);
router.post("/", createData);
router.put("/:id", editData);
router.put("/:id", likeCount);
router.delete("/:id", deleteData)

// export to our server.js file
export default router;
