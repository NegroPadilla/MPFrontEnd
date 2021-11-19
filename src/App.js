import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import Tabla from "./componentes/Tabla"

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element= {<Tabla/>}/>
      </Routes>
    </Router>

  );
}

export default App;
