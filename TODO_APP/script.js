// Function to add a new task
function AddItem() {
  console.log("item added");
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if (taskValue === "") {
    alert("Please enter a task");
    return;
  }

  let todoList = document.getElementById('todoList');
  if (!todoList) {
    todoList = document.createElement('ul');
    todoList.id = 'todoList';
    todoList.className = 'showItem';
    document.getElementById('todoContainer').appendChild(todoList);
  }

  const li = document.createElement('li');
  li.className = "item";
  li.innerHTML = `
    <span>${taskValue}</span>
    <div class="clearButtons">
      <button onclick="markAsComplete(this)" class="completeButton">
        <i class="fas fa-check"></i>
      </button>
      <button onclick="removeItem(this)" class="removeButton">
        <i class="fas fa-times"></i>
      </button>
    </div>`;

  todoList.appendChild(li);
  taskInput.value = '';

  saveToLocalStorage();
}

// Function to save tasks to localStorage
function saveToLocalStorage() {
  const todoList = document.getElementById('todoList');
  const tasks = [];

  if (todoList) {
    todoList.querySelectorAll('li').forEach(li => {
      tasks.push({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('span').style.textDecoration === 'line-through',
      });
    });
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage on page load
function loadFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));

  if (savedTasks && savedTasks.length > 0) {
    let todoList = document.getElementById('todoList');

    if (!todoList) {
      todoList = document.createElement('ul');
      todoList.id = 'todoList';
      todoList.className = 'showItem';
      document.getElementById('todoContainer').appendChild(todoList);
    }

    savedTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "item";
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="clearButtons">
          <button onclick="markAsComplete(this)" class="completeButton">
            <i class="fas fa-check"></i>
          </button>
          <button onclick="removeItem(this)" class="removeButton">
            <i class="fas fa-times"></i>
          </button>
        </div>`;

      if (task.completed) {
        li.querySelector('span').style.textDecoration = "line-through";
      }

      todoList.appendChild(li);
    });
  }
}

// Function to mark a task as complete
function markAsComplete(button) {
  const li = button.closest('li');
  const span = li.querySelector('span');
  span.style.textDecoration = "line-through";

  saveToLocalStorage();
}

// Function to remove a task
function removeItem(button) {
  const li = button.closest('li');
  li.remove();

  const todoList = document.getElementById('todoList');
  if (todoList && todoList.querySelectorAll('li').length === 0) {
    todoList.remove();
  }

  saveToLocalStorage();
}

// Function to delete all tasks
function deleteAll() {
  const todoList = document.getElementById('todoList');
  if (todoList) {
    todoList.remove(); 
  }
  localStorage.removeItem('tasks'); 
}

// Load tasks from localStorage when the page loads
window.onload = function () {
  loadFromLocalStorage();
};
