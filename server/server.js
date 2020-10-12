const express = require("express");
const cors = require("cors");
const path = require("path")

const { router } = require("./routes");
const { jwtCheck } = require("./middleware/jwt-check");
const userValidator = require("./middleware/user-validator");
const morgan = require("morgan");

const app = express();

const clientPath = path.join(__dirname, "../client/build");

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static(clientPath))
app.use(express.json());
app.use(jwtCheck);
app.use(userValidator.appendUser);
app.use("/api", router);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT} 🚀`)
);
