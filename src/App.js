import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import "./componentes/estilo.css"
import Tabla from "./componentes/Tabla";
import Editar from "./componentes/Editar";

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element= {<Tabla/>}/>
        <Route exact path="/editar/:id" element= {<Editar/>}/>
        <Route exact path="/agregar" element= {<Editar/>}/>
      </Routes>
    </Router>

  );
}

export default App;
