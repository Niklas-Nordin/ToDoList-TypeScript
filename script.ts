const addTodo = document.getElementById("add-todo") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const myTodos = document.getElementById("my-todos") as HTMLUListElement;

interface TodoItem {
  id: number;
  task: string;
  done: boolean;
}

let listItems: TodoItem[] = [
  {
    id: 1,
    task: "hjälp grannen",
    done: false,
  },
];

let index = "";

function addTask() {
  if (addTodo.value === "") {
    alert("You must write something!");
  } else {
    const li = document.createElement("li");
    li.classList.add("li-item");
    li.id = `${listItems.length + 1}`;
    li.innerHTML = `
        <p class="todo" id="${listItems.length + 1}">${addTodo.value}</p>`;
    myTodos.append(li);

    let addedTodo = {} as TodoItem;
    addedTodo.id = listItems.length + 1;
    addedTodo.task = addTodo.value;
    addedTodo.done = false;
    listItems.push(addedTodo);
    console.log(listItems);

    addTodo.value = "";
  }
}

addBtn.addEventListener("click", addTask);

// addBtn.addEventListener("keypress", function (event) {
//     if(event.key)
// });

addTodo.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// function addTask() {
//   if (todo.value === "") {
//   }
// }
