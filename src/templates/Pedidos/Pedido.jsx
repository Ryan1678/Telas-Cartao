import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pedido.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Pedido = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 🔍 novo estado

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

  // 🔍 Filtrar solicitações pelo número do cartão
  const filteredSolicitacoes = solicitacoes.filter((solicitacao) =>
    solicitacao.cartao?.numero &&
    solicitacao.cartao.numero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Solicitações de Cartão Virtual</h1>

        {/* 🔍 Barra de pesquisa */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Pesquisar pelo número do cartão..."
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

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID do Cartão</th>
              <th>Número do Cartão</th>
              <th>Valor Solicitado (R$)</th>
              <th>Data da Solicitação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredSolicitacoes.map((solicitacao) => (
              <tr key={solicitacao.id}>
                <td>{solicitacao.id}</td>
                <td>{solicitacao.cartao?.id || 'Sem cartão'}</td>
                <td>{solicitacao.cartao?.numero || 'Sem cartão'}</td>
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
