import React, {useState, useEffect} from 'react';
import api from '../../api';

export default () => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand_uid, setBrandUid] = useState('');
    const [produtos, setProduto] = useState([]);  

    async function sendProduct() {
        await api.post('/products', {
            name,
            quantity,
            brand_uid
        })
        .then((response) => setProduto([...produtos, response.data.product])
            )
        .catch((error) => console.log(error));
        setName('');
        setQuantity('');
        setBrandUid('');
    }

    useEffect(() => {
        api.get('/products')
        .then((response) => setProduto(response.data.products)) 
        .catch((error) => console.log(error));
    }, []);

   return (           
        <div>
            <div>
                <h3>Cadastro de Produtos</h3>
                <label>
                    Nome:
                    <input value={name} onChange={e => setName(e.target.value)}></input>
                </label>
                <br/>
                <label>
                    Quantidade:
                    <input value={quantity} onChange={e => setQuantity(e.target.value)}></input>
                </label>
                <br/>
                <label>
                    Marca do produto:
                    <input value={brand_uid} onChange={e => setBrandUid(e.target.value)}></input>
                </label>
                <br/>
                <button onClick={sendProduct}>Cadastrar Produto</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Marca - UID</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => 
                            <tr key={produto.uid}>
                                <td>{produto.name}</td>
                                <td>{produto.quantity}</td>
                                <td>{produto.brand_uid}</td>
                            </tr>
                )}
                </tbody>
            </table>
       </div>
   ); 
}