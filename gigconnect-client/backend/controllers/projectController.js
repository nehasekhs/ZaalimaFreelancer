import Project from "../models/Project.js";

// Create project
export const createProject = async (req, res) => {
  try {
    const { title, budget, category, description, duration } = req.body;

    const project = await Project.create({
      title,
      budget,
      category: category || "",
      description: description || "",
      duration: duration || "",
      user: req.user._id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get logged in user's projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this project" });
    }

    // Use nullish coalescing ?? to allow empty strings and 0
    const { title, budget, category, description, duration } = req.body;

    project.title = title ?? project.title;
    project.budget = budget ?? project.budget;
    project.category = category ?? project.category;
    project.description = description ?? project.description;
    project.duration = duration ?? project.duration;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this project" });
    }

    // ✅ Safe delete
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

