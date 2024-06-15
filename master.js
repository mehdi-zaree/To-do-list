//select
const addbutton= document.getElementById('addbutton')
const taskinput = document.getElementById('taskinput')
const list = document.getElementById('list')
const taskremove = document.getElementById('delete')
const checkbox = document.getElementById('checkbox')
taskinput.focus()
// flags
let clickFlag = 0
let flag = 0
// localStorage
let storedData = []
if(localStorage.getItem('TasksData')!= null){
    storedData = (JSON.parse(localStorage.getItem('TasksData')))
    storedData.map((val,index)=>{
        
    let li = document.createElement('li')
    li.classList.add('flex', 'justify-between', 'px-2', 'mt-2', 'bg-[#ededde]', 'rounded-lg','flex-wrap','my-list')
    li.innerHTML=`
                    <div class="flex  gap-3 index-${val.flag}" data-index =${val.flag}>
                        <input type="checkbox" onclick="_select(this)" id='connect${val.flag}'>
                        <label  id='task' for ='connect${val.flag}'>${val.title}</label>
                    </div>
                    <div>
                        <i class="fa-solid fa-pen text-sm cursor-pointer" onclick = "_edit(this)"></i>
                        <i class="fa-solid fa-trash text-sm cursor-pointer" onclick='del(this)'></i>
                    </div>
    `
    list.appendChild(li)
    flag = storedData.length
    
    })
}

// localStorage

// creating//
addbutton.addEventListener('click',()=>{
    if(taskinput.value != ""){
    let li = document.createElement('li')
    li.classList.add('flex', 'justify-between', 'px-2', 'mt-2', 'bg-[#ededde]', 'rounded-lg','flex-wrap','my-list')
    li.innerHTML=`
                    <div class="flex  gap-3 index-${flag}" data-index =${flag}>
                        <input type="checkbox" onclick="_select(this)" id='connect${flag}'>
                        <label  id='task' for ='connect${flag}'>${taskinput.value}</label>
                    </div>
                    <div>
                        <i class="fa-solid fa-pen text-sm cursor-pointer" onclick = "_edit(this)"></i>
                        <i class="fa-solid fa-trash text-sm cursor-pointer" onclick='del(this)'></i>
                    </div>
    `
    list.appendChild(li)
    // storing to local storage///
    const todoData = {
        flag : flag,
        title : taskinput.value
    }
    storedData.push(todoData)
    flag++
    ///reseting flag to debug after deleting
    storedData.forEach((val,index)=>{
        val.flag = index
    })
    localStorage.setItem('TasksData',JSON.stringify(storedData))
    // storing to local storage
    taskinput.focus()
    taskinput.value=null
    }
    else{
        alert('please write something')
    }
    
    
})
// creating


// deleting task 
let Deleted = 0 

const del = (e)=> {
    Deleted = e.parentElement.previousElementSibling.getAttribute('data-index')
    e.parentElement.parentElement.remove()
    const lists = document.querySelectorAll('.my-list')
    
    
    let delFlag = 0
    lists.forEach((myList)=>{
        myList.firstElementChild.setAttribute('data-index',delFlag)
        let _index = myList.firstElementChild.getAttribute('data-index')
        myList.firstElementChild.classList.remove(`index-${_index}`)
        delFlag++
        list.lastElementChild.firstElementChild.classList.remove(`index-${Number(delFlag)}`) 
        myList.firstElementChild.classList.add(`index-${_index}`)
    })
    
    
    
    storedData.splice(Deleted,1)
    localStorage.setItem('TasksData',JSON.stringify(storedData))
    
    
    //reseting local storage flags after deleting an item
    storedData.forEach((val,index)=>{
        val.flag = index
        localStorage.setItem('TasksData',JSON.stringify(storedData))
    })
    location.reload()
    //if local storage is empty starts flags from 0
    if(storedData == ''){
        flag = 0
    }
    
}

// deleting task 
// checked 
const _select = (s)=> {
    if(s.checked){
        s.nextElementSibling.classList.add('line-through')
        s.parentElement.parentElement.classList.add('order-last')
        
    }else{
        s.nextElementSibling.classList.remove('line-through')
        s.parentElement.parentElement.classList.add('order-first')
        
    }
}
// checked

//edit///
const submit = document.getElementById('submitButton')
const cancel = document.getElementById('cancelButton')
function _edit(e){
    if(taskinput.value == ''){
    const submitedTask = e.parentElement.previousElementSibling.childNodes[3]
    clickFlag =e.parentElement.previousElementSibling.getAttribute('data-index')   
    taskinput.value += submitedTask.innerText
    addbutton.classList.add('hidden')
    submit.classList.remove('hidden')
    cancel.classList.remove('hidden')
    taskinput.focus()
    }
}
//submit
submit.addEventListener('click',()=>{
    const targetDiv = document.querySelector(`.index-${clickFlag}`)
    targetDiv.lastElementChild.innerHTML = taskinput.value
    _cancel()
    //storing edtied item in local storage
    storedData[clickFlag].title = taskinput.value
    localStorage.setItem('TasksData',JSON.stringify(storedData))
    // emptying input and focusing on
    taskinput.focus()
    taskinput.value = null
    })

// cancel//
function _cancel(e){
    
    addbutton.classList.remove('hidden')
    submit.classList.add('hidden')
    cancel.classList.add('hidden')
}