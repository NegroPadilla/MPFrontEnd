import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import { Card } from "primereact/card";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import { Messages } from 'primereact/messages';

const Tabla = () =>{
    const {tabla, setTabla} = useState([]);
    const Nav = useNavigate();

    const columns =[
        {field: 'id', header: 'id calle'},
        {field: 'Nombre_Calle', header: 'Nombre calle'},
        {field: 'Nombre_Ciudad', header:'Nombre Ciudad'},
        {field: 'Nombre_Provincia', header:'Nombre Provincia'},
        {field: 'Nombre_Region', header:'Nombre Region'},
    ];

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    const obtenerTabla = async() =>{
        try{
            const response = await fetch('http://laravel-api.test/api/calles/get/all'); 
            if(response.status===200){
                const datos = response.json();
                setTabla([]);
                setTabla(datos);
            }
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        obtenerTabla();
    }, []);

    const borrarTabla = async(id) =>{
        try{
            const response = await fetch('http://laravel-api.test/api/calles/get/all',
            {method: 'DELETE',
             headers:{
                'Content-Type': 'application/json'
             }
            });
        if(response.status===204){
            Messages.current.show({
                 severity: 'succes', 
                 summary: 'Elimino la calle con exito', 
                 sticky: 'true' });
        }else{
            Messages.current.show({ 
                severity: 'error', 
                summary: 'Error en borrar la calle', 
                sticky: 'true' });
        }
        }catch(error) {
            console.log(error);
    }};

    const confirmar = (id) =>{
        confirmDialog({
            message: '¿Esta seguro de eliminar esta calle?',
            header: 'Confirma la eliminacion',
            icon: 'pi-info-circle',
            accept: () => borrarTabla(id),
        });
    }

    const botonBorrar = (rowData)=>{
        return(
            <Button
            label="Eliminar calle" 
            className="p-button-rounded p-button-warning"
            onClick={() => confirmar(rowData.id)}
            />
        )
    };

    const botonEditar = (rowData) =>{
        return(
            <Button
            label="Editar Calle"
            className="p-button-rounded p-button-help"
            onClick={() => Nav('/editar/${rowData.id}')}
            />
        )
    };

    return(
        <div>
            <div>
                <h2>Listado de Calles</h2>
                <Button
                    label= "Agregar Calles"
                    onClick={() =>Nav("/agregar")}
                    className= "p-button-rounded p-button-success"
                >
                </Button>
            </div>
            <Card>
                <DataTable 
                value={tabla} responsiveLayout="scroll"
                style={{
                    width: "100%",
                    margin: "1rem",
                     color: "#212529",
                     border: "1px solid #dee2e6"}}>
                    {dynamicColumns}
                    <columns
                    body={botonEditar} 
                    style={{textAlign:'center', width: '8em'}}
                    >
                    </columns>
                    <columns
                    body={botonBorrar} 
                    style={{textAlign:'center', width: '8em'}}
                    >
                    </columns>
                </DataTable>
            </Card>
        </div>

    );
}


export default Tabla;