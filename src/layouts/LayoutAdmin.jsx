import React from 'react';
import SideBarGerente from '../components/sidebargerente/SideBarGerente';
import { Outlet } from 'react-router-dom';

const LayoutAdmin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBarGerente />
      <main style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <Outlet />  {/* Aqui é o lugar onde as rotas filhas vão renderizar */}
      </main>
    </div>
  );
};

export default LayoutAdmin;
