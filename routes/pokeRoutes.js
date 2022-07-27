const { verifyToken } = require("../middlewares/validar-jwt");
const express = require("express");
const router = express.Router();
const {
  listaPokemon,
  addPkmn,
  pkmnByName,
  removePkmn,
} = require("../controllers/pokemon");

router.get("/", listaPokemon);
router.get("/:nombre", pkmnByName);

router.post("/addPkmn", addPkmn);

router.delete("/removePkmn", removePkmn);

module.exports = router;
