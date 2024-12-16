<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand" to="/Listar">Usuarios del Sistema</a>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <router-link to="/Listar" class="nav-link">Listar</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/crear" class="nav-link">Crear</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Salir</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <br>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Editar Nuevo Usuario
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="ActualizarRegistro">
          <div class="mb-3">
            <label for="dato" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" v-model="capturarusuario.nombre" name="nombre" required>
          </div>
          <div class="mb-3">
            <label for="dato" class="form-label">Correo</label>
            <input type="email" class="form-control" id="correo" v-model="capturarusuario.correo" name="correo"
              required>
          </div>
          <div class="mb-3">
            <label for="dato" class="form-label">Clave</label>
            <input type="text" class="form-control" id="clave" v-model="capturarusuario.clave" name="clave" required>
          </div>
          <div class="mb-3">
            <label for="dato" class="form-label">Status</label>
            <select class="form-select" aria-label="Default select example" id="status" v-model="capturarusuario.status"
              name="status">
              <option value="1">ACTIVO</option>
              <option value="0">INACTIVO</option>
            </select>
          </div>

          <div class="btn-group" role="group" aria-label="">
            <button type="submit" class="btn btn-success">Modificar</button>
            <router-link to="/Listar" class="btn btn-primary">Cancelar</router-link>
          </div>
        </form>

      </div>
      <div class="card-footer text-muted">
        Usuarios del Sistema
      </div>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {
      capturarusuario: {} // captura y mostrar los datos del imput
    }
  },
  created: function () { // llaamos los metodos para mostrarla en la plantilla
    this.obteneriformacionID(); // ejecutar el metodo
  },
  methods: {
    obteneriformacionID() { // obtenerla  informacion y mandarla al forma
      fetch('http://localhost/practica/?consultar=' + this.$route.params.id) // capturamos la ID que mandamos por parametro de la listar
        .then(respuesta => respuesta.json()) // espuesta la voy a mandar en tipo JSON
        .then((datosrespuesta) => {
          console.log(datosrespuesta)
          this.capturarusuario = datosrespuesta[0]; // solo capturamos un solo dato 
        })
        .catch(console.log)
    },
    ActualizarRegistro() { // metodo para actualizar informacion
      var datosEnviar = { id: this.$route.params.id, nombre: this.capturarusuario.nombre, correo: this.capturarusuario.correo, correoviejo: this.capturarusuario.correoviejo, clave: this.capturarusuario.clave, status: this.capturarusuario.status } // almacenados los datos capturados por el forumulario en una variable
      fetch('http://localhost/practica/?actualizar=' + this.$route.params.id, {
        method: "POST", // estamos mandado los datos por el metodo POST
        body: JSON.stringify(datosEnviar) // datos lo estamos enviado a travez de sentecnia JSON
      })
        .then(respuesta => respuesta.json())
        .then((datosRespuesta => {
          if (datosRespuesta.mensaje == 1) {
            window.location.href = '/Listar' // direccinar a listar
          } else {
            alert("Ingresar todos los campos");
          }

        }))
      // console.log(this.capturarusuario);
    }
  }
}
</script>