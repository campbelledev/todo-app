// Sélection des éléments
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompleted = document.getElementById('clearCompleted');
const toggleThemeBtn = document.getElementById('toggleTheme');

// Charger les tâches depuis localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.completed));

// Charger le thème depuis localStorage
let theme = localStorage.getItem('theme') || 'light';
if(theme === 'dark') document.body.classList.add('dark');

// Bascule thème clair / sombre
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Ajouter une nouvelle tâche
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if(text !== "") {
        addTaskToDOM(text, false);
        tasks.push({ text, completed: false });
        saveTasks();
        taskInput.value = "";
        updateCount();
    }
});

// Fonction pour ajouter une tâche dans le DOM
function addTaskToDOM(text, completed) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    const span = document.createElement('span');
    span.textContent = text;

    if(completed) li.classList.add('completed');

    // Marquer comme terminée
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        updateTaskStatus(text, checkbox.checked);
        updateCount();
        renderTasks(); // tri après modification
    });

    // Supprimer une tâche en cliquant sur le texte
    span.addEventListener('click', () => {
        li.remove();
        removeTask(text);
        updateCount();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
    updateCount();
}

// Supprimer toutes les tâches terminées
clearCompleted.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateCount();
});

// Mettre à jour le DOM pour refléter les tâches triées
function renderTasks() {
    taskList.innerHTML = '';
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);
    sortedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
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

// Compter les tâches restantes
function updateCount() {
    const remaining = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remaining} tâche${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}`;
}