import express from "express";
// import { getPosts } from "../controllers/posts.js";
// import { createPost } from "../controllers/posts.js";
const router = express.Router();

router.get("/", getCrud);
router.post("/", createCrud);

export default router;
