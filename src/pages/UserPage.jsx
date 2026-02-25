import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../services/userService';
import { ArrowLeft, Save } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

export default function UserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (id) {
            // Security check: only allow editing if ID matches or if creating new (though /new is also here)
            if (currentUser && id !== String(currentUser.id)) {
                alert('Você não tem permissão para editar outros usuários.');
                navigate('/');
                return;
            }
            loadUser();
        }
    }, [id, currentUser, navigate]);

    const loadUser = async () => {
        setLoading(true);
        try {
            const user = await getUserById(id);
            setFormData({ name: user.name, email: user.email, password: '' });
        } catch (error) {
            console.error('Failed to load user', error);
            alert('Erro ao carregar usuário');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                // Only send password if it's been filled
                const dataToUpdate = { ...formData };
                if (!dataToUpdate.password) {
                    delete dataToUpdate.password;
                }
                await updateUser(id, dataToUpdate);
            } else {
                await createUser(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Failed to save user', error);
            alert('Erro ao salvar usuário');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (

        <div className="max-w-xl mx-auto px-1 sm:px-0">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {id ? 'Editar Usuário' : 'Novo Usuário'}
                </h1>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="Ex: Fabio Vasques"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="Ex: fabio@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Nova Senha {id && '(deixe em branco para não alterar)'}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={!id}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="Sua senha secreta"
                        />
                    </div>

                    <div className="pt-2 sm:pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-lg hover:bg-indigo-700 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed text-base"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Salvando...' : 'Salvar Usuário'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


