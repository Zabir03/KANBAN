let tasksData = {};

const columns = [
    document.querySelector("#todo"),
    document.querySelector("#progress"),
    document.querySelector("#done")
];

let dragElement = null;

/* ================= TASK CREATION ================= */

function createTask(title, desc, column) {
    const div = document.createElement("div");

    div.className = "task";
    div.draggable = true;

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `;

    // Drag
    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    // Delete
    div.querySelector("button").addEventListener("click", () => {
        div.remove();
        saveData();
        updateCounts();
    });

    column.appendChild(div);
}

/* ================= SAVE DATA ================= */

function saveData() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");

        tasksData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }));
    });

    localStorage.setItem("tasksData", JSON.stringify(tasksData));
}

/* ================= UPDATE COUNTS ================= */

function updateCounts() {
    columns.forEach(col => {
        const count = col.querySelector(".right");
        count.innerText = col.querySelectorAll(".task").length;
    });
}

/* ================= LOAD DATA ================= */

function loadData() {
    const data = JSON.parse(localStorage.getItem("tasksData"));
    if (!data) return;

    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => {
            createTask(task.title, task.desc, column);
        });
    }

    updateCounts();
}

/* ================= DRAG & DROP ================= */

function setupDrag(column) {
    column.addEventListener("dragover", e => e.preventDefault());

    column.addEventListener("dragenter", () => {
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("drop", () => {
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        saveData();
        updateCounts();
    });
}

columns.forEach(setupDrag);

/* ================= MODAL ================= */

const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");

document.querySelector("#toggle-modal").onclick = () => {
    modal.classList.toggle("active");
};

modalBg.onclick = () => modal.classList.remove("active");

/* ================= ADD TASK ================= */

document.querySelector("#add-new-task").onclick = () => {
    const title = document.querySelector("#task-title-input").value;
    const desc = document.querySelector("#task-desc-input").value;

    createTask(title, desc, columns[0]); // always add to TODO

    saveData();
    updateCounts();

    modal.classList.remove("active");
};

/* ================= INIT ================= */

loadData();