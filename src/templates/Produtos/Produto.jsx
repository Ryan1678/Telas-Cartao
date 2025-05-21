import React, { useState, useEffect } from 'react';
import './Produto.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

// Função para converter array de bytes em base64
function byteArrayToBase64(byteArray) {
  const binaryString = byteArray.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ''
  );
  return window.btoa(binaryString);
}

export const Produto = () => {
  const [produtos, setProdutos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentProduto, setCurrentProduto] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/produto')
      .then(response => response.json())
      .then(data => {
        const produtosComImagem = data.map(p => {
          if (p.imagem && Array.isArray(p.imagem)) {
            p.imagemBase64 = `data:image/jpeg;base64,${byteArrayToBase64(p.imagem)}`;
          }
          return p;
        });
        setProdutos(produtosComImagem);
      })
      .catch(error => console.error('Erro ao carregar produtos:', error));
  }, []);

  const handleEditClick = (produto) => {
    setIsEditing(true);
    setCurrentProduto({ ...produto });
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setCurrentProduto({
      id: '',
      imagemBase64: '',
      nome: '',
      tipo: '',
      preco: 0.0,
      descricao: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduto({
      ...currentProduto,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduto({
          ...currentProduto,
          imagemBase64: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    const produtoParaEnviar = {
      nome: currentProduto.nome,
      tipo: currentProduto.tipo,
      preco: currentProduto.preco,
      descricao: currentProduto.descricao,
      imagemBase64: currentProduto.imagemBase64
    };

    const url = isAdding
      ? 'http://localhost:8080/produto'
      : `http://localhost:8080/produto/${currentProduto.id}`;
    const method = isAdding ? 'POST' : 'PUT';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produtoParaEnviar)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao salvar produto');
        return res.json();
      })
      .then(produtoResp => {
        if (produtoResp.imagem && Array.isArray(produtoResp.imagem)) {
          produtoResp.imagemBase64 = `data:image/jpeg;base64,${byteArrayToBase64(produtoResp.imagem)}`;
        }

        if (isAdding) {
          setProdutos([...produtos, produtoResp]);
        } else {
          setProdutos(produtos.map(p => (p.id === produtoResp.id ? produtoResp : p)));
        }

        setIsAdding(false);
        setIsEditing(false);
        setCurrentProduto(null);
      })
      .catch(console.error);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsAdding(false);
    setCurrentProduto(null);
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/produto/${id}`, { method: 'DELETE' })
      .then(() => setProdutos(produtos.filter(p => p.id !== id)))
      .catch(error => {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir o produto.");
      });
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Produtos</h1>
        <button className="adiciona" onClick={handleAddClick}>
          Adicionar Produto
        </button>

        {(isEditing || isAdding) && (
          <div className="edit-form">
            <h2>{isAdding ? 'Adicionar Produto' : 'Editar Produto'}</h2>

            <input
              type="text"
              name="id"
              value={currentProduto.id}
              disabled
              placeholder="ID"
              className="input-text"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-file"
            />

            {currentProduto.imagemBase64 && (
              <img
                src={currentProduto.imagemBase64}
                alt="Preview"
                width="100"
                style={{ marginBottom: '10px' }}
              />
            )}

            <input
              type="text"
              name="nome"
              value={currentProduto.nome}
              onChange={handleInputChange}
              placeholder="Nome"
              className="input-text"
            />

            <select
              name="tipo"
              value={currentProduto.tipo}
              onChange={handleInputChange}
              className="input-select"
            >
              <option value="">Selecione o tipo</option>
              <option value="Sorvete">Sorvete</option>
              <option value="Salgado">Salgado</option>
              <option value="Doce">Doce</option>
              <option value="Bebidas">Bebidas</option>
            </select>

            <input
              type="number"
              name="preco"
              value={currentProduto.preco}
              onChange={handleInputChange}
              placeholder="Preço"
              className="input-text"
              step="0.01"
              min="0"
            />

            <input
              type="text"
              name="descricao"
              value={currentProduto.descricao}
              onChange={handleInputChange}
              placeholder="Descrição"
              className="input-text"
            />

            <button className="save-button" onClick={handleSaveClick}>
              Salvar
            </button>
            <button className="cancel-button" onClick={handleCancelClick}>
              Cancelar
            </button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGEM</th>
              <th>NOME</th>
              <th>TIPO</th>
              <th>PREÇO</th>
              <th>DESCRIÇÃO</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id}>
                <td className="id">{produto.id}</td>
                <td>
                  {produto.imagemBase64 ? (
                    <img
                      src={produto.imagemBase64}
                      alt={produto.nome}
                      width="50"
                    />
                  ) : (
                    <span>Sem imagem</span>
                  )}
                </td>
                <td>{produto.nome}</td>
                <td>{produto.tipo}</td>
                <td>{`R$ ${produto.preco.toFixed(2).replace('.', ',')}`}</td>
                <td>{produto.descricao}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(produto)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(produto.id)}
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

export default Produto;
