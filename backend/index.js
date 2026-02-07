const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.send("Backend is alive");
});

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});
