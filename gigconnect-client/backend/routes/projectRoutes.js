import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.put("/:id", protect, updateProject); // update route
router.delete("/:id", protect, deleteProject); // delete route
router.route("/").post(protect, createProject).get(protect, getProjects);
router.route("/:id").put(protect, updateProject).delete(protect, deleteProject);
export default router;
