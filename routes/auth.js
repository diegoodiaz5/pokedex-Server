const express = require("express");
const router = express.Router();
const { verifyToken, TOKEN_SECRET } = require("../middlewares/validar-jwt");
const {
  agregarUsuario,
  listaUsuarios,
  loginUsuario,
} = require("../controllers/usuarios");

// Listas de usuarios
router.get("/usuarios", listaUsuarios);

// Registro de un usuario
router.post("/register", agregarUsuario);

// Login de un usuario
router.post("/login", loginUsuario);

module.exports = router;
