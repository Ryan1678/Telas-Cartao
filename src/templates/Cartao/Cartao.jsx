import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cartao.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Cartao = () => {
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoOperacao, setTipoOperacao] = useState('Entrada');
  const [valorOperacao, setValorOperacao] = useState('');
  const [cardSelecionado, setCardSelecionado] = useState(null);

  useEffect(() => {
    fetchCartoes();
  }, []);

  const fetchCartoes = async () => {
    try {
      const res = await axios.get('http://localhost:8080/cartoes');
      setCards(res.data);
    } catch (err) {
      console.error('Erro ao buscar cartões:', err);
    }
  };

  const abrirModal = (card, tipo) => {
    setTipoOperacao(tipo);
    setCardSelecionado(card);
    setValorOperacao('');
    setModalVisible(true);
  };

  const handleOperacao = async () => {
    const valor = parseFloat(valorOperacao);
    if (isNaN(valor) || valor <= 0) {
      alert('Digite um valor válido');
      return;
    }

    try {
      const endpoint =
        tipoOperacao === 'Entrada'
          ? `http://localhost:8080/cartoes/${cardSelecionado.id}/entrada`
          : `http://localhost:8080/cartoes/${cardSelecionado.id}/saida`;

      await axios.put(endpoint, null, { params: { valor } });

      setModalVisible(false);
      fetchCartoes();
    } catch (err) {
      console.error(`Erro na operação de ${tipoOperacao}:`, err);
      alert(err.response?.data || 'Erro na operação');
    }
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
                <td>{card.numero}</td>
                <td>{card.dataCadastro?.split('T')[0]}</td>
                <td>R$ {card.saldo?.toFixed(2)}</td>
                <td className={`status ${card.statusCartao?.toLowerCase()}`}>
                  {card.statusCartao}
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
