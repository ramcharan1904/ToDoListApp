import React, { useState } from "react";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleEditTask = (index) => {
        setEditingTaskIndex(index);
        setEditingTaskText(tasks[index].text);
    };

    const handleEditInputChange = (e) => {
        setEditingTaskText(e.target.value);
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        if (editingTaskText.trim() !== '') {
            const updatedTasks = tasks.map((task, i) =>
                i === editingTaskIndex ? { ...task, text: editingTaskText } : task
            );
            setTasks(updatedTasks);
            setEditingTaskIndex(null);
            setEditingTaskText('');
        }
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Enter a new task"
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {editingTaskIndex === index ? (
                            <form onSubmit={handleEditFormSubmit}>
                                <input
                                    type="text"
                                    value={editingTaskText}
                                    onChange={handleEditInputChange}
                                />
                                <button type="submit">Save</button>
                            </form>
                        ) : (
                            <>
                                <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
                                <button onClick={() => handleEditTask(index)}>Edit</button>
                                <button onClick={() => handleDeleteTask(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
