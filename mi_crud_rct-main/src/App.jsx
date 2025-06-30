import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericGrade = parseFloat(grade);

    if (!name.trim() || !lastName.trim()) {
      alert("Nombre y apellido son obligatorios.");
      return;
    }

    if (isNaN(numericGrade) || numericGrade < 1 || numericGrade > 7) {
      alert("La nota debe ser un número entre 1 y 7.");
      return;
    }

    const newStudent = { name, lastName, grade: numericGrade };

    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = newStudent;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }

    setName("");
    setLastName("");
    setGrade("");
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Eliminar este estudiante?")) {
      const updated = students.filter((_, i) => i !== index);
      setStudents(updated);
    }
  };

  const handleEdit = (index) => {
    const student = students[index];
    setName(student.name);
    setLastName(student.lastName);
    setGrade(student.grade);
    setEditIndex(index);
  };

  const calcularPromedio = () => {
    if (students.length === 0) return "NO DISPONIBLE";
    const suma = students.reduce((acc, s) => acc + s.grade, 0);
    return (suma / students.length).toFixed(2);
  };

  const totalEstudiantes = students.length;
  const aprobados = students.filter((s) => s.grade >= 4.0).length;
  const reprobados = totalEstudiantes - aprobados;

  return (
    <div className="container">
      <h2>Registro de Notas</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Nota:</label>
          <input
            type="number"
            step="0.1"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <button type="submit">
          {editIndex !== null ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <div id="average">
        Promedio General del Curso: {calcularPromedio()}
      </div>

      <div id="resumen">
        <p>Total de estudiantes: <strong>{totalEstudiantes}</strong></p>
        <p style={{ color: "green" }}>Aprobados: <strong>{aprobados}</strong></p>
        <p style={{ color: "red" }}>Reprobados: <strong>{reprobados}</strong></p>
      </div>

      <table id="studentsTable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Nota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td data-label="Nombre">{student.name}</td>
              <td data-label="Apellido">{student.lastName}</td>
              <td data-label="Nota" style={{ color: student.grade >= 4 ? "green" : "red" }}>
                {student.grade}
              </td>
              <td data-label="Acciones">
                <button onClick={() => handleEdit(index)}>Editar</button>{" "}
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

