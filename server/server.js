const express = require("express");
const cors = require("cors");

const router = require("./routes");
const authMiddleWare = require("./middleware/auth-handler");

const app = express();

const PORT = 3001;
app.use(cors());
app.use(authMiddleWare.addUser);
app.use("/api", router);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT} 🚀`)
);
