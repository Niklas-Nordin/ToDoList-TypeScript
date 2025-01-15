var addTodo = document.getElementById("add-todo");
var addBtn = document.getElementById("addBtn");
var myTodos = document.getElementById("my-todos");
var listItems = [
    {
        id: 1,
        task: "hjälp grannen",
        done: false,
    },
];
var index = "";
function addTask() {
    if (addTodo.value === "") {
        alert("You must write something!");
    }
    else {
        var li = document.createElement("li");
        li.classList.add("li-item");
        li.id = "".concat(listItems.length + 1);
        li.innerHTML = "\n        <p class=\"todo\" id=\"".concat(listItems.length + 1, "\">").concat(addTodo.value, "</p>");
        myTodos.append(li);
        var addedTodo = {};
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
