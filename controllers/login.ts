const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const usernameInput = document.getElementById("username") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const message = document.getElementById("message") as HTMLParagraphElement;


const ADMIN_USER = "admin";
const ADMIN_PASS = "tonmotdepasse";

loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    message.style.color = "green";
    message.innerText = "Connexion réussie ✅";
    setTimeout(() => {
      window.location.href = "admin.html"; // Page de test admin
    }, 1000);
  } else {
    message.style.color = "red";
    message.innerText = "Identifiants incorrects ❌";
  }
});
