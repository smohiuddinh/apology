import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Layout({ children, onLoginClick, user, onLogout }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLoginClick={onLoginClick} user={user} onLogout={onLogout} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
  