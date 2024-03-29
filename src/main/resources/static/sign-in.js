(() => {
  'use strict';

 function setupPasswordToggle() {
   const togglePassword = document.getElementById('eye');
   const passwordField = document.getElementById('password');

   if (togglePassword && passwordField) {
     togglePassword.addEventListener('click', function () {
       const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
       passwordField.setAttribute('type', type);

       if (type === 'password') {
         this.classList.remove('hide');
       } else {
         this.classList.add('hide');
       }
     });
   } else {
     console.error('Elementy neboli nájdené.');
   }
 }

         async function checkEmailInDatabase(email) {
             try {
                 const response = await fetch(`/Insurance/checkEmail?email=${encodeURIComponent(email)}`);
                 const isEmailRegistered = await response.text();
                 const emailFeedback = document.getElementById("email-feedback");
                 const serverFeedback = document.getElementById("server-feedback");

                 if (isEmailRegistered === "true") {
                     // E-mail je zaregistrovaný
                     emailFeedback.innerText = 'E-mail is registered.';
                     serverFeedback.innerText = ''; // Vyčistiť feedback zo serveru
                 } else {
                     // E-mail nie je zaregistrovaný
                     emailFeedback.innerText = 'Please enter a valid email address.';
                     serverFeedback.innerText = 'Email is not registered.';
                 }
             } catch (error) {
                 console.error("Error while checking e-mail:", error);
             }
             }

             function setupForms() {
                const forms = document.querySelectorAll('.needs-validation');

                Array.from(forms).forEach(form => {
                  form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                      event.preventDefault();
                      event.stopPropagation();
                    }

                    form.classList.add('was-validated');
                  }, false);
                });
              }



              document.addEventListener('DOMContentLoaded', function () {
                setupForms();
                setupPasswordToggle();
              });


  })();


           function sendData(form) {
               // Clear the login cookie
               document.cookie = "login=";

               const formData = new FormData(form);
               // Send the loginData object to the Spring POST method
               fetch("/Insurance/login", {
                   method: "POST",
                   body: formData
               })
               .then(response => response.json())
               .then(data => {
                   if (data.userId) {
                       alert("Login was successful!");
                        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                        if(isMobile){
                        window.location.href = "/Insurance/mobileClient/" + data.userId;
                        }else{
                       window.location.href = "/Insurance/clientInfo/" + data.userId;}
                   } else if (data.status === 'forbidden') {
                       alert ("Invalid Password!");

                   }else if (data.status === 'badRequest'){
                    alert("This email is not registered!");

                   }
               })
               .catch(error => {
                   // An error occurred
                   alert(error);
               });
                event.preventDefault();
           }


