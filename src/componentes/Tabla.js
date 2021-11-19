import React, {useEffect, useState, useRef} from "react";
import {DataTable} from "primereact/datatable";
import { Card } from "primereact/card";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import { confirmDialog } from 'primereact/confirmdialog'
import Swal from 'sweetalert2';
import "primereact/resources/themes/nova-accent/theme.css";

const Tabla = () =>{
    const [tabla, setTabla] = useState([]);
    const Nav = useNavigate();
    const toast = useRef(null);

    const columns =[
        {field: "idCalles", header: "id"},
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
                console.log("aaa");
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

    const borrarTabla = (id) =>{
            fetch(`http://laravel-api.test/api/calles/${id}`,
            {method: "DELETE",
             headers:{
                "Content-Type": "application/json",
                Accept : "application/json",
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true 
             },
            }).then((response)=>{
                if(response.status===204){
                    setTabla([]);
                    obtenerTabla();
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        showConfirmButton: false,
                        sticky: "true",
                        onClose: Nav('/')});
        
                }
            setTabla([]);
            obtenerTabla();
        
            });
        };

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
            onClick={() => confirmar(rowData.idCalles)}
            />
        )
    };

    const botonEditar = (rowData) =>{
        return(
            <Button
            label="Editar Calle"
            className="p-button-rounded p-button-help"
            onClick={() => Nav(`/editar/${rowData.idCalles}`)}
            />
        )
    };

    const titulo = () => {
      return(  <div style={{marginLeft: "20%"}}>Listado de Calles
                <Button
                    label= "Agregar Calles"
                    onClick={() =>Nav("/agregar")}
                    className= "p-button-rounded p-button-success"
                    style={{
                        width: "20%",
                        marginLeft: "62%",
                    }}
                >
                </Button>
            </div>
      )
    }

    return(
        <div>
            
            <Card
                title= {titulo}
                style={{
                width: "100%",
            }}
            >
                <DataTable className="table table-striped" value={tabla} responsiveLayout="scroll" style={{color: "#212529"}}>
                    
                    {dynamicColumns}

                    <Column
                    body={botonEditar} 
                    style={{textAlign:'center',
                    color: "#212529"}}
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