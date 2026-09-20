import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8093/api/categorias")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Categorias</h1>

      {categorias.map(categoria => (
        <div key={categoria.id}>
          <h2>{categoria.nome}</h2>
          <p>{categoria.descricao}</p>

          <ul>
            {categoria.produtos?.map(produto => (
              <li key={produto.id}>
                {produto.nome} - R$ {produto.preco.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
