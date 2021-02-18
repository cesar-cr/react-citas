import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

    // crear el state de citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas:''
    }); 

    const [error, setError] = useState(false);

    // funcion que se ejecuta cada que el usuario escriba en el input
    const actualizarState = e => {
        // console.log(e.target.name); -> para obtener en que campo esta escribiendo
        // console.log(e.target.value); -> para saber que es lo que se esta escribiendo
        setCita({
            ...cita, [e.target.name] : e.target.value
        });
    }

    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // cuando el usuario envia el form
    const submitCita = (e) => {
        e.preventDefault();
        // validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
                || hora.trim() === '' || sintomas.trim() === '') {
            setError(true);
            return;
        }
        // quitar la alerta de campos requeridos
        setError(false);
        // asignar un ID
        cita.id = uuidv4();
        // crear la cita
        crearCita(cita);
        // reiniciar el form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas:''
        });
    }
     

    return (
        <>
            <h2>Crear cita</h2>

            {
                error && <p className="alerta-error">Todos los campos son obligatorios</p>
            }

            <form
                onSubmit={ submitCita }
            >
                <label>Nombre mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={ mascota }
                />
                
                <label>Nombre dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de mascota"
                    onChange={actualizarState}
                    value={ propietario }
                />
                
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={ fecha }
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={ hora }
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={ sintomas }
                ></textarea>
                
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >
                    Agregar cita
                </button>
                
                
            </form>
        </>
    )
}

Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired
}


export default Formulario;