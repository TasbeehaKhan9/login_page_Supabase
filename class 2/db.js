
import supabase from './config.js'

let title = document.getElementById('title')
let desc = document.getElementById('description')
let btn = document.getElementById('btn')
let todoBtn = document.getElementById('addTodo')
let prior = document.getElementsByName('priority')
let main = document.getElementById('main')



async function addTodo(e){
    e.preventDefault()
    console.log(editId);
   
    
    let selectedPrio;
    console.log(title.value,desc.value);
    for(var p of prior){
        if(p.checked){
            selectedPrio = p.value
            
        }
        
    }
     if(editId){
      const { error } = await supabase
  .from('todos')
  .update({ title: title.value, priority: selectedPrio,description:desc.value  })
  .eq('id', editId)
  if(error){
    console.log('error in updating data',error);
    
  }else{
    alert('doc updated succesfully')
    allTodos()
  }

    }else{
      

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
 

    
    
    
}

btn.addEventListener('submit',addTodo)

async function allTodos() {
    
    try{
const { data, error } = await supabase
  .from('todos')
  .select('*')
//   .eq('id', '4') filter 
  if(data){
    
    showAllTodos(data)
    
  }else{
    
  }
    }catch(er){
console.log(er);

    }
}
allTodos()
async function showAllTodos(todos){
  console.log(todos);
  main.innerHTML =''
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
let editId= null
window.edtTodo = (id,tit,des,priority)=>{
console.log(id,des,tit,priority);
 title.value = tit;
 desc.value = des
prior.forEach(p=>{
  console.log(p);

            //false 'high'   ==   low
           //false // 'med'   ==   low
    //  true      'low' == low
  p.checked = p.value === priority
  
})
 
  todoBtn.innerHTML =  'edit todo'
  editId = id
}


window.dltTodo = async (id)=>{
try{
const response = await supabase
  .from('todos')
  .delete()
  .eq('id', id)
  if(response){
    console.log(response);
    allTodos()
    
  }

}catch(err){
  console.log(err);
  
}
}


 
