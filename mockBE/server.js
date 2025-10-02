const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

/**
 * COLORI: Restituisce il file JSON con i colori
 * GET /api/colori
 */
app.get("/api/colori", (req, res) => {
  const jsonColori = __dirname + "/colori.json";

  res.status(200).sendFile(path.join(jsonColori));
});

/**
 * PAROLE: Restituisce il file JSON con le parole
 * GET /api/parole
 */
app.get("/api/parole", (req, res) => {
  const jsonParole = __dirname + "/parole.json";

  res.status(200).sendFile(path.join(jsonParole));
});

/**
 * DURATE: Restituisce il file JSON con le durate
 * GET /api/durate
 */
app.get("/api/durate", (req, res) => {
  const jsonDurate = __dirname + "/durate.json";

  res.status(200).sendFile(path.join(jsonDurate));
});

/**
 * SERVE: Restituisce le immagini contenute all'interno della folder public del progetto di frontend
 * GET /assets/serve
 */
app.get("/assets/serve", (req, res) => {
  const fileName = path.basename(req.query.f);
  const filePath = path.join(__dirname, "../app/public/assets", fileName); // Cartella public del progetto frontend dove sono contenute le immagini

  if (fs.existsSync(filePath)) {
    // Imposta Content-Type dinamicamente in base all’estensione
    if (fileName.endsWith(".png")) res.type("png");
    else if (fileName.endsWith(".svg")) res.type("svg");
    else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) res.type("jpeg");
    else res.type("octet-stream");

    res.status(200).sendFile(filePath);
  } else {
    res.status(404).send("File non trovato");
  }
});

app.listen(PORT, () => {
  console.log("Server avviato su http://localhost:" + PORT);
});
