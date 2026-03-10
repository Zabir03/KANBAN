const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
// console.log(todo, progress, done)


const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    tasks.addEventListener("drag", (e) => {
        console.log('dragging', e);
    })
})

progress.addEventListener("dragenter", (e) => {
    progress.this.classList.add("hover-over");
})