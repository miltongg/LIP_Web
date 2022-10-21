export default function ocultarContrasena() {
    let pass = document.getElementById("password");
    let pass2 = document.getElementById("password_confirm");
    let icon
    if (pass.type === "text" || pass2.type === "text_confirm") {
        pass.type = "password";
        // pass2.type = "password";
        icon = document.getElementById("icon");
        // icon.classList.toggle("fa-eye");
    }
}