import { Route, Routes } from "react-router-dom";
import App from "./../templates/App/App";
import Produtos from '../templates/Produtovisual/Produtos';
import FaleConosco from "../templates/FaleConosco/FaleConosco";
import QuemSomos from "../templates/Quemsomos/Quemsomos";
import { Login } from "../templates/Home/Login";
import { Pedido } from "../templates/Pedidos/Pedido";
import { Funcionario } from "../templates/Funcionario/Funcionario";
import { Produto } from "../templates/Produtos/Produto";
import Mensagem from "../templates/Mensagem/Mensagem";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutPublico from "../layouts/LayoutPublico";
import { Cartao } from "../templates/Cartao/Cartao";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas com layout público (Navbar + Footer) */}
      <Route element={<LayoutPublico />}>
        <Route path='/' element={<App />} />
        <Route path='/visual' element={<Produtos />} />
        <Route path='/quem' element={<QuemSomos />} />
        <Route path='/fale' element={<FaleConosco />} />
      </Route>

      {/* Login fora do layout */}
      <Route path='/login' element={<Login />} />

      {/* Rotas administrativas com layout do gerente */}
      <Route element={<LayoutAdmin />}>
        <Route path='/pedidos' element={<Pedido />} />
        <Route path='/funcionario' element={<Funcionario />} />
        <Route path='/produtos' element={<Produto />} />
        <Route path='/mensagens' element={<Mensagem />} />
        <Route path='/cartoes' element={<Cartao />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
