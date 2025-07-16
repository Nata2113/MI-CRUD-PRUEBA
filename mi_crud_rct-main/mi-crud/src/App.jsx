import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:5000/api';

function App() {
  const [vista, setVista] = useState('clientes');

  // Clientes
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({ nombre: '', apellidos: '', ciudad: '', fechaRegistro: '' });
  const [idCliente, setIdCliente] = useState(null);

  // Productos
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({ codigo: '', nombre: '', precio: '', stock: '', estado: '' });
  const [idProducto, setIdProducto] = useState(null);

  // Pedidos
  const [pedidos, setPedidos] = useState([]);
  const [pedido, setPedido] = useState({ clienteId: '', fecha: '', metodoPago: '', productos: [] });
  const [productoPedido, setProductoPedido] = useState({ codigoProducto: '', nombre: '', cantidad: '', precioUnitario: '' });

  // ========================== CLIENTES ==========================
  useEffect(() => {
    fetch(`${API}/clientes`).then(res => res.json()).then(setClientes);
    fetch(`${API}/productos`).then(res => res.json()).then(setProductos);
  }, []);

  const guardarCliente = async (e) => {
  e.preventDefault();
  const url = idCliente ? `${API}/clientes/${idCliente}` : `${API}/clientes`;
  const method = idCliente ? 'PUT' : 'POST';

  // ✅ Paso 2: estructura adaptada al modelo de Mongoose
  const clienteAEnviar = {
    nombre: cliente.nombre,
    apellidos: cliente.apellidos,
    direccion: {
      ciudad: cliente.ciudad
    },
    fechaRegistro: cliente.fechaRegistro
  };

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clienteAEnviar)
  });

  const data = await res.json();
  if (idCliente) {
    setClientes(clientes.map(c => c._id === idCliente ? data : c));
  } else {
    setClientes([...clientes, data]);
  }

  setCliente({ nombre: '', apellidos: '', ciudad: '', fechaRegistro: '' });
  setIdCliente(null);
};

  const editarCliente = (c) => {
    setCliente(c);
    setIdCliente(c._id);
  };

  const eliminarCliente = async (id) => {
    await fetch(`${API}/clientes/${id}`, { method: 'DELETE' });
    setClientes(clientes.filter(c => c._id !== id));
  };

  // ========================== PRODUCTOS ==========================
  const guardarProducto = async (e) => {
    e.preventDefault();
    const url = idProducto ? `${API}/productos/${idProducto}` : `${API}/productos`;
    const method = idProducto ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...producto, precio: parseFloat(producto.precio), stock: parseInt(producto.stock) })
    });
    const data = await res.json();
    if (idProducto) {
      setProductos(productos.map(p => p._id === idProducto ? data : p));
    } else {
      setProductos([...productos, data]);
    }
    setProducto({ codigo: '', nombre: '', precio: '', stock: '', estado: '' });
    setIdProducto(null);
  };

  const editarProducto = (p) => {
    setProducto(p);
    setIdProducto(p._id);
  };

  const eliminarProducto = async (id) => {
    await fetch(`${API}/productos/${id}`, { method: 'DELETE' });
    setProductos(productos.filter(p => p._id !== id));
  };

  // ========================== PEDIDOS ==========================
  const agregarProductoAlPedido = () => {
    const total = productoPedido.cantidad * productoPedido.precioUnitario;
    setPedido({
      ...pedido,
      productos: [...pedido.productos, { ...productoPedido, totalComprado: total }]
    });
    setProductoPedido({ codigoProducto: '', nombre: '', cantidad: '', precioUnitario: '' });
  };

  const guardarPedido = async (e) => {
    e.preventDefault();
    const total = pedido.productos.reduce((sum, p) => sum + p.totalComprado, 0);
    const nuevoPedido = { ...pedido, totalCompra: total };
    const res = await fetch(`${API}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPedido)
    });
    await res.json();
    alert('Pedido guardado');
    setPedido({ clienteId: '', fecha: '', metodoPago: '', productos: [] });
  };

  const cargarPedidosDeCliente = async (clienteId) => {
    const res = await fetch(`${API}/pedidos/cliente/${clienteId}`);
    const data = await res.json();
    setPedidos(data);
    setVista('verPedidos');
  };

  const eliminarPedido = async (id) => {
    await fetch(`${API}/pedidos/${id}`, { method: 'DELETE' });
    setPedidos(pedidos.filter(p => p._id !== id));
  };

  return (
    <div className="container">
      <div className="text-center">
        <button onClick={() => setVista('clientes')}>Clientes</button>
        <button onClick={() => setVista('productos')}>Productos</button>
        <button onClick={() => setVista('pedidos')}>Pedidos</button>
      </div>

      {/* CLIENTES */}
      {vista === 'clientes' && (
        <>
          <h3>Clientes</h3>
          <form onSubmit={guardarCliente}>
            <input placeholder="Nombre" value={cliente.nombre} onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} />
            <input placeholder="Apellidos" value={cliente.apellidos} onChange={(e) => setCliente({ ...cliente, apellidos: e.target.value })} />
            <input placeholder="Ciudad" value={cliente.ciudad} onChange={(e) => setCliente({ ...cliente, ciudad: e.target.value })} />
            <input type="date" value={cliente.fechaRegistro} onChange={(e) => setCliente({ ...cliente, fechaRegistro: e.target.value })} />
            <button type="submit">{idCliente ? 'Actualizar' : 'Guardar'}</button>
          </form>
          <ul className="list-group">
            {clientes.map(c => (
              <li key={c._id} className="list-group-item">
                {c.nombre} {c.apellidos} - {c.ciudad} - {c.fechaRegistro}
                <button onClick={() => editarCliente(c)}>Editar</button>
                <button onClick={() => eliminarCliente(c._id)}>Eliminar</button>
                <button onClick={() => cargarPedidosDeCliente(c._id)}>Ver pedidos</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* PRODUCTOS */}
      {vista === 'productos' && (
        <>
          <h3>Productos</h3>
          <form onSubmit={guardarProducto}>
            <input placeholder="Código" value={producto.codigo} onChange={(e) => setProducto({ ...producto, codigo: e.target.value })} />
            <input placeholder="Nombre" value={producto.nombre} onChange={(e) => setProducto({ ...producto, nombre: e.target.value })} />
            <input type="number" placeholder="Precio" value={producto.precio} onChange={(e) => setProducto({ ...producto, precio: e.target.value })} />
            <input type="number" placeholder="Stock" value={producto.stock} onChange={(e) => setProducto({ ...producto, stock: e.target.value })} />
            <input placeholder="Estado" value={producto.estado} onChange={(e) => setProducto({ ...producto, estado: e.target.value })} />
            <button type="submit">{idProducto ? 'Actualizar' : 'Guardar'}</button>
          </form>
          <ul className="list-group">
            {productos.map(p => (
              <li key={p._id} className="list-group-item">
                {p.nombre} - {p.codigo} - ${p.precio} - Stock: {p.stock}
                <button onClick={() => editarProducto(p)}>Editar</button>
                <button onClick={() => eliminarProducto(p._id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* PEDIDOS */}
      {vista === 'pedidos' && (
        <>
          <h3>Crear Pedido</h3>
          <form onSubmit={guardarPedido}>
            <select value={pedido.clienteId} onChange={(e) => setPedido({ ...pedido, clienteId: e.target.value })}>
              <option value="">Seleccione un cliente</option>
              {clientes.map(c => (
                <option key={c._id} value={c._id}>{c.nombre} {c.apellidos}</option>
              ))}
            </select>
            <input type="date" value={pedido.fecha} onChange={(e) => setPedido({ ...pedido, fecha: e.target.value })} />
            <input placeholder="Método de pago" value={pedido.metodoPago} onChange={(e) => setPedido({ ...pedido, metodoPago: e.target.value })} />

            <h4>Agregar producto al pedido</h4>
            <input placeholder="Código" value={productoPedido.codigoProducto} onChange={(e) => setProductoPedido({ ...productoPedido, codigoProducto: e.target.value })} />
            <input placeholder="Nombre" value={productoPedido.nombre} onChange={(e) => setProductoPedido({ ...productoPedido, nombre: e.target.value })} />
            <input placeholder="Cantidad" type="number" value={productoPedido.cantidad} onChange={(e) => setProductoPedido({ ...productoPedido, cantidad: parseInt(e.target.value) })} />
            <input placeholder="Precio unitario" type="number" value={productoPedido.precioUnitario} onChange={(e) => setProductoPedido({ ...productoPedido, precioUnitario: parseFloat(e.target.value) })} />
            <button type="button" onClick={agregarProductoAlPedido}>Agregar producto</button>

            <button type="submit">Guardar Pedido</button>
          </form>
        </>
      )}

      {/* VER PEDIDOS */}
      {vista === 'verPedidos' && (
        <>
          <h3>Pedidos del cliente</h3>
          <ul className="list-group">
            {pedidos.map(p => (
              <li key={p._id} className="list-group-item">
                Fecha: {p.fechaPedido} | Total: ${p.totalCompra} | Pago: {p.metodoPago}
                <button onClick={() => eliminarPedido(p._id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setVista('clientes')}>Volver</button>
        </>
      )}
    </div>
  );
}

export default App;