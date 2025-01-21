var addTodo = document.getElementById("add-todo");
var addBtn = document.getElementById("addBtn");
var myTodos = document.getElementById("my-todos");
var listItems = [];
loadTodo();
function addTask(todoItem) {
    var addedTodo;
    if (todoItem) {
        addedTodo = todoItem;
    }
    else {
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
    var li = document.createElement("li");
    li.classList.add("li-item");
    li.id = "".concat(addedTodo.id);
    li.innerHTML = "\n            <input class=\"checkbox\" type=\"checkbox\">\n            <label class=\"todo\">".concat(addedTodo.task, "</label>\n            <input type=\"image\" src=\"./assets/images/edit.svg\" class=\"btn edit-btn\">\n            <input type=\"image\" src=\"./assets/images/delete.svg\" class=\"btn delete-btn\">");
    myTodos.append(li);
    saveTodo();
    addTodo.value = "";
    console.log(listItems);
    console.log(addedTodo);
    localStorage.setItem("user", JSON.stringify(listItems));
    console.log("hej", localStorage.setItem("user", JSON.stringify(listItems)));
}
addBtn.addEventListener("click", function () { return addTask(null); });
addTodo.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask(null);
    }
});
myTodos.addEventListener("click", function (event) {
    var target = event.target;
    var liItem = target.closest(".li-item");
    var id = parseInt(liItem.id);
    var selected = listItems.filter(function (todo) { return todo.id !== id; });
    listItems = selected;
    if (target.classList.contains("delete-btn")) {
        liItem.remove();
        // selected;
        // listItems = selected;
        console.log("listItems2", listItems);
    }
    else if (target.classList.contains("edit-btn")) {
        liItem.style.backgroundColor = "blue";
    }
});
//Checkbox, kontroller om done är true eller false
myTodos.addEventListener("change", function (event) {
    var target = event.target;
    var liItem = target.closest(".li-item");
    var id = parseInt(liItem.id);
    var todo = listItems.filter(function (todo) { return todo.id === id; });
    if (!todo) {
        console.log("Couldn't find the id...");
        return;
    }
    var matchedTodo = todo[0];
    if (target.checked) {
        matchedTodo.done = true;
        liItem.style.opacity = "0.5";
    }
    else {
        liItem.style.opacity = "1";
        matchedTodo.done = false;
    }
});
function loadTodo() {
    var getStoredData = localStorage.getItem("user");
    if (getStoredData) {
        listItems = JSON.parse(getStoredData);
        listItems.forEach(function (todo) {
            addTask(todo);
        });
        console.log(listItems);
    }
    else {
        console.log("no data");
    }
}
function saveTodo() { }
