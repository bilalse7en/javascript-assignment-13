document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addTodoButton').addEventListener('click', addTodo);
    document.getElementById('newTodo').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') addTodo();
    });

    function addTodo() {
        const newTodoInput = document.getElementById('newTodo');
        const newTodoText = newTodoInput.value.trim();
        if (!newTodoText) return;

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center todo-item';

        li.innerHTML = `
            <div class="align-items-center d-flex form-check w-100">
                <input class="form-check-input p-2 mb-1 me-2" type="checkbox">
                <input type="text" class="border-0 p-2 form-control todo-input" value="${newTodoText}" readonly>
            </div>
            <div style="width: 60px;">
                <i class="fas fa-check save-btn mx-2 d-none" style="cursor: pointer;"></i>
                <i class="fas fa-pencil-alt edit-btn mx-2" style="cursor: pointer;"></i>
                <i class="fas fa-times delete-btn" style="cursor: pointer;"></i>
            </div>
        `;

        // Adding event listeners
        li.getElementsByClassName('delete-btn')[0].addEventListener('click', function() {
            li.remove();
        });
        li.getElementsByClassName('edit-btn')[0].addEventListener('click', function() {
            toggleEditMode(li);
        });
        li.getElementsByClassName('save-btn')[0].addEventListener('click', function() {
            saveEdit(li);
        });
        const checkbox = li.querySelector('.form-check-input');
        checkbox.addEventListener('change', function() {
            toggleComplete(li, checkbox);
        });

        document.getElementById('todoList').appendChild(li);
        newTodoInput.value = '';
    }

    function toggleEditMode(li) {
        const todoInput = li.querySelector('.todo-input');
        const editBtn = li.querySelector('.edit-btn');
        const saveBtn = li.querySelector('.save-btn');

        // Toggle the input field's readOnly property
        todoInput.readOnly = !todoInput.readOnly;

        // Toggle the visibility of edit and save buttons
        editBtn.classList.toggle('d-none');
        saveBtn.classList.toggle('d-none');

        // Focus on the input field if it's in edit mode
        if (!todoInput.readOnly) {
            todoInput.focus();
        }
    }

    function saveEdit(li) {
        const todoInput = li.querySelector('.todo-input');
        todoInput.value = todoInput.value.trim(); // Trim any whitespace from the value
        toggleEditMode(li);
    }

    function toggleComplete(li, checkbox) {
        const todoInput = li.querySelector('.todo-input');
        todoInput.classList.toggle('completed');

        // Toggle danger background color based on checkbox state
        li.classList.toggle('danger', checkbox.checked);
    }
});