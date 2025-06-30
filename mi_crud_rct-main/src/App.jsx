import React, {useState, useEffect} from "react";
import Form from "./components/Form";
import List from "./components/List";
import "./App.css";

// Componente principal 
function App() {
  // Estado para la lista de elementos
  const [items, setItems] = useState([]);
  // Estado para el elemento que se va a editar
  const [itemToEdit, setItemToEdit] = useState(null);

  // Cargar los elementos almacenados en localStorage al iniciar
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  // Guardar los elementos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Agrega un nuevo elemento o actualiza uno existente
  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? {...item, value} : item));
      setItemToEdit(null);
    } else {
      setItems([...items, {id: Date.now(), value}]);
    }
  };

  // Elimina un elemento por su id
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Selecciona un elemento para editar
  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div className="App">
      {/* Título de la aplicación */}
      <h1>CRUD con LocalStorage</h1>
      {/* Formulario para agregar/editar elementos */}
      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      {/* Lista de elementos */}
      <List items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}

export default App;
