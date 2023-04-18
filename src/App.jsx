import React, {useState, Fragment, useRef, useEffect} from "react";
import { TodoList } from "./components/ToDoList";
import {v4 as uuidv4} from 'uuid';

//Esta app permite una gestion de tareas, pudiendo crearlas, establecerlas como completadas
//o eliminarlas en caso de ser necesario
export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: "Tarea 1", completed: false},
    ]);

    const todoTaskRef = useRef();

    //Este metodo es llamado al iniciar la app para cargar las tareas del localStorage
    useEffect(() => {
       const storedTodos = JSON.parse(localStorage.getItem('todoApp.todos'));
       if(storedTodos) {
        setTodos(storedTodos);
       }
    }, []);

    //Este metodo es llamado al agregar una nueva tarea al array todos para guardar el estado en localStorage
    useEffect(() => {
        localStorage.setItem('todoApp.todos', JSON.stringify(todos));
    }, [todos]);

    //funcion para actualizar los todos completados
    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos)
    };

    //Metodo para gestionar el agregar nuevas tareas
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), task, completed: false}];
        });

        todoTaskRef.current.value = null;
    };

    //Metodo para borrar todas las tareas completadas
    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    //El contenido que mostrara nuestra app
    return (
    <Fragment>
        <TodoList todos ={todos} toggleTodo={toggleTodo}/>
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
        <button onClick={handleTodoAdd}>➕ </button>
        <button onClick={handleClearAll}>💩</button>
        <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
    </Fragment>
    );
}