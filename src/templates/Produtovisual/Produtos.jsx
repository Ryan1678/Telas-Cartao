import React, { useEffect, useState } from 'react';
import './Produtos.css';

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/produto')
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  // Função para montar src da imagem com checagem de prefixo
  const getImagemSrc = (imagemBase64) => {
    if (!imagemBase64) return 'https://via.placeholder.com/150?text=Sem+Imagem';

    // Se já começa com "data:image", retorna ela direta
    if (imagemBase64.startsWith('data:image')) {
      return imagemBase64;
    }

    // Caso contrário, adiciona o prefixo
    return `data:image/png;base64,${imagemBase64}`;
  };

  return (
    <div className="produtos-container">
      <section className="produtos-section">
        <h1>Produtos</h1>
        <p className="produtos-subtitle">
          Aqui você verá os produtos disponíveis no App da lanchonete escolar.
        </p>

        <div className="produtos-grid">
          {produtos.map(({ id, nome, tipo, descricao, preco, imagemBase64 }) => (
            <div key={id} className="produto-card">
              <img
                src={getImagemSrc(imagemBase64)}
                alt={nome}
                className="produto-img"
              />
              <div className="produto-info">
                <h3>{nome}</h3>
                <span className="produto-tipo">{tipo}</span>
                <p className="produto-descricao">{descricao}</p>
                <p className="produto-preco">R$ {preco?.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Produtos;
