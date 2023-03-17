let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");


// Array to store tasks
let arrayOfTasks = [];

if(localStorage.getItem('tasks')){
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}

getData()

// add task 
submit.onclick = function(){
    if (input.value !== ""){
        addTaskToArray(input.value);
        input.value = "";
    }
}

// click 
taskDiv.addEventListener("click",(e)=>{
    // delete
    if(e.target.classList.contains("del")){
        deleteTask(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove(); 
    }
    // update 
    if(e.target.classList.contains("task")){
        toggletask(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(tasktext){
    const task = {
        id:Date.now(),
        title: tasktext,
        completed: false, 
    };
    // push to array 
    arrayOfTasks.push(task);
    // add tasks to page 
    addElementsToPageFrom(arrayOfTasks);
    // add to localStorage
    addTolocalStorage(arrayOfTasks)
}

function addElementsToPageFrom(arrayOfTasks){
    // empty task dev 
    taskDiv.innerHTML = '';
    // looping on tasks
    arrayOfTasks.forEach((task)=>{
        let div = document.createElement('div');
        div.className = "task";
        // check if task is done 
        if(task.completed){
        div.className = "task done";
        }

        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // create delete button 
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        /////
        taskDiv.appendChild(div);

    })
}

function addTolocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getData(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks)
    }
}

function deleteTask(taskid){
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskid);
    addTolocalStorage(arrayOfTasks);
}

function toggletask(taskid){
    for(let i= 0; i<arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskid){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed == true) : (arrayOfTasks[i].completed == false)
        }
    }
    addTolocalStorage(arrayOfTasks);
}