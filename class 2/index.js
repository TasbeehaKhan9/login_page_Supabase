import supabase from './config.js'


let userName = document.getElementById('userName');
let email = document.getElementById('enterEmail');
let password = document.getElementById('enterPasword');
let signupForm = document.getElementById('myForm')



async function register(e) {

    e.preventDefault()
    if(!userName.value || !email.value || !password.value){
        alert("please enter first details to login")

        return
    }


    try {
        const { data, error } = await supabase.auth.signUp({
  email: email.value,
  password: password.value,
    options:{
    data:{
        userName :userName.value,
             role:'user'
    }
  }
})

if(data){
    console.log("show data of user ----->" ,data);
    email.value = ""
    password.value = ""

     let {id,user_metadata} = data.user
  const { error } = await supabase
  .from('users')
  .insert({ 
        username: user_metadata.userName,
        email: data.user.email,
        userId: id,
        role: user_metadata.role
})
  if(error){
    console.log(error);
    
  }else{
    alert('user created successfully');
    window.location.href = 'profile.html'
    
  }
}


    } catch (error) {
        console.log(error)
    }

}

signupForm.addEventListener('submit', register)