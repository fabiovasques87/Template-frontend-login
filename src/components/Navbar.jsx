import { Link } from 'react-router-dom';
import { Home, User as UserIcon, LogOut } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-base sm:text-xl text-indigo-600 hover:text-indigo-700 transition">
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Controle de Equipamentos/Materiais</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-indigo-600 hover:underline">Entrar</Link>
            <Link to="/register" className="text-indigo-600 hover:underline">Cadastrar</Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-base sm:text-xl text-indigo-600 hover:text-indigo-700 transition shrink-0">
          <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Controle de Equipamentos/Materiais</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-100 transition text-gray-700 font-medium text-sm group"
              aria-label="Menu do usuário"
            >
              <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-full group-hover:bg-indigo-200 transition">
                <UserIcon className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline max-w-[150px] truncate">{user.name}</span>
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-150 origin-top-right">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1 sm:hidden">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Usuário</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  </div>
                  <Link
                    to={`/user/edit/${user.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                  >
                    <UserIcon className="w-4 h-4" />
                    Editar Perfil
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-50 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
