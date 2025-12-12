import supabase from "./config.js";



// ____________________________login form functionality______________________________


let lemail = document.getElementById("exampleInputEmaillogin");
let lpassword = document.getElementById("exampleInputPasswordlogin");
let loginForm = document.getElementById("myForm2");



async function login(e){
    e.preventDefault()
     console.log(lemail.value,lpassword.value);
     try {
        const { data, error } = await supabase.auth.signInWithPassword({
  email: lemail.value,
  password: lpassword.value,
})
if(data){
    console.log(data)
    location.href = "profile.html"
}

     } catch (error) {
        console.log(error)
     }
}







loginForm.addEventListener("submit",login)