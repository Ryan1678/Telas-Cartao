import React from 'react';
import './Produtos.css';

const produtosMock = [
  {
    id: 1,
    nome: 'Coxinha',
    tipo: 'Salgado',
    descricao: 'Deliciosa coxinha crocante com recheio de frango.',
    imagem: 'https://images.unsplash.com/photo-1604908177524-718de310f48f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    nome: 'Refrigerante Cola',
    tipo: 'Bebida',
    descricao: 'Refrigerante geladinho para refrescar seu dia.',
    imagem: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    nome: 'Picolé de Morango',
    tipo: 'Sorvete',
    descricao: 'Picolé refrescante com sabor natural de morango.',
    imagem: 'https://images.unsplash.com/photo-1562440499-3ecf1e4eea42?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    nome: 'Bala de Hortelã',
    tipo: 'Doce',
    descricao: 'Bala sabor hortelã para deixar seu hálito fresquinho.',
    imagem: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    nome: 'Pastel de Queijo',
    tipo: 'Salgado',
    descricao: 'Pastel crocante recheado com queijo derretido.',
    imagem: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    nome: 'Suco de Laranja',
    tipo: 'Bebida',
    descricao: 'Suco natural de laranja, doce e refrescante.',
    imagem: 'https://images.unsplash.com/photo-1571047399553-90e9ce9d9b71?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    nome: 'Sorvete de Chocolate',
    tipo: 'Sorvete',
    descricao: 'Sorvete cremoso com intenso sabor de chocolate.',
    imagem: 'https://images.unsplash.com/photo-1505253210343-d872f78a4a34?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8,
    nome: 'Chocolate ao Leite',
    tipo: 'Doce',
    descricao: 'Barra de chocolate ao leite para adoçar seu dia.',
    imagem: 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9,
    nome: 'Empada de Frango',
    tipo: 'Salgado',
    descricao: 'Empadinha recheada com frango e temperos especiais.',
    imagem: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 10,
    nome: 'Água Mineral',
    tipo: 'Bebida',
    descricao: 'Água mineral gelada para matar sua sede.',
    imagem: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 11,
    nome: 'Sorvete de Baunilha',
    tipo: 'Sorvete',
    descricao: 'Sorvete clássico com sabor suave de baunilha.',
    imagem: 'https://images.unsplash.com/photo-1505253210343-d872f78a4a34?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 12,
    nome: 'Pirulito Colorido',
    tipo: 'Doce',
    descricao: 'Pirulito colorido e divertido para adoçar seu dia.',
    imagem: 'https://images.unsplash.com/photo-1515548213316-1a9ecf20f4bb?auto=format&fit=crop&w=400&q=80'
  }
];

function Produtos() {
  return (
    <div className="produtos-container">
      <section className="produtos-section">
        <h1>Produtos</h1>
        <p className="produtos-subtitle">
          Aqui você verá os produtos disponíveis na lanchonete escolar.
        </p>

        <div className="produtos-grid">
          {produtosMock.map(({ id, nome, tipo, descricao, imagem }) => (
            <div key={id} className="produto-card">
              <img src={imagem} alt={nome} className="produto-img" />
              <div className="produto-info">
                <h3>{nome}</h3>
                <span className="produto-tipo">{tipo}</span>
                <p className="produto-descricao">{descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Produtos;
