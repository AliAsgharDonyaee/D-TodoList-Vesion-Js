const addTodo = document.querySelector("#addTodo");
const addText = document.querySelector("#addText");

const todoList = document.querySelector("#todoLists");
const checkBtn = document.getElementById("checkBtn");

const randomColor = () => {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

addTodo.addEventListener("click", fAddTodo);
todoList.addEventListener("click", fBtns);
document.addEventListener("DOMContentLoaded", getTodos);

function fAddTodo(e) {
	e.preventDefault();
	if (addText.value === "") {
		alert("please add todo");
	} else {
		const parent = document.querySelector("#todoLists");
		const craeteTag = document.createElement("div");
		craeteTag.setAttribute("id", `todo`);
		const color = randomColor();
		craeteTag.className = `rounded-xl border bg-[${color}] p-2 w-auto h-96`;
		const todo = ` 
                <div id="checkedBox" class="relative right-5 bg-gray-300 rounded-full -mt-6 w-10 h-10 flex justify-center items-center">
                    <i id="fa-check" class="fa-solid fa-check text-white"></i>
                </div>
                <div id="textTodo" class="w-full h-[90%]">
                   <textarea id="textTodoArea" class="bg-inherit w-full h-full" cols="100%" row="100%" disabled> ${addText.value}</textarea>
                </div>
                <div id="box" class="shadow-lg rounded-lg bg-white p-2 mt-2  mx-auto w-[80%] h-16 grid grid-cols-3 gap-2 justify-items-center items-center text-2xl text-gray-400">
                    <div id="checkBox" class="group">
                        <button id="checkBtn btn" class="transition-all group-hover:text-indigo-500">
                            <i id="fa-check" class="fa-solid fa-check"></i>
                        </button>
                    </div>
                    <div id="editBox" class="group">
                        <button id="editBtn btn" class="transition-all group-hover:text-indigo-500">
                            <i id="fa-edit" class="fa-solid fa-edit"></i>
                        </button>
                    </div>
                    <div id="deleteBoxn" class="group">
                        <button id="trashBtn btn" class="transition-al group-hover:text-red-500">
                            <i id="fa-trash" class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>`;
		parent.appendChild(craeteTag);
		craeteTag.innerHTML = todo;

		saveTodos(addText.value);
		addText.value = "";
	}
}

function fBtns(e) {
	const id = e.target;
	const findParent = id.parentNode.parentNode.parentNode.parentNode;
	const findIcon = findParent.childNodes[0].parentNode.children[2].children[1].children[0].children[0];
	const editTexts = findParent.childNodes[0].parentNode.children[1].children[0].value;

	switch (id.id) {
		case "fa-trash":
			findParent.remove();
			removeLocalTodo(findParent);
			break;
		case "fa-edit":
			//todo: enable textarea
			const todoArea = findParent.childNodes[0].parentNode.children[1].children[0];
			todoArea.disabled = false;
			todoArea.style.backgroundColor = "#FFF";
			todoArea.focus();

			//todo:  change icon edit when onClick editIcon
			const findIcons = findParent.childNodes[0].parentNode.children[2].children[1].children[0].children[0];
			fChangeIcon(findIcon, "id", "fa-circle-check", `fa-sharp fa-solid fa-circle-check text-lime-500`);

			//todo: change value textarea when onClick icon checked
			const i = document.getElementById("fa-circle-check");
			i.addEventListener("click", editText);
			function editText() {
				const textTodoArea = document.getElementById("textTodoArea");
				textTodoArea.disabled = true;
				todoArea.style.backgroundColor = "inherit";
				textTodoArea.innerHTML = editTexts;
			}
			break;
		case "fa-check":
			const checkedBox = findParent.childNodes[0].nextSibling;
			checkedBox.style.backgroundColor = "#84cc16";
			break;
		case "fa-circle-check":
			fChangeIcon(findIcon, "id", "fa-edit", `fa-solid fa-edit`);
			break;
	}
	function fChangeIcon(findIcon, id, setAT, className) {
		const findParentBtn = findParent.childNodes[0].parentNode.children[2].children[1].children[0];
		findIcon.remove();
		const createIcon = document.createElement("i");
		createIcon.setAttribute(id, setAT);
		createIcon.className = className;
		findParentBtn.appendChild(createIcon);
	}
}

addEventListener("DOMContentLoaded", (e) => {
	localStorage.getItem("todos");
});

function saveTodos(todo) {
	let savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
	savedTodos.push(todo);
	localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getTodos() {
	let savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
	savedTodos.forEach((to) => {
		const parent = document.querySelector("#todoLists");
		const craeteTag = document.createElement("div");
		craeteTag.setAttribute("id", `todo`);
		craeteTag.className = `rounded-xl border bg-[${randomColor()}] p-2 w-auto h-96`;
		const todo = ` 
                <div id="checkedBox" class="relative right-5 bg-gray-300 rounded-full -mt-6 w-10 h-10 flex justify-center items-center">
                    <i id="fa-check" class="fa-solid fa-check text-white"></i>
                </div>
                <div id="textTodo" class="w-full h-[90%]">
                   <textarea id="textTodoArea" class="bg-inherit w-full h-full" cols="100%" row="100%" disabled> ${to}</textarea>
                </div>
                <div id="box" class="shadow-lg rounded-lg bg-white p-2 mt-2  mx-auto w-[80%] h-16 grid grid-cols-3 gap-2 justify-items-center items-center text-2xl text-gray-400">
                    <div id="checkBox" class="group">
                        <button id="checkBtn btn" class="transition-all group-hover:text-indigo-500">
                            <i id="fa-check" class="fa-solid fa-check"></i>
                        </button>
                    </div>
                    <div id="editBox" class="group">
                        <button id="editBtn btn" class="transition-all group-hover:text-indigo-500">
                            <i id="fa-edit" class="fa-solid fa-edit"></i>
                        </button>
                    </div>
                    <div id="deleteBoxn" class="group">
                        <button id="trashBtn btn" class="transition-al group-hover:text-red-500">
                            <i id="fa-trash" class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>`;
		parent.appendChild(craeteTag);
		craeteTag.innerHTML = todo;
	});
}

function removeLocalTodo(todo) {
	let savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
	const ff = savedTodos.filter((t) => {
		t !== todo.children[1].innerText;
	});
	localStorage.setItem("todos", JSON.stringify(ff));
}
