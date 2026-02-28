const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.json({ message: "Hello world" });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on Port ${PORT}`);
});
