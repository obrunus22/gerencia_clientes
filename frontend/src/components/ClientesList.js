// Dentro do src/components/ClientesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const ClientesList = () => {
    const [filtro, setFiltro] = useState('');
    const [clientes, setClientes] = useState([]);
    const [ordemVisita, setOrdemVisita] = useState([]);
    const [modalAberta, setModalAberta] = useState(false);
    const [loadding, setLoading] = useState(true);

    const fetchClientes = async () => {
        try {
            const resp = await axios.get('http://localhost:1337/clientes');
            setClientes(resp.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const calcularRotaOtimizada = async () => {
        try {
            const resp = await axios.get('http://localhost:1337/clientes/calculaRotas');
            setOrdemVisita(resp.data);
            setModalAberta(true);
        } catch (error) {
            console.error('Erro ao calcular rota otimizada:', error);
        }
    };

    const pesquisar = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const resp = await axios.get(`http://localhost:1337/clientes?filtro=${filtro}`);
            setClientes(resp.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const limparFiltro = async (e) => {
        e.preventDefault();
        setFiltro('')
        fetchClientes();
    }

    return (
        <div>
            <div style={{ border: '1px solid', width: '50%', marginLeft: 'auto', marginRight: 'auto', borderRadius: 5 }}>
                <h2>Lista de Clientes</h2>

                {loadding ?
                    <span>Carregando...</span>
                    :
                    <div>
                        <div style={{ width: '65%' }}>
                            <form onSubmit={pesquisar} style={{ display: 'inline-flex' }}>
                                <label>
                                    <strong>Filtrar:</strong>
                                    <input type='text' value={filtro} placeholder='Nome, Email, Telefone...' onChange={(e) => { setFiltro(e.target.value) }}></input>
                                </label>
                            </form>
                            <button disabled={!!!filtro} style={{ marginLeft: 5 }} onClick={limparFiltro}>Limpar</button>
                        </div>

                        {clientes.length > 0 ?
                            <div align="center" style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }}>

                                <div align="right" style={{ marginBottom: 10, marginTop: 10 }}>
                                    <button style={{ marginRight: 25 }} onClick={calcularRotaOtimizada}>Calcular Rota Otimizada</button>
                                </div>

                                <table border="1px" style={{ width: '100%' }}>
                                    <thead><tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Coordenadas (X-Y)</th></tr></thead>
                                    <tbody>
                                        {clientes.map((cliente) => (
                                            <tr key={cliente.id}>
                                                <td>{cliente.id} - {cliente.nome}</td>
                                                <td>{cliente.email}</td>
                                                <td>{cliente.telefone}</td>
                                                <td align="center">({cliente.coordenada_x} - {cliente.coordenada_y})</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            : <span>Não existe cliente cadastro!</span>}
                    </div>
                }

                <Modal isOpen={modalAberta} onRequestClose={() => setModalAberta(false)} contentLabel="Ordem de Visitação" ariaHideApp={false} style={{ content: { width: '20%', marginLeft: 'auto', marginRight: 'auto' } }}>
                    <div style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h2>Ordem de Visitação</h2>
                        <ul>
                            <li key='0'>
                                <strong>Empresa (saída)</strong>
                            </li>
                            {ordemVisita.map((clienteId) => (
                                <li key={clienteId}>
                                    {clientes.find((cliente) => cliente.id === clienteId)?.nome}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ClientesList;