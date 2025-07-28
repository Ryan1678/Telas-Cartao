import React from 'react';
import './App.css'; // importe o arquivo CSS

function App() {
  const papeis = [
    {
      emoji: '🛠️',
      title: 'Administrador',
      text: 'Responsável pela gestão das informações da lanchonete, incluindo recarga dos cartões e acesso ao banco de dados.'
    },
    {
      emoji: '💳',
      title: 'Vendedor',
      text: 'Realiza a retirada do débito do valor diretamente do cartão do aluno.'
    }
  ];

  const beneficios = [
    {
      emoji: '📊',
      title: 'Controle Total',
      text: 'Realize recargas, edite os cartões e gerencie tudo em um só lugar.'
    },
    {
      emoji: '⏱️',
      title: 'Agilidade no Atendimento',
      text: 'Reduza filas e aumente a eficiência no horário do lanche.'
    },
    {
      emoji: '🔐',
      title: 'Segurança',
      text: 'Transações seguras com cartões vinculados aos alunos.'
    },
    {
      emoji: '🧑‍🤝‍🧑',
      title: 'Experiência Melhorada',
      text: 'Tanto alunos quanto funcionários aproveitam uma rotina mais organizada e prática.'
    }
  ];

  return (
    <div className="app-container">
      <div className="content">
        <h1>
          <span>🍽️</span> Plataforma da Lanchonete Escolar
        </h1>
        <p>Uma solução pensada para modernizar a experiência de vendas e gestão na lanchonete da escola.</p>

        <h2>
          <span>👥</span> Papéis e Responsabilidades
        </h2>
        <div className="grid">
          {papeis.map((item, index) => (
            <div key={index} className="card">
              <div className="emoji">{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <h2>
          <span>🚀</span> Benefícios da Plataforma
        </h2>
        <div className="grid">
          {beneficios.map((item, index) => (
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
