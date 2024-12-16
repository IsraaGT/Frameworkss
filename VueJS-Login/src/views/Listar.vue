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
                Usuarios <router-link to="/crear" class="btn btn-success">Crear</router-link>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Clave</th>
                            <th>Estado</th>
                            <th></th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dato in arrayusuarios" :key="dato.id">
                            <td>{{ dato.id }}</td>
                            <td>{{ dato.nombre }}</td>
                            <td>{{ dato.correo }}</td>
                            <td>{{ dato.clave }}</td>
                            <td>{{ dato.status }}</td>
                            <td><router-link :to="{ name: 'Editar', params: { id: dato.id } }"
                                    class="btn btn-success">Editar</router-link></td>
                            <td><button type="button" v-on:click="borrarUsuario(dato.id)"
                                    class="btn btn-danger">Eliminar</button></td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class="card-footer text-muted">
                Usuarios del Sistema
            </div>
        </div>

    </div>
</template>
<script>
export default {

    data() { // data palabra reservada
        return {
            arrayusuarios: [] // arreglo para contener los empleados
        }
    },
    created: function () { // llaamos los metodos para mostrarla en la plantilla

        this.consultarUsuario();
    },
    methods: { // metodos para interactuar con el consumo de la API
        consultarUsuario() {
            fetch('http://localhost/practica/?mostrar')
                .then(respuesta => respuesta.json()) // espuesta la voy a mandar en tipo JSON
                .then((datosrespuesta) => {
                    console.log(datosrespuesta)
                    this.arrayusuarios = []
                    if (typeof datosrespuesta[0].success === 'undefined') { // validamos que realmente exitan datos para que lo almacene en eel array
                        this.arrayusuarios = datosrespuesta;
                    }
                })
                .catch(console.log)
        },
        borrarUsuario(id) {
            fetch('http://localhost/practica/?eliminar=' + id)
                .then(respuesta => respuesta.json()) // espuesta la voy a mandar en tipo JSON
                .then((datosrespuesta) => {
                    console.log(datosrespuesta)
                    window.location.href = '/' // manda a listar
                })
                .catch(console.log)
        }
    }
}
</script>
