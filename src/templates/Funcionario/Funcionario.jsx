import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Funcionario.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Funcionario = () => {
  const [employees, setEmployees] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({ id: '', nome: '', email: '', senha: '' });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchEmployees(); 
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/funcionario"); 
      setEmployees(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const handleAddClick = () => {
    setCurrentEmployee({ id: '', nome: '', email: '', senha: '' });
    setIsEdit(false);
    setModalVisible(true);
  };

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setIsEdit(true);
    setModalVisible(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/funcionario/${id}`); 
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
    }
  };

  const handleSaveClick = async () => {
    if (!currentEmployee.nome || !currentEmployee.email || !currentEmployee.senha) {
      alert("Preencha todos os campos");
      return;
    }
    try {
      if (isEdit) {
        // Atualizar funcionário existente
        await axios.put(`http://localhost:8080/funcionario/${currentEmployee.id}`, currentEmployee); 
        setEmployees(employees.map((emp) => (emp.id === currentEmployee.id ? currentEmployee : emp)));
      } else {
        // Adicionar novo funcionário
        const response = await axios.post("http://localhost:8080/funcionario", currentEmployee); 
        setEmployees([...employees, response.data]);
      }
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({
      ...currentEmployee,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Funcionários</h1>
        <button className="adiciona" onClick={handleAddClick}>Adicionar Funcionário</button>

        {/* Formulário de edição/adicionamento */}
        {modalVisible && (
          <div className="edit-form">
            <h2>{isEdit ? 'Editar Funcionário' : 'Adicionar Funcionário'}</h2>
            {isEdit && (
              <input
                type="text"
                name="id"
                value={currentEmployee.id}
                disabled
                placeholder="ID"
              />
            )}
            <input
              type="text"
              name="nome"
              value={currentEmployee.nome}
              onChange={handleInputChange}
              placeholder="Nome"
            />
            <input
              type="email"
              name="email"
              value={currentEmployee.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="senha"
              value={currentEmployee.senha}
              onChange={handleInputChange}
              placeholder="Senha"
            />
            <button onClick={handleSaveClick}>Salvar</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>EMAIL</th>
              <th>SENHA</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="id">{employee.id}</td>
                <td>{employee.nome}</td>
                <td>{employee.email}</td>
                <td>{employee.senha}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditClick(employee)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDeleteClick(employee.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Funcionario;