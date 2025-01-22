var addTodo = document.getElementById("add-todo");
var addBtn = document.getElementById("addBtn");
var myTodos = document.getElementById("my-todos");
var modal = document.getElementById("modal");
var modalContent = document.querySelector(".modal-content");
var editP = document.getElementById("edit-p");
var saveBtn = document.getElementById("save-btn");
var listItems = [];
var currentId = 1;
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
        var capitalizedWord = addTodo.value.charAt(0).toUpperCase() + addTodo.value.slice(1);
        addedTodo = {
            id: currentId,
            task: capitalizedWord,
            done: false,
        };
        listItems.push(addedTodo);
        currentId++;
    }
    var li = document.createElement("li");
    li.classList.add("li-item");
    li.id = "".concat(addedTodo.id);
    li.innerHTML = "\n            <input class=\"checkbox\" id=\"checkbox".concat(addedTodo.id, "\" type=\"checkbox\">\n            <label class=\"todo\">").concat(addedTodo.task, "</label>\n            <input type=\"image\" src=\"./assets/images/edit.svg\" class=\"btn edit-btn\">\n            <input type=\"image\" src=\"./assets/images/delete.svg\" class=\"btn delete-btn\">");
    myTodos.append(li);
    addTodo.value = "";
    console.log(listItems);
    console.log(addedTodo);
    saveTodo();
}
addBtn.addEventListener("click", function () { return addTask(null); });
addTodo.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask(null);
    }
});
var currentIdToEdit = null;
myTodos.addEventListener("click", function (event) {
    var target = event.target;
    var liItem = target.closest(".li-item");
    var id = parseInt(liItem.id);
    if (target.classList.contains("delete-btn")) {
        listItems = listItems.filter(function (todo) { return todo.id !== id; });
        liItem.remove();
        console.log("listItems2", listItems);
        saveTodo();
    }
    else if (target.classList.contains("edit-btn")) {
        currentIdToEdit = id;
        var filteredTodo = listItems.filter(function (todo) { return todo.id === id; });
        if (filteredTodo.length > 0) {
            var todo = filteredTodo[0];
            liItem.style.backgroundColor = "blue";
            modal.style.display = "block";
            editP.textContent = todo.task;
            editP.contentEditable = "true";
        }
    }
});
saveBtn.addEventListener("click", saveChanges);
modalContent.addEventListener("keydown", function (event) {
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
    var _a;
    if (currentIdToEdit === null)
        return;
    var filterTodo = listItems.filter(function (todo) { return todo.id === currentIdToEdit; });
    if (filterTodo.length > 0) {
        var todo = filterTodo[0];
        var liItem = document.getElementById("".concat(todo.id));
        var label = liItem.querySelector(".todo");
        todo.task = ((_a = editP.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || todo.task;
        label.textContent = todo.task;
    }
    editP.contentEditable = "false";
    modal.style.display = "none";
    currentIdToEdit = null;
    saveTodo();
    console.log(listItems);
}
//Checkbox, kontroller om done är true eller false
myTodos.addEventListener("change", function (event) {
    var target = event.target;
    var liItem = target.closest(".li-item");
    var id = parseInt(liItem.id);
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].id === id) {
            listItems[i].done = target.checked;
            if (listItems[i].done) {
                liItem.style.opacity = "0.5";
            }
            else {
                liItem.style.opacity = "1";
            }
        }
    }
    console.log(listItems);
    saveTodo();
});
function loadTodo() {
    var getStoredData = localStorage.getItem("user");
    if (getStoredData) {
        listItems = JSON.parse(getStoredData);
        listItems.forEach(function (todo) {
            addTask(todo);
            var liChecked = document.getElementById("".concat(todo.id));
            var checkbox = document.getElementById("checkbox".concat(todo.id));
            if (todo.done === true) {
                checkbox.checked = true;
                liChecked.style.opacity = "0.5";
            }
            currentId = Math.max(todo.id) + 1;
        });
        console.log(listItems);
    }
    else {
        console.log("no data");
    }
}
function saveTodo() {
    localStorage.setItem("user", JSON.stringify(listItems));
}
