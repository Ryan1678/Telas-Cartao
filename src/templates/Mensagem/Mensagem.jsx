import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mensagem.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Mensagens = () => {
  const [mensagens, setMensagens] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 🔍 novo estado

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

  // 🔍 Filtrar mensagens pelo telefone
  const filteredMensagens = mensagens.filter(
    (msg) =>
      msg.telefone &&
      msg.telefone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Mensagens Recebidas</h1>

        {/* 🔍 Barra de pesquisa */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Pesquisar por telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '280px',
              borderRadius: '8px',
              border: '1px solid rgb(205, 2, 124)',
            }}
          />
        </div>

        {filteredMensagens.length === 0 ? (
          <p>Nenhuma mensagem encontrada.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Telefone</th>
                <th>Título</th>
                <th>Detalhamento</th>
                <th>Data Envio</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMensagens.map(msg => (
                <tr key={msg.id}>
                  <td>{msg.telefone}</td>
                  <td>{msg.titulo}</td>
                  <td>{msg.texto}</td>
                  <td>{msg.dataMensagem}</td>
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
