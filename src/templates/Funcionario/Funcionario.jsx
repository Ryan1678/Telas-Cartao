import React, { useState } from 'react';
import './Funcionario.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

const initialEmployees = [
  {
    id: '1',
    nome: 'Ana Silva',
    email: 'ana.silva@email.com',
    senha: '123456',
    nivelAcesso: 'Administrador',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    dataCadastro: '2024-01-15',
    status: 'Ativo',
  },
  {
    id: '2',
    nome: 'Carlos Souza',
    email: 'carlos.souza@email.com',
    senha: 'abcdef',
    nivelAcesso: 'Cliente',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    dataNascimento: '1985-06-12',
    documento: '123.456.789-00',
    telefone: '(11) 98765-4321',
    dataCadastro: '2023-11-20',
    status: 'Inativo',
  },
  {
    id: '3',
    nome: 'Joana Pereira',
    email: 'joana.pereira@email.com',
    senha: 'senha123',
    nivelAcesso: 'Vendedor',
    foto: 'https://randomuser.me/api/portraits/women/68.jpg',
    dataCadastro: '2024-03-10',
    status: 'Trocar Senha',
  },
];

export const Funcionario = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: '',
    nome: '',
    email: '',
    senha: '',
    nivelAcesso: 'Cliente',
    foto: '',
    dataNascimento: '',
    documento: '',
    telefone: '',
    dataCadastro: '',
    status: 'Ativo',
  });
  const [isEdit, setIsEdit] = useState(false);

  const [filter, setFilter] = useState('todos');

  const filteredEmployees = filter === 'clientes'
    ? employees.filter(emp => emp.nivelAcesso.toLowerCase() === 'cliente')
    : employees.filter(emp => ['administrador', 'vendedor'].includes(emp.nivelAcesso.toLowerCase()));

  const handleAddClick = () => {
    setCurrentEmployee({
      id: '',
      nome: '',
      email: '',
      senha: '',
      nivelAcesso: 'Cliente',
      foto: '',
      dataNascimento: '',
      documento: '',
      telefone: '',
      dataCadastro: '',
      status: 'Ativo',
    });
    setIsEdit(false);
    setModalVisible(true);
  };

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setIsEdit(true);
    setModalVisible(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleSaveClick = () => {
    if (!currentEmployee.nome || !currentEmployee.email || !currentEmployee.senha) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    if (isEdit) {
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? currentEmployee : emp));
    } else {
      const newId = (employees.length + 1).toString();
      setEmployees([...employees, { ...currentEmployee, id: newId }]);
    }
    setModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container">
      <SideBarGerente />
      <main className="main-content">
        <h1>Usuários</h1>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <button
            className={`filter-button ${filter === 'todos' ? 'active' : ''}`}
            onClick={() => setFilter('todos')}
          >
            Administradores e Vendedores
          </button>
          <button
            className={`filter-button ${filter === 'clientes' ? 'active' : ''}`}
            onClick={() => setFilter('clientes')}
          >
            Clientes
          </button>
        </div>

        <button className="adiciona" onClick={handleAddClick}>Adicionar Usuário</button>

        {modalVisible && (
          <div className="edit-form">
            <h2>{isEdit ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>

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
            <select
              name="nivelAcesso"
              value={currentEmployee.nivelAcesso}
              onChange={handleInputChange}
            >
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
            </select>
            <input
              type="text"
              name="foto"
              value={currentEmployee.foto}
              onChange={handleInputChange}
              placeholder="URL da Foto"
            />
            <select
              name="status"
              value={currentEmployee.status}
              onChange={handleInputChange}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="Trocar Senha">Trocar Senha</option>
            </select>

            <button onClick={handleSaveClick}>Salvar</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </div>
        )}

        {filter === 'todos' && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Senha</th>
                <th>Nível de Acesso</th>
                <th>Data Cadastro</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>
                    {emp.foto ? (
                      <img
                        src={emp.foto}
                        alt={emp.nome}
                        style={{ width: 40, height: 40, borderRadius: '50%' }}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{emp.nome}</td>
                  <td>{emp.email}</td>
                  <td>{emp.senha}</td>
                  <td className={`nivel-acesso ${emp.nivelAcesso.toLowerCase()}`}>
                    {emp.nivelAcesso}
                  </td>
                  <td>{emp.dataCadastro}</td>
                  <td className={`status ${emp.status.toLowerCase().replace(' ', '-')}`}>
                    {emp.status}
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(emp)}>Editar</button>
                    <button className="delete-button" onClick={() => handleDeleteClick(emp.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filter === 'clientes' && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Senha</th>
                <th>Data de Nascimento</th>
                <th>Documento</th>
                <th>Telefone</th>
                <th>Data Cadastro</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>
                    {cliente.foto ? (
                      <img
                        src={cliente.foto}
                        alt={cliente.nome}
                        style={{ width: 40, height: 40, borderRadius: '50%' }}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.senha}</td>
                  <td>{cliente.dataNascimento || '-'}</td>
                  <td>{cliente.documento || '-'}</td>
                  <td>{cliente.telefone || '-'}</td>
                  <td>{cliente.dataCadastro}</td>
                  <td className={`status ${cliente.status.toLowerCase().replace(' ', '-')}`}>
                    {cliente.status}
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteClick(cliente.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Funcionario;
