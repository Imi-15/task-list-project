const taskCount = document.getElementById ('task-count')
const taskList = document.getElementById('task-list')
const taskInput = document.getElementById('task-input')
const addBtn = document.getElementById('add-btn')

let tasks = []

function addTask() {
    // to add store the takss added
    const text = taskInput.value.trim()
    if (!text) return;

    //doen will be left at false till it is ticked as fininshed and task displays the time of additon to list and th eadded list value gotten form text
    const task = {id: Date.now(), text, done: false}
    //task is the container where all the task tht come from const task stays 
    tasks.push(task)
    //taskInput is left empty
    taskInput.value = ''
    renderTasks()
}

//below code says, when addBtn is clicked, run add task
addBtn.addEventListener('click', addTask)

//also allow pressing enter
taskInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') addTask();
})

function renderTasks() {
    taskList.innerHTML = ''

    //below says for every task, create a new list for it and when done add done
    //here if you select undo you go back to see done and if you slelect odne you will see undo that can take you back tp done
    tasks.forEach((task) => {
        const li = document.createElement('li')
        if (task.done) li.classList.add('done')

        li.innerHTML = `
        <span> ${task.text}</span>
        <div class = "actions">
            <button class = "done-btn" onclick = "toggleDone(${task.id})">
            ${task.done ? 'Undo' : 'Done'}
            </button>
            <button class = "delete-btn" onclick = "deleteTask(${task.id})">Delete </button>
        </div>
        `
        //each new task is added to the bottom of the list
        taskList.appendChild(li)
    })

    updateCount()
}

//functions can be used before they are even given a vlaue which is called
function toggleDone(id) {
    //belwo says, trace tasks as t, if t.id is equal to id, t is done, else t is not done (not sure yet)
    tasks = tasks.map((t) => 
    t.id === id ? {...t, done: !t.done} : t
    )
    renderTasks()
}

function deleteTask (id) {
    tasks = tasks.filter((t) => t.id !== id)
    renderTasks()
}

//
function updateCount () {
    const remaining = tasks.filter((t) => !t.done).length
    taskCount.textContent = `${remaining !== 1 ? 's' : ''} remaining`
}
