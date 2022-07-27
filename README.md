server: http://localhost:1235

Una vez descargado el proyecto de Github ejecutar el comando npm install
Para correr el proyecto ejecutar el comando nodemon

// Rutas disponibles //

/ Pokemons:

    Obtener datos (GET):
        Lista de pokemons: "/"
        Mostrar un pokémon por nombre: "/:nombrePokemon"


    Subir datos (POST):
        Agregar un pokémon: "/addPkmn"

    Eliminar datos (DELETE):
        Eliminar un pokémon por id: "/removePkmn"

/ Usuarios:

    Obtener datos (GET):
        Lista de usuarios: "/usuarios"

    Subir datos (POST):
        Registro: "/register"
        Login: "/login"
