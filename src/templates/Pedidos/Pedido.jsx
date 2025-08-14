import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pedido.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Pedido = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);

  // Buscar solicitações do backend
  useEffect(() => {
    axios.get('http://localhost:8080/solicitacoes')
      .then(response => {
        setSolicitacoes(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar solicitações:", error);
      });
  }, []);

  // Excluir solicitação
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta solicitação?')) {
      axios.delete(`http://localhost:8080/solicitacoes/${id}`)
        .then(() => {
          setSolicitacoes(prev => prev.filter(solicitacao => solicitacao.id !== id));
        })
        .catch(error => {
          console.error("Erro ao excluir solicitação:", error);
        });
    }
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Solicitações de Cartão Virtual</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID do Cartão</th>
              <th>Valor Solicitado (R$)</th>
              <th>Data da Solicitação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {solicitacoes.map((solicitacao) => (
              <tr key={solicitacao.id}>
                <td>{solicitacao.id}</td>
                <td>{solicitacao.cartao?.id || 'Sem cartão'}</td>
                <td>{solicitacao.valor.toFixed(2)}</td>
                <td>{new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR')}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(solicitacao.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Pedido;
