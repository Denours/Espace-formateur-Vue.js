// server.js - API REST Espace Formateur
// Routes :
//   GET    /api/formations
//   POST   /api/formations/:fId/modules/:mId/resources
//   PUT    /api/formations/:fId/modules/:mId/resources/:rId
//   DELETE /api/formations/:fId/modules/:mId/resources/:rId

import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, "db.json");
const PORT = 3001;

console.log("");
console.log("Dossier serveur  :", __dirname);
console.log("Chemin db.json   :", DB_PATH);
console.log("db.json present  :", fs.existsSync(DB_PATH) ? "OUI" : "NON");
console.log("");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use((req, _res, next) => {
  console.log(
    "[" + new Date().toLocaleTimeString() + "] " + req.method + " " + req.url,
  );
  next();
});

function readDB() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function generateResourceId(formations) {
  const allIds = formations.flatMap((f) =>
    f.modules.flatMap((m) => m.resources.map((r) => r.id)),
  );
  return allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
}

// --- GET /api/formations ---
app.get("/api/formations", (req, res) => {
  try {
    const { formations } = readDB();
    res.json(formations);
  } catch (err) {
    console.error("[GET] Erreur :", err.message);
    res.status(500).json({ error: "Impossible de lire les donnees." });
  }
});

// --- POST /api/formations/:fId/modules/:mId/resources ---
app.post("/api/formations/:fId/modules/:mId/resources", (req, res) => {
  try {
    const fId = Number.parseInt(req.params.fId);
    const mId = Number.parseInt(req.params.mId);
    const { title, type, size, date } = req.body;

    if (!title || !type || !size || !date) {
      return res
        .status(400)
        .json({ error: "Champs manquants : title, type, size, date requis." });
    }

    const db = readDB();
    const formation = db.formations.find((f) => f.id === fId);
    if (!formation)
      return res
        .status(404)
        .json({ error: "Formation " + fId + " introuvable." });

    const module = formation.modules.find((m) => m.id === mId);
    if (!module)
      return res.status(404).json({ error: "Module " + mId + " introuvable." });

    const newResource = {
      id: generateResourceId(db.formations),
      title,
      type,
      size,
      date,
    };
    module.resources.push(newResource);
    writeDB(db);

    console.log("[POST] Ajout :", newResource.title);
    res.status(201).json(newResource);
  } catch (err) {
    console.error("[POST] Erreur :", err.message);
    res.status(500).json({ error: "Erreur serveur lors de l'ajout." });
  }
});

// --- PUT /api/formations/:fId/modules/:mId/resources/:rId ---
app.put("/api/formations/:fId/modules/:mId/resources/:rId", (req, res) => {
  try {
    const fId = Number.parseInt(req.params.fId);
    const mId = Number.parseInt(req.params.mId);
    const rId = Number.parseInt(req.params.rId);
    const { title, type, size, date } = req.body;

    if (!title || !type || !size || !date) {
      return res
        .status(400)
        .json({ error: "Champs manquants : title, type, size, date requis." });
    }

    const db = readDB();
    const formation = db.formations.find((f) => f.id === fId);
    if (!formation)
      return res
        .status(404)
        .json({ error: "Formation " + fId + " introuvable." });

    const module = formation.modules.find((m) => m.id === mId);
    if (!module)
      return res.status(404).json({ error: "Module " + mId + " introuvable." });

    const resource = module.resources.find((r) => r.id === rId);
    if (!resource)
      return res
        .status(404)
        .json({ error: "Ressource " + rId + " introuvable." });

    // Mise a jour des champs
    resource.title = title;
    resource.type = type;
    resource.size = size;
    resource.date = date;

    writeDB(db);

    console.log("[PUT] Modification :", resource.title);
    res.json(resource);
  } catch (err) {
    console.error("[PUT] Erreur :", err.message);
    res.status(500).json({ error: "Erreur serveur lors de la modification." });
  }
});

// --- DELETE /api/formations/:fId/modules/:mId/resources/:rId ---
app.delete("/api/formations/:fId/modules/:mId/resources/:rId", (req, res) => {
  try {
    const fId = Number.parseInt(req.params.fId);
    const mId = Number.parseInt(req.params.mId);
    const rId = Number.parseInt(req.params.rId);

    const db = readDB();
    const formation = db.formations.find((f) => f.id === fId);
    if (!formation)
      return res
        .status(404)
        .json({ error: "Formation " + fId + " introuvable." });

    const module = formation.modules.find((m) => m.id === mId);
    if (!module)
      return res.status(404).json({ error: "Module " + mId + " introuvable." });

    const idx = module.resources.findIndex((r) => r.id === rId);
    if (idx === -1)
      return res
        .status(404)
        .json({ error: "Ressource " + rId + " introuvable." });

    const [deleted] = module.resources.splice(idx, 1);
    writeDB(db);

    console.log("[DELETE] Suppression :", deleted.title);
    res.json({ deleted });
  } catch (err) {
    console.error("[DELETE] Erreur :", err.message);
    res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
});

app.listen(PORT, () => {
  console.log("API demarree sur http://localhost:" + PORT);
  console.log("Test : http://localhost:" + PORT + "/api/formations");
  console.log("");
});
