<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand" to="/">Sistenma de Usuarios</a>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/registrar" class="nav-link">Registrarme</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <br>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Registrarme
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="agregarUsuario">
                    <div class="mb-3">
                        <label for="dato" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" v-model="capturarusuario.nombre"
                            name="nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="dato" class="form-label">Correo</label>
                        <input type="email" class="form-control" id="correo" v-model="capturarusuario.correo"
                            name="correo" required>
                    </div>
                    <div class="mb-3">
                        <label for="dato" class="form-label">Clave</label>
                        <input type="password" class="form-control" id="clave" v-model="capturarusuario.clave" name="clave"
                            required>
                    </div>

                    <div class="btn-group" role="group" aria-label="">
                        <button type="submit" class="btn btn-success">Guardar</button>
                        <router-link to="/" class="btn btn-primary">Cancelar</router-link>
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
            capturarusuario: {} // captura los datos del imput
        }
    },
    methods: {
        agregarUsuario() { // metodo se llama en el post del formulario
            console.log(this.capturarusuario);
            var datosEnviar = { nombre: this.capturarusuario.nombre, correo: this.capturarusuario.correo, clave: this.capturarusuario.clave } // almacenados los datos capturados por el forumulario en una variable
            fetch('http://localhost/practica/?insertar=1', {
                method: "POST", // estamos mandado los datos por el metodo POST
                body: JSON.stringify(datosEnviar) // datos lo estamos enviado a travez de sentecnia JSON
            })
                .then(respuesta => respuesta.json())
                .then((datosRespuesta => {
                    if (datosRespuesta.mensaje == 1) {
                        alert("Usuario ya registrado en el sistema");
                    } else {
                        window.location.href = '/' // direccinar a listar
                    }
                }))
            // console.log(this.capturarusuario);
        }
    }
}
</script>