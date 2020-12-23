import express from "express";

import {
  getData,
  createData,
  editData,
  deleteData,
  likeCount,
  getLikes,
  searchResults,
} from "../controllers/crudController.js";
const router = express.Router();

// specify the endpoints and the functions we want to call
router.get("/", getData);
router.get("/:id", getLikes);
router.get("/search/:common_name", searchResults);

router.post("/", createData);
router.put("/:id", editData);
router.patch("/:id", likeCount);
router.delete("/:id", deleteData);

// export to our server.js file
export default router;
