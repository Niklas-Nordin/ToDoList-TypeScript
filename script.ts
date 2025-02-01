const addTodo = document.getElementById("add-todo") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const myTodos = document.getElementById("my-todos") as HTMLUListElement;
const modal = document.getElementById("modal") as HTMLDivElement;
const modalContent = document.querySelector(".modal-content") as HTMLDivElement;
const editP = document.getElementById("edit-p") as HTMLParagraphElement;
const saveBtn = document.getElementById("save-btn") as HTMLButtonElement;
const clearAll = document.getElementById("clear-all") as HTMLButtonElement;

let listItems: TodoItem[] = [];
let currentId = 1;
loadTodo();

interface TodoItem {
  id: number;
  task: string;
  done: boolean;
}

function addTask(todoItem: TodoItem | null) {
  let addedTodo: TodoItem;

  if (todoItem) {
    addedTodo = todoItem;
  } else {
    if (addTodo.value === "") {
      alert("You must write something!");
      return;
    }

    const capitalizedWord =
      addTodo.value.charAt(0).toUpperCase() + addTodo.value.slice(1);

    addedTodo = {
      id: currentId,
      task: capitalizedWord,
      done: false,
    };

    listItems.push(addedTodo);
    currentId++;
  }

  const li = document.createElement("li") as HTMLLIElement;
  li.classList.add("li-item", "fade-in");
  li.id = `${addedTodo.id}`;
  li.innerHTML = `
            <input class="checkbox" id="checkbox${addedTodo.id}" type="checkbox">
            <label class="todo">${addedTodo.task}</label>
            <div class="edit-delete">
              <input type="image" src="./assets/images/edit.svg" class="edit-btn">
              <input type="image" src="./assets/images/delete.svg" class="delete-btn">
            </div>`;

  myTodos.append(li);

  addTodo.value = "";
  clearAll.style.display = "block";
  console.log(listItems);
  console.log(addedTodo);

  saveTodo();
}

addBtn.addEventListener("click", () => {
  addTask(null);
});

addTodo.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask(null);
  }
});

let currentIdToEdit: number | null = null;

myTodos.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const liItem = target.closest(".li-item") as HTMLLIElement;
  const id = parseInt(liItem.id);

  if (target.classList.contains("delete-btn")) {
    listItems = listItems.filter((todo) => todo.id !== id);
    liItem.remove();
    if (listItems.length === 0) {
      clearAll.style.display = "none";
    }
    console.log(listItems);
    saveTodo();
  } else if (target.classList.contains("edit-btn")) {
    currentIdToEdit = id;
    const filteredTodo = listItems.filter((todo) => todo.id === id);
    if (filteredTodo.length > 0) {
      const todo = filteredTodo[0];
      modal.style.display = "block";
      editP.textContent = todo.task;
      editP.contentEditable = "true";
    }
  }
});
saveBtn.addEventListener("click", saveChanges);
clearAll.addEventListener("click", clearAllTodos);

modalContent.addEventListener("keydown", function (event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault();
    saveChanges();
  }
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    saveChanges();
  }
});

function saveChanges() {
  if (currentIdToEdit === null) return;

  const filterTodo = listItems.filter((todo) => todo.id === currentIdToEdit);

  if (filterTodo.length > 0) {
    const todo = filterTodo[0];
    const liItem = document.getElementById(`${todo.id}`) as HTMLLIElement;
    const label = liItem.querySelector(".todo") as HTMLLabelElement;

    todo.task = editP.textContent?.trim() || todo.task;
    label.textContent = todo.task;
  }

  editP.contentEditable = "false";
  modal.style.display = "none";
  currentIdToEdit = null;
  saveTodo();
  console.log(listItems);
}

//Checkbox, kontroller om done är true eller false

myTodos.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;
  const liItem = target.closest(".li-item") as HTMLLIElement;
  const id = parseInt(liItem.id);

  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].id === id) {
      listItems[i].done = target.checked;
      if (listItems[i].done) {
        liItem.style.opacity = "0.3";
      } else {
        liItem.style.opacity = "1";
      }
    }
  }
  console.log(listItems);
  saveTodo();
});

function loadTodo() {
  const getStoredData: null | string = localStorage.getItem("user");

  if (getStoredData) {
    listItems = JSON.parse(getStoredData);
    listItems.forEach((todo) => {
      addTask(todo);

      const liChecked = document.getElementById(`${todo.id}`) as HTMLLIElement;
      const checkbox = document.getElementById(
        `checkbox${todo.id}`
      ) as HTMLInputElement;

      if (todo.done === true) {
        checkbox.checked = true;
        liChecked.style.opacity = "0.3";
      }

      const li = document.getElementById(`${todo.id}`);
      li?.classList.remove("fade-in");

      currentId = Math.max(todo.id) + 1;
    });
    console.log(listItems);
  } else {
    console.log("no data");
  }
}

function saveTodo() {
  localStorage.setItem("user", JSON.stringify(listItems));
}

function clearAllTodos() {
  localStorage.removeItem("user");
  const liItem = document.querySelectorAll(".li-item");
  liItem.forEach((element) => {
    element.remove();
  });
  clearAll.style.display = "none";
  listItems = [];
  currentId = 1;
}
