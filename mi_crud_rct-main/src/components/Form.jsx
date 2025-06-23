import React, { useState, useEffect } from "react";

// Componente del formulario para agregar o editar elementos
// Recibe la función para agregar/actualizar y el elemento a editar (si existe)
function Form({ addOrUpdateItem, itemToEdit }) {
    const [inputValue, setInputValue] = useState("");

    // Si hay un elemento para editar, actualiza el valor del input
    useEffect(() => {
        if (itemToEdit) {
            setInputValue(itemToEdit.value);
        } else {
            setInputValue("");
        }
    }, [itemToEdit]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addOrUpdateItem(inputValue);
            setInputValue("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Campo de texto para ingresar el nombre del elemento */}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter item name"
            />
            {/* Botón que cambia según si se edita o agrega */}
            <button type="submit">{itemToEdit ? "Actualizar" : "Agregar"}</button>
        </form>
    );
}

export default Form;