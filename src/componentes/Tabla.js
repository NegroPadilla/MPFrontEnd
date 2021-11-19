import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import { Card } from "primereact/card";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import { Messages } from 'primereact/messages';
import { confirmDialog } from 'primereact/confirmdialog'

const Tabla = () =>{
    const {tabla, setTabla} = useState([]);
    const Nav = useNavigate();

    const columns =[
        {field: "id", header: "id calle"},
        {field: "Nombre_Calle", header: "Nombre calle"},
        {field: "Nombre_Ciudad", header: "Nombre Ciudad"},
        {field: "Nombre_Provincia", header: "Nombre Provincia"},
        {field: "Nombre_Region", header: "Nombre Region"},
    ];

    const obtenerTabla = async() =>{
        try{
            const response = await fetch('http://laravel-api.test/api/calles/get/all'); 
            if(response.status===200){
                const datos = await response.json();
                setTabla([]);
                setTabla(datos);
            }
        }catch(error){
            console.log(error);
        }
    };

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={i} field={col.field} header={col.header} />;
    });

    useEffect(() => {
        obtenerTabla();
    }, []);

    const borrarTabla = async(id) =>{
        try{
            const response = await fetch('http://laravel-api.test/api/calles/get/${id}',
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
            onClick={() => Nav('/editar/${id}')}
            />
        )
    };

    return(
        <div style={{margin: "3% 20% 0 24%"}}>
            <div style={{margin:"0 0 5% 0"}}>
                <h2 style={{margin:"0 0 0 20%"}}>Listado de Calles</h2>
                <Button
                    label= "Agregar Calles"
                    onClick={() =>Nav("/agregar")}
                    className= "p-button-rounded p-button-success"
                    style={{
                        width: "20%",
                        margin: "0 0 0 60%",
                    }}
                >
                </Button>
            </div>
            <Card
                style={{
                width: "100%",
                margin: "1rem",
                color: "#212529",
                border: "1px solid #dee2e6"}}
            >
                <DataTable value={tabla} responsiveLayout="scroll">

                    {dynamicColumns}

                    <Column
                    body={botonEditar} 
                    style={{textAlign:'center'}}
                    ></Column>
                    <Column
                    body={botonBorrar} 
                    style={{textAlign:'center'}}
                    ></Column>

                </DataTable>
            </Card>
        </div>

    );
}


export default Tabla;