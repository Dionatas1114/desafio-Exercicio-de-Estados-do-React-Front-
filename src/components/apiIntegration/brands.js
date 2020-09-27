import React, { useState, useEffect } from 'react';
import api from '../../api';

export default () => {
    const [name, setName] = useState('');
    const [marcas, setMarcas] =useState([]);

    async function handleStoreBrand() {
        await api.post('/brands', {
            name
        })
        .then((response) => setMarcas([...marcas, response.data.brand]))
        .catch((error) => console.log(error));
        setName('');
    }

    async function handleDeleteBrand(uid) {
        await api.delete(`/brands/${uid}`)
        .then(response => {
            setMarcas(marcas.filter(marca => marca.uid !== uid));
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        api.get('/brands')
        .then((response) => setMarcas(response.data.brands))
        .catch((error) => console.log(error));
    }, []);

    return(
        <div>
            <div>
                <h3>Cadastro de Marcas</h3>
                    <label>
                        Nome:
                        <input value={name} onChange={e => setName(e.target.value)}></input>
                    </label>
                    <button onClick={handleStoreBrand}>Cadastrar Marca</button>
            </div>
        <tbody>
            {marcas.map((marca) =>
                <ul key={marca.uid}>
                    <li>{marca.name}
                        <button onClick={e => handleDeleteBrand(marca.uid)}>Delete</button>
                    </li>
                </ul>
            )}
        </tbody>
    </div>
    );
}