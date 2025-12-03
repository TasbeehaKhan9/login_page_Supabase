import supabase from "./config.js";


let email = document.getElementById("exampleInputEmail1");
let password = document.getElementById("exampleInputPassword1");
let form = document.getElementById("myForm");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");

form.addEventListener("submit", async (e) => {
     e.preventDefault();
     emailError.textContent = "";
     passwordError.textContent = "";

     const userEmail = email.value.trim();
     const userPassword = password.value.trim();

     let isValid = true

     if (!userEmail) {
          emailError.textContent = "Email is required";
          isValid = false;
     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
          emailError.textContent = "Enter a valid email";
          isValid = false;
     }

     if (!userPassword) {
          passwordError.textContent = "Password is required";
          isValid = false;
     } else if (userPassword.length < 6) {
          passwordError.textContent = "Password must be at least 6 character"
          isValid = false;
     }
     if (!isValid) return;


     try {
          const { data, error } = await supabase.auth.signUp({
               email: userEmail,
               password: userPassword
          });

          if (error) {
               console.log("Supabase Error:", error.message);
               return;
          }

          console.log("UserData:", data);


          email.value = "";
          password.value = "";
     } catch (err) {
          console.log("Error:", err);
     }
});




