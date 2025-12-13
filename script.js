import supabase from "./config.js";



document.addEventListener("DOMContentLoaded", () => {
let userName = document.getElementById('userName')
let email = document.getElementById("exampleInputEmail1");
let password = document.getElementById("exampleInputPassword1");
let form = document.getElementById("myForm");
// let emailError = document.getElementById("emailError");
// let passwordError = document.getElementById("passwordError");


if(!form) return;

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
               password: userPassword,

               options: {
                    data: {
                         userName: userName.value
                    }
               }
          });

          if (error) {
               console.log("Supabase Error:", error.message);
               return;
          }

          console.log("UserData:", data);

          userName.value = "",
          email.value = "",
          password.value = "";
     } catch (err) {
          console.log("Error:", err);
     }
});


    async function Profile() {
        const name = document.getElementById("new");
        if (!name) return;

        // Step 1: localStorage se username fetch karo
        const userName = localStorage.getItem("userName") || "User";
        name.innerHTML = userName;

        // Step 2: optional - Supabase se bhi check kar sakte ho
        const { data, error } = await supabase.auth.getUser();
        if (!error && data.user) {
            name.innerHTML = data.user.user_metadata.userName || userName;
            console.log(data.user);
        }
    }
Profile();
});

