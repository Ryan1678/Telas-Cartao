import React, { useState } from 'react';
import './Cartao.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

const initialCards = [
  {
    id: '1',
    nome: 'Ana Silva',
    numeroCartao: '1234 5678 9012 3456',
    dataCadastro: '2024-01-10',
    saldo: 1500.75,
    status: 'Ativo',
  },
  {
    id: '2',
    nome: 'Carlos Souza',
    numeroCartao: '9876 5432 1098 7654',
    dataCadastro: '2023-12-05',
    saldo: 250.0,
    status: 'Inativo',
  },
];

export const Cartao = () => {
  const [cards, setCards] = useState(initialCards);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoOperacao, setTipoOperacao] = useState('Entrada'); // Entrada ou Saída
  const [valorOperacao, setValorOperacao] = useState('');
  const [cardSelecionado, setCardSelecionado] = useState(null);

  const abrirModal = (card, tipo) => {
    setTipoOperacao(tipo);
    setCardSelecionado(card);
    setValorOperacao('');
    setModalVisible(true);
  };

  const handleOperacao = () => {
    const valor = parseFloat(valorOperacao);
    if (isNaN(valor) || valor <= 0) {
      alert('Digite um valor válido');
      return;
    }

    const novoSaldo =
      tipoOperacao === 'Entrada'
        ? cardSelecionado.saldo + valor
        : cardSelecionado.saldo - valor;

    if (novoSaldo < 0) {
      alert('Saldo insuficiente para a operação.');
      return;
    }

    const cardsAtualizados = cards.map((c) =>
      c.id === cardSelecionado.id ? { ...c, saldo: novoSaldo } : c
    );

    setCards(cardsAtualizados);
    setModalVisible(false);
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Cartões</h1>

        {modalVisible && (
          <div className="edit-form">
            <h2>{tipoOperacao} de Saldo</h2>
            <p>
              Cartão de: <strong>{cardSelecionado?.nome}</strong>
            </p>
            <p>
              Saldo atual: <strong>R$ {cardSelecionado?.saldo.toFixed(2)}</strong>
            </p>

            <input
              type="number"
              placeholder="Digite o valor"
              value={valorOperacao}
              onChange={(e) => setValorOperacao(e.target.value)}
              min="0"
              step="0.01"
            />

            <button onClick={handleOperacao}>Confirmar</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Número do Cartão</th>
              <th>Data do Cadastro</th>
              <th>Saldo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id}>
                <td>{card.id}</td>
                <td>{card.nome}</td>
                <td>{card.numeroCartao}</td>
                <td>{card.dataCadastro}</td>
                <td>R$ {card.saldo.toFixed(2)}</td>
                <td className={`status ${card.status.toLowerCase()}`}>
                  {card.status}
                </td>
                <td>
                  <button className="edit-button" onClick={() => abrirModal(card, 'Entrada')}>
                   Entrada
                 </button>
                  <button className="delete-button" onClick={() => abrirModal(card, 'Saída')}>
                   Saída
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

export default Cartao;
