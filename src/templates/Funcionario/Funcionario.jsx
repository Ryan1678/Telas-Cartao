import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Funcionario.css';
import SideBarGerente from '../../components/sidebargerente/SideBarGerente';

export const Funcionario = () => {
  const [employees, setEmployees] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: '',
    nome: '',
    email: '',
    senha: '',
    nivelAcesso: 'ADMIN',
    foto: '',
    statusUsuario: 'ATIVO',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [filter, setFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8080/usuarios');
      setEmployees(res.data);
    } catch (err) {
      console.error('Erro ao buscar funcionários:', err);
    }
  };

  const resetForm = () => {
    setCurrentEmployee({
      id: '',
      nome: '',
      email: '',
      senha: '',
      nivelAcesso: 'ADMIN',
      foto: '',
      statusUsuario: 'ATIVO',
    });
    setIsEdit(false);
  };

  const handleAddClick = () => {
    resetForm();
    setModalVisible(true);
  };

  const handleEditClick = (employee) => {
    setCurrentEmployee({
      id: employee.id || '',
      nome: employee.nome || '',
      email: employee.email || '',
      senha: '',
      nivelAcesso: employee.nivelAcesso || 'ADMIN',
      foto: employee.foto || '',
      statusUsuario: employee.statusUsuario || 'ATIVO',
    });
    setIsEdit(true);
    setModalVisible(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`http://localhost:8080/usuarios/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error('Erro ao excluir funcionário:', err);
      }
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentEmployee((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async () => {
    if (
      !(currentEmployee.nome || '').trim() ||
      !(currentEmployee.email || '').trim() ||
      (!isEdit && !(currentEmployee.senha || '').trim()) ||
      !(currentEmployee.nivelAcesso || '').trim() ||
      !(currentEmployee.statusUsuario || '').trim()
    ) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const payload = {
      nome: currentEmployee.nome,
      email: currentEmployee.email,
      nivelAcesso: currentEmployee.nivelAcesso,
      statusUsuario: currentEmployee.statusUsuario,
    };

    if (!isEdit || (isEdit && currentEmployee.senha.trim())) {
      payload.senha = currentEmployee.senha;
    }

    if (currentEmployee.foto) {
      payload.foto = currentEmployee.foto;
    }

    try {
      if (isEdit) {
        await axios.put(`http://localhost:8080/usuarios/${currentEmployee.id}`, payload);
      } else {
        await axios.post('http://localhost:8080/usuarios', payload);
      }
      setModalVisible(false);
      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error('Erro ao salvar funcionário:', err);
      alert('Erro ao salvar. Veja o console para detalhes.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const filteredByType =
    filter === 'clientes'
      ? employees.filter((emp) => emp.nivelAcesso?.toLowerCase() === 'cliente')
      : employees.filter((emp) => emp.nivelAcesso?.toLowerCase() !== 'cliente');

  const filteredEmployees = filteredByType.filter(
    (emp) =>
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(emp.id).includes(searchTerm)
  );

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
            Todos
          </button>
          <button
            className={`filter-button ${filter === 'clientes' ? 'active' : ''}`}
            onClick={() => setFilter('clientes')}
          >
            Apenas Clientes
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Pesquisar por ID ou Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '250px',
              borderRadius: '8px',
              border: '1px solid rgb(205, 2, 124)',
            }}
          />
        </div>

        {filter !== 'clientes' && (
          <button className="adiciona" onClick={handleAddClick}>
            Adicionar Usuário
          </button>
        )}

        {modalVisible && (
          <div className="modal-overlay">
            <div className="edit-form">
              <h2>{isEdit ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>

              {isEdit && (
                <input type="text" name="id" value={currentEmployee.id} disabled placeholder="ID" />
              )}

              <input
                type="text"
                name="nome"
                value={currentEmployee.nome}
                onChange={handleInputChange}
                placeholder="Nome *"
              />
              <input
                type="email"
                name="email"
                value={currentEmployee.email}
                onChange={handleInputChange}
                placeholder="Email *"
              />
              <input
                type="password"
                name="senha"
                value={currentEmployee.senha}
                onChange={handleInputChange}
                placeholder="Senha *"
              />

              <select
                name="nivelAcesso"
                value={currentEmployee.nivelAcesso}
                onChange={handleInputChange}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="VENDEDOR">VENDEDOR</option>
              </select>

              <input type="file" accept="image/*" onChange={handleFotoChange} />

              {currentEmployee.foto && (
                <img
                  src={currentEmployee.foto}
                  alt="Preview"
                  style={{ width: 80, height: 80, borderRadius: '50%', marginTop: 10 }}
                />
              )}

              <select
                name="statusUsuario"
                value={currentEmployee.statusUsuario}
                onChange={handleInputChange}
              >
                <option value="ATIVO">ATIVO</option>
                <option value="INATIVO">INATIVO</option>
                <option value="TROCAR SENHA">TROCAR SENHA</option>
              </select>

              <div className="modal-actions">
                <button className="save-button" onClick={handleSaveClick}>
                  Salvar
                </button>
                <button
                  className="cancel-button"
                  onClick={() => {
                    resetForm();
                    setModalVisible(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* tabela continua igual */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              {filter === 'clientes' && (
                <>
                  <th>Data de nascimento</th>
                  <th>Documento</th>
                  <th>Telefone</th>
                  <th>Tipo Cliente</th>
                </>
              )}
              <th>Nível de Acesso</th>
              <th>Data Cadastro</th>
              <th>Status</th>
              {filter !== 'clientes' && <th>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => {
              const fotoSrc =
                emp.foto && emp.foto.startsWith('data:image')
                  ? emp.foto
                  : emp.foto
                  ? `data:image/png;base64,${emp.foto}`
                  : null;

              return (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>
                    {fotoSrc ? (
                      <img
                        src={fotoSrc}
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

                  {filter === 'clientes' && (
                    <>
                      <td>{emp.cliente?.dataNascimento || '-'}</td>
                      <td>{emp.cliente?.documento || '-'}</td>
                      <td>{emp.cliente?.telefone || '-'}</td>
                      <td>{emp.cliente?.tipoCliente || '-'}</td>
                    </>
                  )}

                  <td className={`nivel-acesso ${emp.nivelAcesso ? emp.nivelAcesso.toLowerCase() : ''}`}>
                    {emp.nivelAcesso}
                  </td>
                  <td>{emp.dataCadastro ? emp.dataCadastro.split('T')[0] : '-'}</td>
                  <td
                    className={`status ${
                      emp.statusUsuario ? emp.statusUsuario.toLowerCase().replace(' ', '-') : ''
                    }`}
                  >
                    {emp.statusUsuario}
                  </td>

                  {filter !== 'clientes' && (
                    <td>
                      <button className="edit-button" onClick={() => handleEditClick(emp)}>
                        Editar
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteClick(emp.id)}>
                        Excluir
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Funcionario;
