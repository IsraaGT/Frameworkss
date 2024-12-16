import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/mangas';

const CompMostrarMangas = () => {
    const [mangas, setManga] = useState([]);

    useEffect(() => {
        getMangas();
    }, []);

    const getMangas = async () => {
        try {
            const res = await axios.get(URI);
            setManga(res.data);
        } catch (error) {
            console.error("Error al obtener los mangas:", error);
        }
    };

    const deleteManga = async (id) => {
        try {
            await axios.delete(`${URI}/${id}`); 
            getMangas();
        } catch (error) {
            console.error("Error al eliminar el manga:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to={'/create'} className='btn btn-primary'>Añadir Manga</Link>
                    <Link to={'/'} className='btn btn-danger'>Salir</Link>

                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Título</th>
                                <th>Autor ID</th>
                                <th>Género ID</th>
                                <th>Fecha de Publicación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mangas.length > 0 ? (
                                mangas.map((manga) => (
                                    <tr key={manga.Id}>
                                        <td>{manga.Titulo}</td>
                                        <td>{manga.AutorId}</td>
                                        <td>{manga.GeneroId}</td>
                                        <td>{new Date(manga.FechaDPublicacion).toLocaleDateString()}</td>
                                        <td>
                                            <Link to={`/edit/${manga.Id}`} className='btn btn-info'>Editar</Link>
                                            <button
                                                onClick={() => deleteManga(manga.Id)}
                                                className='btn btn-danger'
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No hay mangas disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompMostrarMangas;
