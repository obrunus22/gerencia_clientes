import React from 'react';
import './App.css';
import ClientesList from './components/ClientesList';

function App() {
  return (
    <div className="App">
      <h2>Sistema de Gerenciamento de Clientes</h2>
      <ClientesList />
    </div>
  );
}

export default App;
