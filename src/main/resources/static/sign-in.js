(() => {
  'use strict';



//             document.getElementById("rememberMe").addEventListener("change", function() {
//                 // Získať povolenie od užívateľa na prístup k lokálnemu úložisku
//                 if (this.checked) {
//                     var consent = confirm("Do you want to save login details?");
//                     if (!consent) {
//                         // Užívateľ nechce uložiť prihlasovacie údaje
//                         this.checked = false;
//                         return;
//                     }
//                 }
//
//                 // Ulož hodnotu do lokálneho úložiska pri zmene stavu checkboxu
//                 localStorage.setItem("rememberMeChecked", this.checked);
//             });

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
                                 .then(response => {
                                     if (response.status === 200) {
                                         // Login  was successful
                                         alert("Prihlásenie bolo úspešné!");
                                          window.location.href = "/Insurance/clientInfo";
                                     } else {
                                         // Login failed
                                         alert("Prihlásenie bolo neúspešné!");
                                     }
                                 })
                                 .catch(error => {
                                     // An error occurred
                                     alert(error);
                                 });
                         }
            //

