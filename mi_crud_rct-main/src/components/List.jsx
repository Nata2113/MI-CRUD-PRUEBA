import React from "react";
import Item from "./Item";

// Componente que muestra la lista de elementos
// Recorre el array de items y renderiza un Item por cada uno
function List({ items, deleteItem, editItem }) {
    return (
        <ul>
            {items.map((item) => (
                <Item
                    key={item.id}
                    item={item}
                    deleteItem={deleteItem}
                    editItem={editItem}
                />
            ))}
        </ul>
    );
}

export default List;