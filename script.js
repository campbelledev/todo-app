// Sélection des éléments
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Charger les tâches depuis localStorage au démarrage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
});

// Ajouter une nouvelle tâche
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText !== "") {
        addTaskToDOM(taskText, false);
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        taskInput.value = "";
    }
});

// Fonction pour ajouter une tâche dans le DOM
function addTaskToDOM(text, completed) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    if(completed) {
        li.style.textDecoration = 'line-through';
        li.style.color = 'gray';
    }

    checkbox.addEventListener('change', () => {
        if(checkbox.checked) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'gray';
        } else {
            li.style.textDecoration = 'none';
            li.style.color = 'black';
        }
        updateTaskStatus(text, checkbox.checked);
    });

    li.addEventListener('click', (e) => {
        if(e.target !== checkbox) {
            li.remove();
            removeTask(text);
        }
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(" " + text));
    taskList.appendChild(li);
}

// Sauvegarder les tâches dans localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Mettre à jour le statut d'une tâche
function updateTaskStatus(text, completed) {
    tasks = tasks.map(task => task.text === text ? { ...task, completed } : task);
    saveTasks();
}

// Supprimer une tâche
function removeTask(text) {
    tasks = tasks.filter(task => task.text !== text);
    saveTasks();
}