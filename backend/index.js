const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const jobRoutes = require("./routes/jobRoutes");
app.use("/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("Job backend is running ");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
