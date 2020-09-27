const express = require("express");
const cors = require("cors");

const { router, authRouter } = require("./routes");
const authMiddleWare = require("./middleware/auth-handler");
const jwtCheck = require("./middleware/jwt-check");

const app = express();

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(authMiddleWare.addUser);
app.use("/api", router);

app.use(jwtCheck);

app.use("/api", authRouter);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT} 🚀`)
);
