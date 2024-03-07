// Dentro do src/components/CadastroCliente.js
import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const CadastroCliente = (props) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [coordenadaX, setCoordenadaX] = useState('');
    const [coordenadaY, setCoordenadaY] = useState('');
    const [modalAberta, setModalAberta] = useState(false);

    const cadastrarCliente = async () => {
        try {
            if (nome === ''){
                alert("Preencha o nome do cliente.");
                return false;
            }

            if (email === ''){
                alert("Preencha o email do cliente.");
                return false;
            }

            if (telefone === ''){
                alert("Preencha o telefone do cliente.");
                return false;
            }

            if (coordenadaX === ''){
                alert("Preencha a coordenada X do cliente.");
                return false;
            }

            if (coordenadaY === ''){
                alert("Preencha a coordenada Y do cliente.");
                return false;
            }

            const response = await axios.post('http://localhost:1337/clientes', {
                nome,
                email,
                telefone,
                coordenadaX,
                coordenadaY,
            });

            debugger;
            props.refresh();
            setModalAberta(false);
            console.log('Cliente cadastrado:', response.data);
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
        }
    };

    const adicionaCliente = () => {
        setNome('');
        setEmail('');
        setTelefone('');
        setCoordenadaX('');
        setCoordenadaY('');
        setModalAberta(true);
    }

    return (
        <div>
            <button onClick={adicionaCliente}>+ Adicionar novo cliente</button>

            <Modal isOpen={modalAberta} style={{ content: { width: '45%', marginLeft: 'auto', marginRight: 'auto', height: 250 } }} contentLabel="Cadastro de Clientes" ariaHideApp={false}>
                <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <h2>Cadastro de Clientes</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        <strong>Nome:</strong>
                                        <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} />
                                    </label>
                                    <label>
                                        <strong>Telefone:</strong>
                                        <input type="text" style={{ width: '108px' }} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label >
                                        <strong>Email:</strong>
                                        <input type="text" style={{ width: '358px' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <fieldset style={{ width: '150px' }}>
                        <legend><strong>Coordenadas</strong></legend>
                        <label>
                            <strong>X:</strong>
                            <input type="text" style={{ width: '30px' }} value={coordenadaX} onChange={(e) => setCoordenadaX(e.target.value)} />
                        </label>

                        <label style={{ marginLeft: 30 }}>
                            <strong>Y:</strong>
                            <input type="text" style={{ width: '30px' }} value={coordenadaY} onChange={(e) => setCoordenadaY(e.target.value)} />
                        </label>
                    </fieldset>
                </div>

                <div align="right" style={{ bottom: 5, position: 'absolute', right: 5 }}>
                    <button type="button" onClick={cadastrarCliente}>
                        Cadastrar Cliente
                    </button>
                    <button style={{ marginLeft: 10 }} type="button" onClick={() => { setModalAberta(false) }}>
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CadastroCliente;