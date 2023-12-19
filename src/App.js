import React, { useState } from "react";
// import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Card, Col, Button} from 'react-bootstrap';  

const initialTodos = [
  { id: 1, name: "Buy groceries", description: "Milk, bread, eggs", status: "notCompleted" },
  { id: 2, name: "Finish project report", description: "Data analysis and conclusion", status: "notCompleted" },
  { id: 3, name: "Call the dentist", description: "Schedule appointment", status: "completed" },
];

function TodoCard({ todo, onEdit, onDelete, onChangeStatus }) {
  return (
    <Card>
    <div className="todo-card">
    <div className="d-flex align-items-start bg-body-tertiary mb-3" style={{ height: "100px" }}>
      <h3>{todo.name}</h3>
      <p>{todo.description}</p>
      <span className={`status ${todo.status}`}>{todo.status}</span>
      <button onClick={() => onChangeStatus(todo)}>Change Status</button>
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo)}>Delete</button>
    </div>
    </div>
    </Card>
  );
}

function TodoForm({ onSubmit, isEditing, initialTodo }) {
  const [name, setName] = useState(isEditing ? initialTodo.name : "");
  const [description, setDescription] = useState(isEditing ? initialTodo.description : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: isEditing ? initialTodo.id : Date.now(),
      name,
      description,
      status: "notCompleted",
    };
    onSubmit(newTodo);
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">{isEditing ? "Save Changes" : "Add Todo"}</button>
    </form>
  );
}

function StatusFilter({ onFilterChange }) {
  return (
    <select onChange={(e) => onFilterChange(e.target.value)}>
      <option value="all">All Todos</option>
      <option value="completed">Completed Todos</option>
      <option value="notCompleted">Not Completed Todos</option>
    </select>
  );
}
function TodoList({ todos, onEdit, onDelete, onChangeStatus }) {
  return (
      <div className="e-card">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-card">
            {/* Render todo details */}
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <span className={`status ${todo.status}`}>{todo.status}</span>
            {/* Buttons for actions */}
            <button onClick={() => onChangeStatus(todo)}>Change Status</button>
            <button onClick={() => onEdit(todo)}>Edit</button>
            <button onClick={() => onDelete(todo)}>Delete</button>
          </div>
        ))}
      </div>
  );
}

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleDelete = (todo) => {
    const updatedTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(updatedTodos);
  };

  const handleChangeStatus = (todo) => {
    const updatedTodo = { ...todo, status: todo.status === "completed" ? "notCompleted" : "completed" };
    const updatedTodos = todos.map((item) => (item.id === todo.id ? updatedTodo : item));
    setTodos(updatedTodos);
  };

  const handleSaveEdit = (newTodo) => {
    const updatedTodos = todos.map((item) => (item.id === newTodo.id ? newTodo : item));
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const filteredTodos = todos.filter((todo) => {
    if (selectedFilter === "all") return true;
    return todo.status === selectedFilter;
  });

  return (
    
    <div className="App">
      <h1>Todo List</h1>
      <StatusFilter onFilterChange={handleFilterChange} />
      {/* Pass necessary props to components */}
      <TodoList
        todos={filteredTodos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeStatus={handleChangeStatus}
      />
      {/* Pass onSubmit prop for handling form submission */}
      <TodoForm onSubmit={handleSaveEdit} isEditing={!!editingTodo} initialTodo={editingTodo || {}} />
    </div>
    
  );
}

export default App;
