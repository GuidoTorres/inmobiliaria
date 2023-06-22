require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./database/models");
const rolRouter = require("./src/routes/roles");
const permisoRouter = require("./src/routes/permiso");
const clienteRouter = require("./src/routes/cliente");
const agenteRouter = require("./src/routes/agente");
const loginRouter = require("./src/routes/login");
const propietarioRouter = require("./src/routes/propietario");
const propiedadRouter = require("./src/routes/propiedad");
const reporteInicioSesionRouter = require("./src/routes/registroInicioSesion");
const usuarioRouter = require("./src/routes/usuario");
const cotizacionRouter = require("./src/routes/cotizacion");



const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "upload/imagenesVideos")));
app.use("/titulo", express.static(path.join(__dirname, "upload/titulosPropiedad")));


// Configuración y conexión a la base de datos
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Conexión con bd exitosa!!");
    // await db.sequelize.sync() // Sincronizar modelos con la base de datos
    console.log("Sincronización de modelos exitosa!!");
  } catch (error) {
    console.log(error);
  }
})();

app.use("/api/v1/rol", rolRouter);
app.use("/api/v1/permiso", permisoRouter);
app.use("/api/v1/cliente", clienteRouter);
app.use("/api/v1/agente", agenteRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/propietario", propietarioRouter);
app.use("/api/v1/propiedad", propiedadRouter);
app.use("/api/v1/reporte", reporteInicioSesionRouter);
app.use("/api/v1/usuario", usuarioRouter);
app.use("/api/v1/cotizacion", cotizacionRouter);




app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto", PORT);
});
