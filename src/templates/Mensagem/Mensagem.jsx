import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mensagem.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Mensagens = () => {
  const [mensagens, setMensagens] = useState([]);

  // Buscar mensagens no backend
  useEffect(() => {
    axios.get('http://localhost:8080/mensagens')
      .then(response => {
        setMensagens(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar mensagens:", error);
      });
  }, []);

  // Excluir mensagem
  const handleDeleteClick = (id) => {
    if (window.confirm('Deseja remover esta mensagem?')) {
      axios.delete(`http://localhost:8080/mensagens/${id}`)
        .then(() => {
          setMensagens(prev => prev.filter(msg => msg.id !== id));
        })
        .catch(error => {
          console.error("Erro ao excluir mensagem:", error);
        });
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
                  <td>{msg.usuario?.nome || 'Sem nome'}</td>
                  <td>{msg.telefone}</td>
                  <td>{msg.titulo}</td>
                  <td>{msg.texto}</td>
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
