import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import "./style.css";

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {

    if(input === ''){
      alert("digite algum CEP existente!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("erro ao discar o CEP");
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="Title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="ButtonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fffff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 &&(
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

export default App;
