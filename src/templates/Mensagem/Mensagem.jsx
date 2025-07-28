import React, { useState } from 'react';
import './Mensagem.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Mensagens = () => {
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      nome: 'João Silva',
      telefone: '(11) 91234-5678',
      titulo: 'Problema com cartão',
      detalhamento: 'Meu cartão virtual não chegou ainda.',
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      telefone: '(21) 99876-5432',
      titulo: 'Dúvida sobre recarga',
      detalhamento: 'Quero saber como funciona a recarga mensal.',
    },
  ]);

  const handleDeleteClick = (id) => {
    if (window.confirm('Deseja remover esta mensagem?')) {
      setMensagens(prev => prev.filter(msg => msg.id !== id));
    }
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Mensagens Recebidas</h1>

        {mensagens.length === 0 ? (
          <p>Nenhuma mensagem disponível.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Titulo</th>
                <th>Detalhamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mensagens.map(msg => (
                <tr key={msg.id}>
                  <td>{msg.nome}</td>
                  <td>{msg.telefone}</td>
                  <td>{msg.titulo}</td>
                  <td>{msg.detalhamento}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(msg.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Mensagens;
