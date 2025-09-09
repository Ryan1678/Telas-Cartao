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
    foto: '', // aqui armazenamos base64 da imagem
    statusUsuario: 'ATIVO',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [filter, setFilter] = useState('todos');

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

  const handleAddClick = () => {
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
    setModalVisible(true);
  };

  const handleEditClick = (employee) => {
    setCurrentEmployee({
      id: employee.id || '',
      nome: employee.nome || '',
      email: employee.email || '',
      senha: '', // senha fica vazia pra não mostrar no modal por segurança
      nivelAcesso: employee.nivelAcesso || 'ADMIN',
      foto: employee.foto || '', // base64 vindo do backend
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

  // Upload foto convertendo em base64
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

    // Só manda senha se estiver criando ou se usuário preencher a senha na edição
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

  const filteredEmployees =
    filter === 'clientes'
      ? employees.filter((emp) => emp.nivelAcesso?.toLowerCase() === 'cliente')
      : employees.filter((emp) => emp.nivelAcesso?.toLowerCase() !== 'cliente');

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

        {filter !== 'clientes' && (
          <button className="adiciona" onClick={handleAddClick}>
            Adicionar Usuário
          </button>
        )}

        {modalVisible && (
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

            <button onClick={handleSaveClick}>Salvar</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </div>
        )}

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
              // Corrige foto base64 para garantir prefixo válido
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
