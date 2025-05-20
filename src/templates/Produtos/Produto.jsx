import React, { useState, useEffect } from 'react';
import './Produto.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Produto = () => {
  const [produtos, setProdutos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentProduto, setCurrentProduto] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Estado para o arquivo da imagem

  // Fetch produtos from the backend on component mount
  useEffect(() => {
    fetch('http://localhost:8080/produto')
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(error => console.error('Erro ao carregar produtos:', error));
  }, []);

  const handleEditClick = (produto) => {
    setIsEditing(true);
    setCurrentProduto({ ...produto });
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setCurrentProduto({ id: '', imagem: '', nome: '', tipo: '', preco: 0.0, descricao: '' });
    setImageFile(null); // Resetar a imagem ao adicionar novo produto
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduto({
      ...currentProduto,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduto({
          ...currentProduto,
          imagem: reader.result, // Armazenar a imagem como base64
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    if (isAdding) {
      fetch('http://localhost:8080/produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProduto),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao adicionar produto');
          }
          return response.json();
        })
        .then(newProduto => {
          setProdutos([...produtos, newProduto]);
          setIsAdding(false);
          setCurrentProduto(null);
        })
        .catch(error => console.error('Erro ao adicionar produto:', error));
    } else {
      fetch(`http://localhost:8080/produto/${currentProduto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProduto),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao atualizar produto');
          }
          return response.json();
        })
        .then(updatedProduto => {
          const updatedProdutos = produtos.map(produto =>
            produto.id === updatedProduto.id ? updatedProduto : produto
          );
          setProdutos(updatedProdutos);
          setIsEditing(false);
          setCurrentProduto(null);
        })
        .catch(error => console.error('Erro ao atualizar produto:', error));
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsAdding(false);
    setCurrentProduto(null); // Reset currentProduto to clear the form
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/produto/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedProdutos = produtos.filter(produto => produto.id !== id);
        setProdutos(updatedProdutos);
      })
      .catch(error => console.error('Erro ao excluir produto:', error));
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Produtos</h1>
        <button className="adiciona" onClick={handleAddClick}>Adicionar Produto</button>

        {/* Formulário de edição/adicionamento */}
        {(isEditing || isAdding) && (
          <div className="edit-form">
            <h2>{isAdding ? 'Adicionar Produto' : 'Editar Produto'}</h2>
            <input
              type="text"
              name="id"
              value={currentProduto.id}
              disabled
              placeholder="ID"
            />
            <input
              type="file" // Campo de upload de imagem
              accept="image/*"
              onChange={handleImageChange}
            />
            <input
              type="text"
              name="nome"
              value={currentProduto.nome}
              onChange={handleInputChange}
              placeholder="Nome"
            />
            <input
              type="text"
              name="tipo"
              value={currentProduto.tipo}
              onChange={handleInputChange}
              placeholder="Tipo"
            />
            <input
              type="number" // Use number input for price
              name="preco"
              value={currentProduto.preco}
              onChange={handleInputChange}
              placeholder="Preço"
            />
            <input
              type="text"
              name="descricao"
              value={currentProduto.descricao}
              onChange={handleInputChange}
              placeholder="Descrição"
            />
            <button onClick={handleSaveClick}>Salvar</button>
            <button onClick={handleCancelClick} style={{ marginLeft: '10px' }}>Cancelar</button>
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
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td className="id">{produto.id}</td>
                <td><img src={produto.imagem} alt={produto.nome} width="50" /></td>
                <td>{produto.nome}</td>
                <td>{produto.tipo}</td>
                <td>{`R$ ${produto.preco.toFixed(2).replace('.', ',')}`}</td>
                <td>{produto.descricao}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditClick(produto)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDeleteClick(produto.id)} style={{ marginLeft: '20px' }}>Excluir</button>
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
