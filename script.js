const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText !== "") {
        // Création de l'élément li
        const li = document.createElement('li');

        // Créer la case à cocher
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Quand la case est cochée, barrer la tâche
        checkbox.addEventListener('change', () => {
            if(checkbox.checked) {
                li.style.textDecoration = 'line-through';
                li.style.color = 'gray';
            } else {
                li.style.textDecoration = 'none';
                li.style.color = 'black';
            }
        });

        // Ajouter la fonctionnalité pour supprimer au clic sur le texte
        li.addEventListener('click', (e) => {
            // éviter de supprimer si on clique sur la checkbox
            if(e.target !== checkbox) {
                li.remove();
            }
        });

        // Ajouter la checkbox et le texte à li
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(" " + taskText));

        // Ajouter li à la liste
        taskList.appendChild(li);

        // Vider le champ input
        taskInput.value = "";
    }
});