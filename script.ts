const addTodo = document.getElementById("add-todo") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const myTodos = document.getElementById("my-todos") as HTMLUListElement;

let listItems: TodoItem[] = [];
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

    addedTodo = {
      id: listItems.length + 1,
      task: addTodo.value,
      done: false,
    };

    listItems.push(addedTodo);
  }

  const li = document.createElement("li");
  li.classList.add("li-item");
  li.id = `${addedTodo.id}`;
  li.innerHTML = `
            <input class="checkbox" type="checkbox">
            <label class="todo">${addedTodo.task}</label>
            <input type="image" src="./assets/images/edit.svg" class="btn edit-btn">
            <input type="image" src="./assets/images/delete.svg" class="btn delete-btn">`;
  myTodos.append(li);
  saveTodo();
  addTodo.value = "";
  console.log(listItems);
  console.log(addedTodo);

  localStorage.setItem("user", JSON.stringify(listItems));
}

addBtn.addEventListener("click", () => addTask(null));

addTodo.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask(null);
  }
});

myTodos.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const liItem = target.closest(".li-item") as HTMLLIElement;
  const id = parseInt(liItem.id);
  const selected = listItems.filter((todo) => todo.id !== id);
  listItems = selected;

  if (target.classList.contains("delete-btn")) {
    liItem.remove();
    console.log("listItems2", listItems);
  } else if (target.classList.contains("edit-btn")) {
    liItem.style.backgroundColor = "blue";
  }
});

//Checkbox, kontroller om done är true eller false

myTodos.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;
  const liItem = target.closest(".li-item") as HTMLLIElement;
  let id = parseInt(liItem.id);
  const todo = listItems.filter((todo) => todo.id === id);

  if (!todo) {
    console.log("Couldn't find the id...");
    return;
  }

  const matchedTodo = todo[0];

  if (target.checked) {
    matchedTodo.done = true;
    liItem.style.opacity = "0.5";
  } else {
    liItem.style.opacity = "1";
    matchedTodo.done = false;
  }
});

function loadTodo() {
  let getStoredData: null | string = localStorage.getItem("user");

  if (getStoredData) {
    listItems = JSON.parse(getStoredData);
    listItems.forEach((todo) => {
      addTask(todo);
    });
    console.log(listItems);
  } else {
    console.log("no data");
  }
}
