import express from "express";
import cors from "cors";
import { categorias, produtos } from "./categorias.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/categorias", (req, res) => {
  const resultado = categorias.map(categoria => ({
    ...categoria,
    produtos: produtos.filter(
      produto => produto.categoria === categoria.nome
    )
  }));

  res.json(resultado);
});

app.get("/api/categorias/:id", (req, res) => {
  const id = Number(req.params.id);

  const categoria = categorias.find(c => c.id === id);

  if (!categoria) {
    return res.status(404).json({
      error: "Categoria não encontrada"
    });
  }

  const resultado = {
    ...categoria,
    produtos: produtos.filter(
      produto => produto.categoria === categoria.nome
    )
  };

  res.json(resultado);
});

app.listen(8093, () => {
  console.log("API rodando na porta 8093");
});
