import React, { useEffect, useState } from 'react';
import './Mensagem.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Mensagens = () => {
  const [mensagens, setMensagens] = useState([]);

  // Buscar mensagens do backend
  useEffect(() => {
    fetch('http://localhost:8080/mensagem')
      .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar mensagens');
        return response.json();
      })
      .then(data => setMensagens(data))
      .catch(error => {
        console.error('Erro ao carregar mensagens:', error);
        alert('Erro ao carregar mensagens. Verifique o servidor.');
      });
  }, []);

  // Função para deletar mensagem
  const handleDeleteClick = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta mensagem?')) {
      fetch(`http://localhost:8080/mensagem/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) throw new Error('Erro ao excluir');
          // Remove da lista no front-end
          setMensagens(prev => prev.filter(m => m.id !== id));
        })
        .catch(error => {
          console.error('Erro ao excluir mensagem:', error);
          alert('Erro ao excluir a mensagem.');
        });
    }
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Mensagens</h1>

        {mensagens.length === 0 ? (
          <p>Nenhuma mensagem encontrada.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>TÍTULO</th>
                <th>DETALHAMENTO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {mensagens.map(msg => (
                <tr key={msg.id}>
                  <td>{msg.id}</td>
                  <td>{msg.nome}</td>
                  <td>{msg.email}</td>
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
