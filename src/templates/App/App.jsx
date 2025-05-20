import React from 'react';
import './App.css'; // importe o arquivo CSS

function App() {
  const categorias = [
    { emoji: '🛍️', title: 'Salgados', text: 'Chips e snacks crocantes para matar a fome com sabor.' },
    { emoji: '🥤', title: 'Bebidas', text: 'Refrigerantes gelados e sucos refrescantes.' },
    { emoji: '🍬', title: 'Doces', text: 'Chicletes, balas e os clássicos Finis!' },
    { emoji: '🍦', title: 'Sorvetes', text: 'Picolés saborosos para refrescar seus dias.' }
  ];

  const funcionalidades = [
    { emoji: '⏰', title: 'Compra Antecipada', text: 'Peça com antecedência e garanta seu lanche sem correria.' },
    { emoji: '🚶‍♂️❌', title: 'Evite Filas', text: 'Retire direto no balcão, sem pegar fila.' },
    { emoji: '📱', title: 'Compre de Qualquer Lugar', text: 'Na sala, no pátio ou onde quiser.' },
    { emoji: '💳', title: 'Pagamento Rápido', text: 'Pague online ou na hora. Praticidade total!' }
  ];

  return (
    <div className="app-container">
      <div className="content">
        <h1>
          <span>🏫</span> Bem-vindo à Lanchonete Escolar
        </h1>
        <p>O app ideal para alunos pedirem seus lanches de forma rápida, segura e divertida!</p>
        <p>No App você poderá comprar:</p>

        <div className="grid">
          {categorias.map((item, index) => (
            <div key={index} className="card">
              <div className="emoji">{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <h2>
          <span>✨</span> Funcionalidades do App
        </h2>
        <p>Pensado para facilitar a sua experiência com lanches na escola. Rápido, prático e sem filas!</p>

        <div className="grid">
          {funcionalidades.map((item, index) => (
            <div key={index} className="card">
              <div className="emoji">{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
