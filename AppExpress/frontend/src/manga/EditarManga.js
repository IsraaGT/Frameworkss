import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/mangas';

const CompEditarManga = () => {
    const [Titulo, setTitulo] = useState('');
    const [AutorId, setAutorId] = useState('');
    const [GeneroId, setGeneroId] = useState('');
    const [FechaDPublicacion, setFechaDPublicacion] = useState('');
    const navigate = useNavigate();

    // Aquí es donde obtienes el 'id' de los parámetros de la URL
    const { id } = useParams();  // asegúrate de usar 'id' en minúsculas

    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${URI}/${id}`, {  // Utiliza 'id' correctamente en la URL
            Titulo: Titulo, 
            AutorId: AutorId, 
            GeneroId: GeneroId, 
            FechaDPublicacion: FechaDPublicacion
        });
        navigate('/Mostrar');
    };

    useEffect(() => {
        getMangaById();
    }, []);

    const getMangaById = async () => {
        const res = await axios.get(`${URI}/${id}`);  // Utiliza 'id' aquí también
        setTitulo(res.data.Titulo);
        setAutorId(res.data.AutorId);
        setGeneroId(res.data.GeneroId);
        setFechaDPublicacion(res.data.FechaDPublicacion);
    };

    return (
        <div>
            <h3>Editar Manga</h3>
            <form onSubmit={update}>
                <div className="mb-3">
                    <div>
                        <label className="form-label">Titulo</label>
                        <input
                            value={Titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div>
                        <label className="form-label">Autor</label>
                        <input
                            value={AutorId}
                            onChange={(e) => setAutorId(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div>
                        <label className="form-label">Genero</label>
                        <input
                            value={GeneroId}
                            onChange={(e) => setGeneroId(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div>
                        <label className="form-label">Fecha De Publicacion</label>
                        <input
                            value={FechaDPublicacion}
                            onChange={(e) => setFechaDPublicacion(e.target.value)}
                            type="date"
                            className="form-control"
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
};

export default CompEditarManga;
