const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middlewares/validar-jwt");

const { Pool } = require("pg");
const client = new Pool({
  database: "Senpai",
  password: "apka",
  user: "postgres",
});

exports.listaUsuarios = async (req, res) => {
  const { rows } = await client.query("SELECT * FROM pokedex.users_list");
  return res.send(rows);
};

exports.agregarUsuario = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    username: req.body.username,
    mail: req.body.mail,
    password: password,
  };
  await client.query(
    "INSERT INTO pokedex.users_list (username, password) VALUES ($1, $2)",
    [newUser.username, newUser.password]
  );
  await client.query("INSERT INTO pokedex.mails_list (mail) VALUES ($1)", [
    newUser.mail,
  ]);

  return res.json({ success: true, newUser });
};

exports.loginUsuario = async (req, res) => {
  const { rows } = await client.query(
    "SELECT * FROM pokedex.users_list WHERE username=$1",
    [req.body.username]
  );
  if (!rows[0]) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }
  const validPassword = await bcrypt.compare(
    req.body.password,
    rows[0].password
  );
  if (!validPassword) {
    return res.status(400).json({ error: "Contraseña no válida" });
  }

  // Crear el token
  const token = jwt.sign(
    {
      name: rows[0].name,
      id: rows[0].id,
    },
    TOKEN_SECRET
  );

  res.json({ error: null, data: "Login exitoso", token });
};
