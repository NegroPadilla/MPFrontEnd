import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Messages } from 'primereact/messages';

const Editar = () => {
    const {id} = useParams();
    const Nav = useNavigate();
    const [calle, setCalle] = useState('');
    const [region, setRegion] = useState('');
    const [regiones, setRegiones] = useState([]);
    const [provincia, setProvincia] = useState('');
    const [provincias, setProvincias] = useState([]);
    const [ciudad, setCiudad] = useState('');
    const [ciudades, setCiudades] = useState([]);

    const CallexId = async (id) => {
        try{
            const response = await fetch(`http://laravel-api.test/api/calles/id`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const r = await response.json();
            console.log(r);
            setCalle(r.Nombre_Calle);
            setRegion(r.idRegion);
            setProvincia(r.idProvincia);
            setCiudad(r.idCiudad);
            obtenerProvincias(r.idRegion);
            obtenerCiudades(r.idProvincia);
        }catch(error){
            console.log(error);
        }
    };

    const añadirCalle = () => {
        try{
            fetch('http://laravel-api.test/api/calles',{
                method: 'POST',
                body: JSON.stringify({
                    Nombre_Calle: calle,
                    idCiudad: ciudad
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => {
                if(r.status === 200){
                    Messages.fire({
                        icon: 'success',
                        title: 'Agregado',
                        showConfirmButton: false,
                        sticky: "true",
                        onClose: Navigate('/')
                    });
                }
            });
        }catch(error){
            console.log(error);
        }
    };

    const updateCalle = () => {
        console.log(calle);
        console.log(ciudad);
        console.log(id);
        try{
            fetch(`http://laravel-api.test/api/calles/get/id`, {
                method: 'PUT',
                body: JSON.stringify({
                    Nombre_Calle: calle,
                    idCiudad: ciudad
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status===200){
                    Messages.fire({
                    icon: 'success',
                    title: 'Calle editada',
                    showConfirmButton: false,
                    sticky: "true",
                    onClose: Navigate('/')
                    });
            }
            }); 
     } catch(error) {
            console.log(error);
        }
    };

    const obtenerRegiones = async () => {
        try{
            const response = await fetch('http://laravel-api.test/api/regiones',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const r = await response.json();
            Object.entries(r).forEach(([key, value]) => {
                setRegiones(regiones => [...regiones, {label: value.Nombre_Region, value: value.id}]);
            });

        } catch(error) {
            console.log(error);
        }
    };

    const obtenerProvincias = async (id) => {
        try{
            const response = await fetch(`http://laravel-api.test/api/provincias/region/id`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const r = await response.json();
            Object.entries(r).forEach(([key, value]) => {
                setProvincias(provincias => [...provincias, {label: value.Nombre_Provincia, value: value.id}]);
            });
        } catch(error) {
            console.log(error);
        }
    };

    const obtenerCiudades = async (id) => {
        try{
            const response = await fetch(`http://laravel-api.test/api/ciudades/provincia/id`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const r = await response.json();
            Object.entries(r).forEach(([key, value]) => {
                setCiudades(ciudades => [...ciudades, {label: value.Nombre_Ciudad, value: value.id}]);
            });
        } catch(error) {
            console.log(error);
        }
    };

    const handleRegion = (e) => {
        setProvincias([]);
        setCiudades([]);
        setRegion(e.target.value);
        getProvincias(e.target.value);
    };

    const handleProvincia= (e) => {
        setCiudades([]);
        setProvincia(e.target.value);
        getCiudades(e.target.value);
    };

    const handleEdit = () => {
        id === undefined ? añadirCalle() : updateCalle();
    };


    useEffect(() => {
        CallexId(id);
        obtenerRegiones();
        }, []);

    return(
        <div>
            <Card>
                <h5>Nombre de la calle</h5>
                <InputText id="nombreCalle" value={calle} onChange={(e)=>setCalle(e.target.value)} />
                <h5 style={{ textAlign: "left" }}>Región</h5>
                <Dropdown
                    value={region}
                    options={regiones}
                    onChange={handleRegion}
                    placeholder="Elige una región"
                    style={{ width: "80%", margin: "0 10%", textAlign: "left" }}
                />
                <h5 style={{ textAlign: "left" }}>Provincia</h5>
                <Dropdown
                    value={provincia}
                    options={provincias}
                    onChange={handleProvincia}
                    placeholder="Elige una provincia"
                    style={{ width: "80%", margin: "0 10%", textAlign: "left" }}
                />
                <h5 style={{ textAlign: "left" }}>Ciudad</h5>
                <Dropdown
                    value={ciudad}
                    options={ciudades}
                    onChange={(e) => setCiudad(e.value)}
                    placeholder="Elige una ciudad"
                />
                <Button label={id === undefined ? "Agregar": "Editar"} 
                         onClick={handleEdit} 
                         className="p-button-raised" />

                <Button label="Cancelar" 
                        style={{width: '40%', marginLeft:'5%'}} 
                        className="p-button-raised p-button-danger"
                        onClick={()=>Navigate('/')}/>
            </Card>
        </div>
    )

}

export default Editar;