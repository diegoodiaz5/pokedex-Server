const express = require("express");
const app = express();
const PORT = 1235;
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("./routes/auth");
const pokeRoutes = require("./routes/pokeRoutes");

app.use(cors());
app.use(bodyParser.json());

app.use("/", authRouter, pokeRoutes);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
