import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { db } from "./firebase.js";
import { getJobsFromGemini } from "./gemini.js";
import jobRoutes from "./routes/jobRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/jobs", jobRoutes);

app.post("/users/:userId/profile", async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = req.body;

    if (!profile.name || !Array.isArray(profile.skills) || profile.skills.length === 0) {
      return res.status(400).json({ error: "Name and skills array are required" });
    }

    await db.collection("users").doc(userId).set({
      ...profile,
      createdAt: new Date(),
    });

    const jobs = await getJobsFromGemini(profile);

    await db
      .collection("users")
      .doc(userId)
      .collection("jobSuggestions")
      .add({
        jobs,
        createdAt: new Date(),
      });

    res.json({ message: "Profile created", jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:userId/jobs", async (req, res) => {
  try {
    const { userId } = req.params;

    const snap = await db
      .collection("users")
      .doc(userId)
      .collection("jobSuggestions")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (snap.empty) return res.json({ jobs: [] });

    const latest = snap.docs[0].data();
    res.json({ jobs: latest.jobs || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users/:userId/experience", async (req, res) => {
  try {
    const { userId } = req.params;
    const ref = await db.collection("users").doc(userId).collection("experience").add({
      ...req.body,
      createdAt: new Date(),
    });
    res.json({ id: ref.id, message: "Experience added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:userId/experience", async (req, res) => {
  try {
    const { userId } = req.params;
    const snap = await db.collection("users").doc(userId).collection("experience")
      .orderBy("createdAt", "desc").get();
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/users/:userId/experience/:expId", async (req, res) => {
  try {
    const { userId, expId } = req.params;
    await db.collection("users").doc(userId).collection("experience").doc(expId).delete();
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users/:userId/applications", async (req, res) => {
  try {
    const { userId } = req.params;
    const ref = await db.collection("users").doc(userId).collection("applications").add({
      ...req.body,
      status: "applied",
      appliedAt: new Date(),
    });
    res.json({ id: ref.id, message: "Job applied successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:userId/applications", async (req, res) => {
  try {
    const { userId } = req.params;
    const snap = await db.collection("users").doc(userId).collection("applications")
      .orderBy("appliedAt", "desc").get();
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/users/:userId/applications/:appId", async (req, res) => {
  try {
    const { userId, appId } = req.params;
    await db.collection("users").doc(userId).collection("applications").doc(appId).update(req.body);
    res.json({ message: "Application updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log(" Backend running on http://localhost:5000");
});