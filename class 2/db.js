
import supabase from './config.js'

let title = document.getElementById('title');
let desc = document.getElementById('description');
let btn = document.getElementById('btn');
let todoBtn = document.getElementById('addTodo');
let prior = document.getElementsByName('priority');
let main = document.getElementById('main');

async function addTodo(e){
    e.preventDefault()
    console.log(editId);

    let selectedPrio;
    console.log(title.value,desc.value)
    for(var p of prior){
        if(p.checked){
            selectedPrio = p.value
        }
    }

    if(editId){
      const { error } = await supabase
  .from('todos')
  .update({ title:title.value,description:desc.value,priority:selectedPrio.value })
  .eq('id', editId)
  if(error){
    console.log('error in updating data',error);

  }else{
    alert("it is updates Succesfully")
    allTodos()
  }

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