const { Pool } = require("pg");
const client = new Pool({
  database: "Senpai",
  password: "apka",
  user: "postgres",
});

exports.listaPokemon = async (req, res) => {
  const { rows } = await client.query(
    "SELECT * FROM pokedex.lista_pokemons WHERE borrado=false ORDER BY id"
  );

  return res.send(rows);
};

exports.pkmnByName = async (req, res) => {
  const { nombre } = req.params;
  const { rows } = await client.query(
    "SELECT * FROM pokedex.lista_pokemons WHERE lower(nombre)=$1",
    [nombre.toLowerCase()]
  );
  const { rows: next } = await client.query(
    "SELECT nombre FROM pokedex.lista_pokemons WHERE lower(nombre)>$1 ORDER BY nombre ASC limit 1",
    [nombre.toLowerCase()]
  );
  const { rows: prev } = await client.query(
    "SELECT nombre FROM pokedex.lista_pokemons WHERE lower(nombre)<$1 ORDER BY nombre DESC limit 1",
    [nombre.toLowerCase()]
  );
  if (rows.length === 0) {
    res.sendStatus(404);
  } else {
    res.send({ pokemon: rows[0], next: next[0], prev: prev[0] });
  }
};

exports.addPkmn = async (req, res) => {
  try {
    const newPkmn = {
      id: req.body.id,
      nombre: req.body.nombre,
      colorPrimario: req.body.colorPrimario,
      colorSecundario: req.body.colorSecundario,
      peso: req.body.peso,
      altura: req.body.altura,
      tipo1: req.body.tipo1,
      tipo2: req.body.tipo2,
      movimiento1: req.body.movimiento1,
      movimiento2: req.body.movimiento2,
      descripcion: req.body.descripcion,
      HP: req.body.HP,
      ATK: req.body.ATK,
      DEF: req.body.DEF,
      SATK: req.body.SATK,
      SDEF: req.body.SDEF,
      SPD: req.body.SPD,
      imagen: req.body.imagen,
    };

    await client.query(
      `INSERT INTO pokedex.lista_pokemons(
      id, nombre, "colorPrimario", "colorSecundario", peso, altura, tipo1, tipo2, movimiento1, movimiento2, descripcion, "HP", "ATK", "DEF", "SATK", "SDEF", "SPD", imagen)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
      [
        newPkmn.id,
        newPkmn.nombre,
        newPkmn.colorPrimario,
        newPkmn.colorSecundario,
        newPkmn.peso,
        newPkmn.altura,
        newPkmn.tipo1,
        newPkmn.tipo2,
        newPkmn.movimiento1,
        newPkmn.movimiento2,
        newPkmn.descripcion,
        newPkmn.HP,
        newPkmn.ATK,
        newPkmn.DEF,
        newPkmn.SATK,
        newPkmn.SDEF,
        newPkmn.SPD,
        newPkmn.imagen,
      ]
    );
    return res.json({ success: true, newPkmn });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.removePkmn = async (req, res) => {
  const { id } = req.params;
  await client.query(
    `UPDATE pokedex.lista_pokemons
	SET borrado=true
	WHERE id=$1`,
    [req.body.id]
  ),
    res.sendStatus(200);
};
