import { useEffect, useState, useContext } from 'react';
import { getUsers, deleteUser } from '../services/userService';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

export default function HomePage() {
    const { user: currentUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            // Filter to show only the logged in user
            const filteredData = data.filter(u => u.id === currentUser?.id);
            setUsers(filteredData);
        } catch (error) {
            console.error('Failed to load users', error);
            alert('Erro ao carregar usuários');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await deleteUser(id);
                setUsers(users.filter(user => user.id !== id));
            } catch (error) {
                console.error('Failed to delete user', error);
                alert('Erro ao deletar usuário');
            }
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Carregando...</div>;
    }

    return (
        <div>


            {/* 
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Lista de Usuários</h1>

            {users.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
                    Nenhum usuário encontrado.
                </div>
            ) : (
                <>
                    <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Nome</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition duration-150">
                                            <td className="px-6 py-4 text-gray-500 text-sm font-mono">#{user.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-indigo-50 text-indigo-600 p-2 rounded-full">
                                                        <UserIcon className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium text-gray-900">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        to={`/edit/${user.id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:hidden">
                        {users.map(user => (
                            <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-indigo-50 text-indigo-600 p-2 rounded-full">
                                            <UserIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{user.name}</h3>
                                            <p className="text-xs text-gray-500 font-mono">#{user.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <Link
                                            to={`/edit/${user.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="border-t border-gray-50 pt-3">
                                    <p className="text-sm text-gray-600">
                                        <span className="text-xs uppercase text-gray-400 font-semibold block mb-0.5">Email</span>
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            */}
            <div className="text-center py-20 text-gray-500">
                <p>Bem-vindo ao sistema!</p>
                <p className="text-sm mt-2">Utilize as opções no menu superior para navegar.</p>
            </div>


        </div>
    );
}
