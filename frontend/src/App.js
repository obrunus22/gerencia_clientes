import React from 'react';
import './App.css';
import ClientesList from './components/ClientesList';
import CadastroCliente from './components/CadastroCliente';

function App() {
  return (
    <div className="App">
      <h2>Sistema de Gerenciamento de Clientes</h2>
      <CadastroCliente />
      <br />
      <ClientesList />
    </div>
  );
}

export default App;
