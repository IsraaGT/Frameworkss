import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URI = 'http://localhost:8000/login'; // Esta debe ser la URL correcta para el login

const CompLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar credenciales de inicio de sesión a la API
            const response = await axios.post(URI, {
                email: email,
                password: password
            });

            // Verificar la respuesta del servidor
            if (response.status === 200) {
                navigate('/Mostrar'); // Redirigir si el login es exitoso
            } else {
                setErrorMessage('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            setErrorMessage('El inicio de sesión falló. Verifica tus credenciales.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                    {errorMessage && <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default CompLogin;
