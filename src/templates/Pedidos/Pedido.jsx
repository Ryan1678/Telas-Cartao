import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns'; // Importa parseISO também
import './Pedido.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/pedido')
      .then(response => response.json())
      .then(data => setPedidos(data))
      .catch(error => console.error('Erro ao carregar pedidos:', error));
  }, []);

  const handleEditClick = (pedido) => {
    setIsEditing(true);
    setCurrentPedido({ ...pedido });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPedido({
      ...currentPedido,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    fetch(`http://localhost:8080/pedido/${currentPedido.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentPedido),
    })
      .then(response => response.json())
      .then(updatedPedido => {
        const updatedPedidos = pedidos.map(pedido =>
          pedido.id === updatedPedido.id ? updatedPedido : pedido
        );
        setPedidos(updatedPedidos);
        setIsEditing(false);  // Fecha o formulário de edição
      })
      .catch(error => console.error('Erro ao atualizar pedido:', error));
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/pedido/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedPedidos = pedidos.filter(pedido => pedido.id !== id);
        setPedidos(updatedPedidos);
      })
      .catch(error => console.error('Erro ao excluir pedido:', error));
  };

  const handleCancelClick = () => {
    setIsEditing(false);  // Fecha o formulário sem salvar as alterações
    setCurrentPedido(null);  // Limpa o estado do pedido atual
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Pedidos</h1>

        {isEditing && (
          <div className="edit-form">
            <h2>Editar Pedido</h2>
            <input
              type="text"
              name="id"
              value={currentPedido.id}
              disabled
              onChange={handleInputChange}
              placeholder="ID"
            />
            <input
              type="text"
              name="data"
              value={currentPedido.data_hora_compra}
              onChange={handleInputChange}
              placeholder="Data"
            />
            <input
              type="text"
              name="emissor"
              value={currentPedido.emissor}
              onChange={handleInputChange}
              placeholder="Emissor"
            />
            <input
              type="text"
              name="email"
              value={currentPedido.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="metodo"
              value={currentPedido.metodo}
              onChange={handleInputChange}
              placeholder="Método"
            />
            <input
              type="text"
              name="status"
              value={currentPedido.status}
              onChange={handleInputChange}
              placeholder="Status"
            />
            
            <div className="edit-buttons">
              <button onClick={handleSaveClick}>Salvar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATA</th>
              <th>EMISSOR</th>
              <th>EMAIL</th>
              <th>MÉTODO</th>
              <th>STATUS</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td className="id">{pedido.id}</td>
                {/* Formata a data para mostrar apenas o dia, mês e ano */}
                <td>{pedido.data_hora_compra ? format(parseISO(pedido.data_hora_compra), 'dd/MM/yyyy') : 'N/A'}</td>
                <td>{pedido.emissor}</td>
                <td>{pedido.email}</td>
                <td>{pedido.metodo}</td>
                <td>{pedido.status}</td>
                <td className="product-actions">
                  <button className="edit-button" onClick={() => handleEditClick(pedido)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDeleteClick(pedido.id)}>Excluir</button>
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
