
import supabase from './config.js'

let title = document.getElementById('title');
let desc = document.getElementById('description');
let btn = document.getElementById('btn');
let todoBtn = document.getElementById('addTodo');
let prior = document.getElementsByName('priority');
let main = document.getElementById('main');
let editId = null;

async function addTodo(e){
    e.preventDefault()

    let selectedPrio;
    console.log(title.value,desc.value)
    for(var p of prior){
        if(p.checked){
            selectedPrio = p.value;
        }
    }

    if(editId){
      const { error } = await supabase
  .from('todos')
  .update({ title:title.value,description:desc.value,priority:selectedPrio.value })
  .eq('id', editId)
  if(error){
    console.log('error in updating data',error);
    alert("todo updated succesfully")
    editId = null;

  }else{
    alert("it is updates Succesfully")
    allTodos()
  

   try{
   const { error } = await supabase
  .from('todos')
  .insert([ {title: title.value, priority: selectedPrio,description:desc.value}  ]);
  if(error){
    console.log(error)
  }else{
    alert('todo added successfully')
    allTodos()
    title.value = ''
    desc.value = ''
  }

    }catch(er){
        console.log(er);
        
    }

  }
  allTodos();
    }
}


btn.addEventListener("submit", addTodo)

async function allTodos(){

  try {
    const { data,error } = await supabase
  .from('todos')
  .select("*")
  if(data){
    showAllTodos(data)
    
  }else{

  }
  } catch (error) {
    console.log(error);
  }
}


allTodos()
async function showAllTodos(todos){
  console.log(todos);
  main.innerHTML = "";
  todos.forEach(todo => {
    main.innerHTML += `<div class="card">
  <div class="card-body">
    ${todo.title}
  </div>
   <div class="card-body">
    ${todo.priority}
  </div>
   <div class="card-body">
    ${todo.description}
  </div>
  <div><button class='btn' onclick='edtTodo(${todo.id},"${todo.title}","${todo.description}","${todo.priority}")'>🖊️</button></div> 
   <div><button class='btn' onclick='dltTodo(${todo.id})'>🗑️</button></div> 
 
 
</div>` 
  });
}
window.edtTodo = (id,tit,desc,prior)=>{
  console.log(id,tit,desc,prior);
  title.value = tit;
  description.value = desc;
  priority.forEach( p =>{
    console.log(P);
    
    p.checked = p.value === priority
  })

todoBtn.innerHTML = " Edit todo"
editId = id

}


window.dltTodo =  async (id)=>{
  try {
const response = await supabase
  .from('todos')
  .delete()
  .eq('id', id)
  if(response){
    console.log(response);
    allTodos()
  }
  } catch (error) {
    console.log(error);
  }
}