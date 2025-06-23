import React from "react";

// Componente que representa un solo elemento de la lista
// Recibe el objeto item y las funciones para eliminar y editar
function Item({ item, deleteItem, editItem }) {
    return (
        <li>
            {/* Muestra el nombre del elemento */}
            {item.value}
            {/* Botón para editar el elemento */}
            <button onClick={() => editItem(item)}>Editar</button>
            {/* Botón para eliminar el elemento */}
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
        </li>
    );
}

export default Item;