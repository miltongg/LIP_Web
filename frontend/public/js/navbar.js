let navbar, header;

if (document.getElementById("index")) {

    header =
        `
    <a href="index.html"><img class="logo" src="img/Logo.png" alt="Logo"></a>
    <ul class="top_navbar">
      <li><a href="views/laboratorio.html">Laboratorio</a></li>
      <li><a href="views/iniciativa.html">Iniciativa</a></li>
      <li><a href="views/metodologia.html">Metodología</a></li>
      <li><a href="views/interaccion.html">Interacción</a></li>
    </ul>
    `
    navbar =
        `
      <ul class="bottom_navbar">
          <a href="index.html"><li><span><i class="fas fa-home"></i> </span>Inicio</li></a>
          <a href="views/list.html"><li><span><i class="fas fa-boxes"></i> </span>Aplicaciones</li></a>
          <li>Proyectos</li>
          <li>Noticias</li>
          <div class="right_nav">
              <div>
                <ul class="login">
                  <li class="dropdownMenu">
                    <a href="#"><i class="fas fa fa-user-tie"></i> Admin</a>
                    <ul class="drop_list">
                        <a href="views/crud-user.html"><li class="first_child"><i class="fas fa fa-clipboard-list"></i> Admininstrar</li></a>
                        <a href="views/upload-app.html"><li class="last_child"><i class="fas fa fa-cloud-upload-alt"></i> Añadir aplicaci&oacute;n</li></a>
                    </ul>
                  </li>
                </ul>
              </div>
              <a href="views/profile.html"><li><i class="fas fa-id-card-alt"></i> Perfil</li></a>
              <a href="views/signin.html"><li><span><i class="fas fa-user-check"></i> </span>Ingresar</li></a>
          </div>
      </ul>
    `
} else {
    header =
        `
    <a href="../index.html"><img class="logo" src="../img/Logo.png" alt="Logo"></a>
    <ul class="top_navbar">
      <li><a href="laboratorio.html">Laboratorio</a></li>
      <li><a href="iniciativa.html">Iniciativa</a></li>
      <li><a href="metodologia.html">Metodología</a></li>
      <li><a href="interaccion.html">Interacción</a></li>
    </ul>
    `
    navbar =
        `
      <ul class="bottom_navbar">
        <a href="../index.html"><li><span><i class="fas fa-home"></i> </span>Inicio</li></a>
        <a href="list.html"><li><span><i class="fas fa-boxes"></i> </span>Aplicaciones</li></a>
        <li>Proyectos</li>
        <li>Noticias</li>
        <div class="right_nav">
          <div>
            <ul class="login">
              <li class="dropdownMenu">
                <a href="#"><i class="fas fa fa-user-tie"></i> Admin</a>
                <ul class="drop_list">
                  <a href="crud-user.html"><li class="first_child"><i class="fas fa fa-clipboard-list"></i> Admininstrar</li></a>
                  <a href="upload-app.html"><li class="last_child"><i class="fas fa fa-cloud-upload-alt"></i> Añadir aplicaci&oacute;n</li></a>
                </ul>
              </li>
            </ul>
          </div>
            <a href="profile.html"><li><i class="fas fa-id-card-alt"></i> Perfil</li></a>
            <a href="signin.html"><li><span><i class="fas fa-user-check"></i> </span>Ingresar</li></a>
        </div>
      </ul>
    `
}