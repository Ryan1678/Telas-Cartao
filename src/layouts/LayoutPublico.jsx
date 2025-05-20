import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer'; // Verifique o caminho
import Navbar from '../components/NavBar/NavBar'; // Verifique o caminho e o nome correto do arquivo

const LayoutPublico = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPublico;
