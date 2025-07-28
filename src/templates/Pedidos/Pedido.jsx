import React, { useState } from 'react';
import './Pedido.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Pedido = () => {
  const [solicitacoes, setSolicitacoes] = useState([
    { idCartao: 'CV123456', valor: 250.00, dataSolicitacao: '2025-07-10' },
    { idCartao: 'CV987654', valor: 100.50, dataSolicitacao: '2025-07-12' },
    { idCartao: 'CV456789', valor: 320.75, dataSolicitacao: '2025-07-13' },
  ]);

  const handleDelete = (index) => {
    if (window.confirm('Tem certeza que deseja excluir esta solicitação?')) {
      const novasSolicitacoes = [...solicitacoes];
      novasSolicitacoes.splice(index, 1);
      setSolicitacoes(novasSolicitacoes);
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
            {solicitacoes.map((solicitacao, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{solicitacao.idCartao}</td>
                <td>{solicitacao.valor.toFixed(2)}</td>
                <td>{new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR')}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
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
