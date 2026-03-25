// accenture-todo-app JavaScript

const todoInput = document.getElementById('new-todo');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = [];

// Load todos from localStorage
function loadTodos() {
    const stored = localStorage.getItem('accenture-todos');
    todos = stored ? JSON.parse(stored) : [];
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('accenture-todos', JSON.stringify(todos));
}

// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement('span');
        span.className = 'todo-text' + (todo.completed ? ' completed' : '');
        span.textContent = todo.text;
        span.onclick = () => toggleComplete(idx);

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteTodo(idx);

        li.appendChild(span);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });
}

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
}

// Toggle complete
function toggleComplete(idx) {
    todos[idx].completed = !todos[idx].completed;
    saveTodos();
    renderTodos();
}

// Delete todo
function deleteTodo(idx) {
    todos.splice(idx, 1);
    saveTodos();
    renderTodos();
}

// Event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTodo();
});

document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    renderTodos();
});
