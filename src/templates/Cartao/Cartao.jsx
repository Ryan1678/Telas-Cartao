import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cartao.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Cartao = ({ userId }) => {
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoOperacao, setTipoOperacao] = useState('Entrada');
  const [valorOperacao, setValorOperacao] = useState('');
  const [codigoRetirada, setCodigoRetirada] = useState('');
  const [cardSelecionado, setCardSelecionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // 🔍 novo estado de pesquisa

  useEffect(() => {
    fetchCartoes();
  }, []);

  // Buscar cartões
  const fetchCartoes = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/cartao`);
      setCards(res.data);
    } catch (err) {
      console.error('Erro ao buscar cartões:', err);
      alert('Erro ao buscar cartões');
    }
  };

  // Abrir modal de operação
  const abrirModal = (card, tipo) => {
    setCardSelecionado(card);
    setTipoOperacao(tipo);
    setValorOperacao('');
    setCodigoRetirada('');
    setModalVisible(true);
  };

  // Confirmar operação
  const handleOperacao = async () => {
    const valor = parseFloat(valorOperacao);
    if (isNaN(valor) || valor <= 0) {
      alert('Digite um valor válido');
      return;
    }

    try {
      const endpoint =
        tipoOperacao === 'Entrada'
          ? `http://localhost:8080/api/cartao/${cardSelecionado.id}/entrada`
          : `http://localhost:8080/api/cartao/${cardSelecionado.id}/saida`;

      const params =
        tipoOperacao === 'Entrada'
          ? { valor }
          : { valor, codigoResgate: codigoRetirada };

      await axios.put(endpoint, null, { params });

      setModalVisible(false);
      setCodigoRetirada('');
      fetchCartoes();
    } catch (err) {
      console.error(`Erro na operação de ${tipoOperacao}:`, err);
      alert(err.response?.data || 'Erro na operação');
    }
  };

  // 🔍 Filtro de pesquisa (ID ou número)
  const filteredCards = cards.filter(
    (card) =>
      String(card.id).includes(searchTerm) ||
      (card.numero && card.numero.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Cartões</h1>

        {/* 🔍 Barra de pesquisa */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Pesquisar por ID ou Número do cartão"
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

            {tipoOperacao === 'Saída' && (
              <input
                type="text"
                placeholder="Digite o código de retirada"
                value={codigoRetirada}
                onChange={(e) => setCodigoRetirada(e.target.value)}
                style={{ marginTop: '10px' }}
              />
            )}

            <button onClick={handleOperacao} style={{ marginTop: '10px' }}>
              Confirmar
            </button>
            <button
              onClick={() => setModalVisible(false)}
              style={{ marginTop: '5px', backgroundColor: 'gray' }}
            >
              Cancelar
            </button>
          </div>
        )}

        {/* 🔍 Lista filtrada */}
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
            {filteredCards.map((card) => (
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
                  <button
                    className="edit-button"
                    onClick={() => abrirModal(card, 'Entrada')}
                  >
                    Entrada
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => abrirModal(card, 'Saída')}
                  >
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
