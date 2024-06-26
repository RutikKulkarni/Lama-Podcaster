const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://rutikkulkarni2001:User123@cluster0.ipkxmfk.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define Schema
const projectSchema = new mongoose.Schema({
  userId: String,
  name: String,
  episodeName: String,
  creationTime: Date,
  uploads: [
    {
      name: String,
      description: String,
      uploadDateTime: Date,
      status: String,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

// Routes
app.post("/projects", async (req, res) => {
  const { userId, projectName } = req.body;
  const newProject = new Project({
    userId,
    name: projectName,
    episodeName: "Episode 1",
    creationTime: new Date(),
    uploads: [],
  });
  try {
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/projects/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const projects = await Project.find({ userId });
    res.json(projects);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/projects/:projectId/upload", async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  const uploadItem = {
    name,
    description,
    uploadDateTime: new Date(),
    status: "Done",
  };
  try {
    const project = await Project.findById(projectId);
    project.uploads.push(uploadItem);
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/projects/:projectId/upload/:uploadId", async (req, res) => {
  const { projectId, uploadId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      console.log("Project not found");
      return res.status(404).json({ error: "Project not found" });
    }
    console.log("Found project:", project);
    const uploadIndex = project.uploads.findIndex(
      (upload) => upload._id.toString() === uploadId
    );
    if (uploadIndex === -1) {
      console.log("Upload item not found");
      return res.status(404).json({ error: "Upload item not found" });
    }
    project.uploads.splice(uploadIndex, 1);
    const updatedProject = await project.save();
    console.log("Upload item removed successfully");
    res.json(updatedProject);
  } catch (err) {
    console.error("Error while deleting upload item:", err.message);
    res.status(400).json({ error: err.message });
  }
});

app.put("/projects/:projectId/upload/:uploadId/edit", async (req, res) => {
  const { projectId, uploadId } = req.params;
  const { newDescription } = req.body;
  try {
    const project = await Project.findById(projectId);
    const uploadItem = project.uploads.id(uploadId);
    uploadItem.description = newDescription;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
