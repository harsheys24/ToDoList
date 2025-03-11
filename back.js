
//Setting things up
let tasks = []
let toDolst = '';

const openBtn = document.getElementById('addB');
const closeBtn = document.getElementById('close');
const pops = document.getElementById('pops'); 
const cnt = document.getElementById('counter');
const tskin = document.querySelector('.task')

const month = document.querySelector('.mt');
const monthexp = month.value;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

//Pop Up functioning
openBtn.addEventListener("click",()=>{
    pops.classList.add("open");
})
closeBtn.addEventListener("click",()=>{
    pops.classList.remove("open");
})

tskin.addEventListener("keydown",(event)=>{
    if (event.key=="Enter"){
        add()
        pops.classList.remove("open")
    }
})

//Getting Time
function timer(){
    let samay = new Date()
    let hr = samay.getHours()

    let day = samay.getDay()
    let dayN = days[day]

    let date = samay.getDate()
    
    let month = samay.getMonth()
    let monthN = months[month]
    let mn = samay.getMinutes().toString().padStart(2,"0")
    let ampm = hr>=12? "pm" : "am";
    hr = hr%12 || 12
    
    document.querySelector('.tme').textContent = `${hr}:${mn} ${ampm}`
    document.querySelector('.dte').textContent = `${date}`
    document.querySelector('.dy').textContent = `${dayN} ~ `
    document.querySelector('.mt').textContent = `${monthN}`
}   
timer() 
setInterval(timer(),1000)

//Adding tasks to local storage and retrieving
document.addEventListener("DOMContentLoaded",()=>{
    const storetsks = localStorage.getItem("tasks")
    if (storetsks){
        tasks = JSON.parse(storetsks)
        counting()
        render()
    }
})
function savingtostore(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

//Adding tasks
function add(){
    let valext = document.querySelector('.task');
    let val = valext.value.trim()
    if (val==""){
        alert("Please enter a task");
    }
    else{
        tasks.push({task:val,completed:false});
        valext.value = "";
        savingtostore()
        counting()
        render()
    }
}

//Counting 
function counting(){
    cnt.textContent = tasks.length;
}

//Displaying
function render(){
    const mainDiv = document.querySelector('.main')
    mainDiv.innerHTML="";
    toDolst = '';
    tasks.forEach(function(element,index){
        const taskItem = document.createElement('div')
        taskItem.classList.add('bars');

        const butt = document.createElement('button')
        butt.classList.add('btn')
        butt.onclick=()=>toggle(index);

        const Del_btn = document.createElement('button')
        Del_btn.classList.add('del_btn')
        Del_btn.onclick=()=>deleter(index)

        const diver = document.createElement('div')
        diver.classList.add('t')
        diver.id = `task-${index}`
        diver.textContent= element.task
        if (element.completed){
            diver.classList.add('strikethrough')
        }
        
        const tskIc = document.createElement('img')
        tskIc.id = `imag-${index}`
        tskIc.src = element.completed? "icons/tick.svg":"icons/empty.svg";

        const delIc = document.createElement('img')
        delIc.id = `btn${index}`
        delIc.src = "icons/del.svg"

        Del_btn.appendChild(delIc)
        butt.appendChild(tskIc)
        taskItem.appendChild(diver)
        taskItem.appendChild(butt)
        taskItem.appendChild(Del_btn)
        mainDiv.appendChild(taskItem)
    })
}

//Deleting tasks
function deleter(index){
    tasks.splice(index,1)
    counting()
    render()
    savingtostore()
}

//Strikethrough of tasks upon completion
function toggle(index) {
    tasks[index].completed = !tasks[index].completed;
    const img = document.getElementById(`imag-${index}`);
    if (img) {
        img.src = tasks[index].completed ? "icons/tick.svg" : "icons/empty.svg";
    }
    const striker = document.getElementById(`task-${index}`)
    if (striker){
        striker.classList.toggle('strikethrough',tasks[index].completed)
    }
    savingtostore()
}


