import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [name, setName] = useState('');
  const [assignment, setAssignment] = useState('');
  const [average, setAverage] = useState('');
  const [nameError, setNameError] = useState('');
  const [assignmentError, setAssignmentError] = useState('');
  const [averageError, setAverageError] = useState('');

  // 🧠 Cargar datos desde MongoDB
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/estudiantes");
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("❌ Error al obtener estudiantes:", error.message);
      }
    };
    fetchStudents();
  }, []);

  const getAppreciationScale = (avg) => {
    const num = parseFloat(avg);
    if (num >= 1.0 && num <= 3.9) return 'Deficiente';
    if (num >= 4.0 && num <= 5.5) return 'Con mejora';
    if (num >= 5.6 && num <= 6.4) return 'Buen trabajo';
    if (num >= 6.5 && num <= 7.0) return 'Destacado';
    return 'N/A';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setAssignmentError('');
    setAverageError('');
    let isValid = true;

    const parsedAverage = parseFloat(average);
    if (!name.trim()) {
      setNameError('Por favor, complete el campo Nombre.');
      isValid = false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(name.trim())) {
      setNameError('El nombre solo puede contener letras y espacios.');
      isValid = false;
    }

    if (!assignment.trim()) {
      setAssignmentError('Por favor, complete el campo Asignatura.');
      isValid = false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(assignment.trim())) {
      setAssignmentError('La asignatura solo puede contener letras y espacios.');
      isValid = false;
    }

    if (isNaN(parsedAverage) || parsedAverage < 1 || parsedAverage > 7) {
      setAverageError('Por favor, ingrese un promedio entre 1.0 y 7.0.');
      isValid = false;
    }

    if (!isValid) return;

    const newStudent = {
      name: name.trim(),
      assignment: assignment.trim(),
      average: parsedAverage
    };

    try {
      const res = await fetch("http://localhost:5000/api/estudiantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent)
      });
      const data = await res.json();
      setStudents((prev) => [...prev, data]);
      setName('');
      setAssignment('');
      setAverage('');
      setEditingIndex(-1);
    } catch (error) {
      console.error("❌ Error al guardar estudiante:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="form-container p-4 border border-primary rounded bg-white w-100" style={{ maxWidth: '400px' }}>
          <h3 className="mb-4 text-center">
            {editingIndex !== -1 ? 'Editar Evaluación' : 'Evaluación de Alumnos'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre del Alumno:</label>
              <input
                type="text"
                className={`form-control ${nameError ? 'is-invalid' : ''}`}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {nameError && <div className="invalid-feedback d-block">{nameError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="assignment" className="form-label">Asignatura:</label>
              <input
                type="text"
                className={`form-control ${assignmentError ? 'is-invalid' : ''}`}
                id="assignment"
                value={assignment}
                onChange={(e) => setAssignment(e.target.value)}
                required
              />
              {assignmentError && <div className="invalid-feedback d-block">{assignmentError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="average" className="form-label">Promedio (1.0 - 7.0):</label>
              <input
                type="number"
                className={`form-control ${averageError ? 'is-invalid' : ''}`}
                id="average"
                step="0.1"
                min="1.0"
                max="7.0"
                value={average}
                onChange={(e) => setAverage(e.target.value)}
                required
              />
              {averageError && <div className="invalid-feedback d-block">{averageError}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {editingIndex !== -1 ? 'Actualizar Evaluación' : 'Agregar Evaluación'}
            </button>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <div className="card shadow-sm w-100" style={{ maxWidth: '1000px', minWidth: '350px' }}>
          <div className="card-header bg-white text-center">
            <h5 className="mb-0">Evaluaciones Guardadas</h5>
          </div>
          <ul className="list-group list-group-flush">
            {students.length === 0 ? (
              <li className="list-group-item text-center"><em>No hay evaluaciones guardadas aún, ¡Agrega una!</em></li>
            ) : (
              students.map((student, index) => (
                <li key={index} className="list-group-item d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                  <div>
                    <strong>Alumno:</strong> {student.name}<br />
                    <strong>Asignatura:</strong> {student.assignment}<br />
                    <strong>Promedio:</strong> {student.average}
                    <div>
                      <span className={`badge mt-2 ${getAppreciationScale(student.average) === 'Destacado' ? 'bg-primary' : getAppreciationScale(student.average) === 'Buen trabajo' ? 'bg-success' : getAppreciationScale(student.average) === 'Con mejora' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                        {getAppreciationScale(student.average)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 mt-md-0">
                    <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingIndex(index)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => alert('🛑 Eliminar conectado al backend aún no está implementado.')}>Eliminar</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;