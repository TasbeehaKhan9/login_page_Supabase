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


alert('Account created successfully. Please login now.');
    window.location.href = 'login.html';

if(data){
    console.log("show data of user ----->" ,data);
    userName.value = ""
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
    alert('Account created successfully. Please login now.');
    window.location.href = 'login.html';
}
}


    } catch (error) {
        console.log(error)
    }

}

signupForm && signupForm.addEventListener('submit', register)



// login code



let lemail = document.getElementById('exampleInputEmail')
let lpassword = document.getElementById('exampleInputPassword')
let LoginForm = document.getElementById('loginForm')





async function login (e){
  e.preventDefault()
  console.log(lemail.value,lpassword.value);
  try{
    const { data, error } = await supabase.auth.signInWithPassword({
  email: lemail.value,
  password: lpassword.value,
});

  if (error) {
      alert(error.message);
      return;
    }
    

  if (data.user) {
      
      const userName = data.user.user_metadata?.userName || "User";
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", data.user.id);

      
      window.location.href = 'profile.html';
    }

  }catch(err){
    console.log(err);
    
  }
}

 LoginForm && LoginForm.addEventListener('submit',login)




 //  ______________________________Profile

async function Profile() {
  const nameEl = document.getElementById("name");
  if (!nameEl) return;

  // ✅ name from localStorage
  nameEl.textContent = localStorage.getItem("userName") || "User";

  // ✅ session check
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    window.location.href = 'login.html'; // user not logged in → redirect
  }
}

Profile();




// let btn = document.getElementById('btn')
// btn.addEventListener('click',async function(){
//     const { error } = await supabase.auth.signOut()
//     if(error){
//    console.log(error.message);
   
//     }else{
//       location.href = 'index.html'
//     }
// })