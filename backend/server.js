import express from "express";
import cors from "cors";
import { db } from "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/users/:userId/experience", async (req, res) => {
  try {
    const { userId } = req.params;
    const experienceRef = await db
      .collection("users")
      .doc(userId)
      .collection("experience")
      .add({
        ...req.body,
        createdAt: new Date(),
      });

    res.json({ id: experienceRef.id, message: "Experience added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:userId/experience", async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("experience")
      .get();

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete experience
app.delete("/users/:userId/experience/:expId", async (req, res) => {
  try {
    const { userId, expId } = req.params;

    await db
      .collection("users")
      .doc(userId)
      .collection("experience")
      .doc(expId)
      .delete();

    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users/:userId/applications", async (req, res) => {
  try {
    const { userId } = req.params;

    const appRef = await db
      .collection("users")
      .doc(userId)
      .collection("applications")
      .add({
        ...req.body,
        status: "applied",
        appliedAt: new Date(),
      });

    res.json({ id: appRef.id, message: "Job applied successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:userId/applications", async (req, res) => {
  try {
    const { userId } = req.params;

    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("applications")
      .orderBy("appliedAt", "desc")
      .get();

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/users/:userId/applications/:appId", async (req, res) => {
  try {
    const { userId, appId } = req.params;

    await db
      .collection("users")
      .doc(userId)
      .collection("applications")
      .doc(appId)
      .update(req.body);

    res.json({ message: "Application updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
