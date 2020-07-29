const express = require("express");
const router = require("./routes");
const cors = require("cors");

const app = express();

const PORT = 3001;
app.use(cors());
app.use("/api", router);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT} 🚀`)
);
