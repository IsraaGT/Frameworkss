import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/mangas';
const CompCrearManga = () => {
    const [Titulo, setTitulo] = useState('');
    const [AutorId, setAutorId] = useState('');
    const [GeneroId, setGeneroId] = useState('');
    const [FechaDPublicacion, setFechaDPublicacion] = useState('');
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, {
            Titulo: Titulo, 
            AutorId: AutorId, 
            GeneroId: GeneroId, 
            FechaDPublicacion: FechaDPublicacion
        });
        navigate('/');
    };
    const goBackHome = () => {
        navigate('/Mostrar'); 
    };
    
    return (
        <div>
            <h3>Añadir Manga</h3>
            <form onSubmit={store}>
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
                <button type="button" className="btn btn-danger" onClick={goBackHome}>Cancelar</button> {/* Botón para ir al inicio */}

            </form>
        </div>
    );
};

export default CompCrearManga;
