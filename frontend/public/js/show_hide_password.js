export default function mostrarContrasena() {
    let pass = document.getElementById("password");
    let pass2 = document.getElementById("password_confirm");
    let icon
    if (pass.type === "password" || pass2.type === "password_confirm") {
        pass.type = "text";
        // pass2.type = "text";
        icon = document.getElementById("icon");
        // icon.classList.toggle("fa-eye-slash");
    } else if (pass.type === "text" || pass2.type === "text_confirm") {
        pass.type = "password";
        // pass2.type = "password";
        icon = document.getElementById("icon");
        // icon.classList.toggle("fa-eye");
    }
}

