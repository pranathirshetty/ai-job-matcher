import express from "express";
import cors from "cors";
import { db } from "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/profiles", async (req, res) => {
  try {
    const snapshot = await db.collection("profiles").get();
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/profiles", async (req, res) => {
  try {
    const docRef = await db.collection("profiles").add(req.body);
    res.json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.use(express.json());

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
