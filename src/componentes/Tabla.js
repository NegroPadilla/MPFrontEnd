import React, {useState} from "react";
import "./Tabla.css";

const Tabla = () =>{
    //const [contacts, setContacts] = useState(data);    

    return <div className="tabla-container">
        <table>
            <thead>
                <tr>
                    <th>Calle</th>
                    <th>Ciudade</th>
                    <th>Provincia</th>
                    <th>Region</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
};

export default Tabla;