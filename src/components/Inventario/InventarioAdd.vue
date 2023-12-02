<template>
    <div>
      <q-dialog v-model="mostrarModal">
        <q-card class="qcard-modal-edit">
          <q-card-section>
            <div class="titulo">Agregar Inventario</div>
            <q-input v-model="nuevoIn.nombre" label="Nombre Producto" class="custom-label" />
            <q-input v-model="nuevoIn.descripcion" label="Descripcion" class="custom-label" />
            <!-- <q-input v-model="edicion.vehiculoCompatible" label="Vehiculo Compatible" class="custom-label" /> -->
            <q-select 
                v-model="nuevoIn.vehiculoCompatible"
                :options= "comp_vehiculo"
                label="Auto Compatible"
            />
            <q-input v-model="nuevoIn.cantidadStock" label="Stock" class="custom-label" />
            <q-input v-model="nuevoIn.precioUnitario" label="Precio Unidad" class="custom-label" />

            <br />
            <div class="buttons">
              <q-btn @click="guardarnuevoIn" label="Guardar" color="secondary" />
              <q-btn @click="cerrarModal" label="Cancelar" color="red" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>

  <style>
  .titulo{
    text-align: center;
    font-size: large;
    font-style: inherit;
  }
  .qcard-modal-edit {
    width: 550px;
    align-content: center;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
  }

  .buttons q-btn {
    width: 48%;

  }

  .buttons q-btn:last-child {
    margin-left: 10px;
  }

  .custom-label .q-field__label {
  font-size: 16px;

}
  </style>



<script>
import { Notify } from 'quasar'
import axios from 'axios'
export default{
    data() {
      return {

        mostrarModal: false,
        nuevoIn: {
            nombre: '',
            descripcion: '',
            vehiculoCompatible: '',
            cantidadStock: '',
            precioUnitario: '',

        },
        clientes: [""],
        comp_vehiculo: ["Todos","Kia", "Hyundai", "Honda", "Toyota", "Nissan"],
        //opcionYear: generateYears(1994,2023),
      };
    },


    mounted() {
        this.getDatos()

    },
    methods: {

        abrirModalnuevoIn() {
            this.mostrarModal = true;
        },

            // Método para cerrar el modal de edición
        cerrarModal() {
            this.mostrarModal = false;
            // Limpia los campos de edición
            this.nuevoIn = {
                nombre: '',
                descripcion: '',
                vehiculoCompatible: '',
                cantidadStock: '',
                precioUnitario: '',
                // Limpia más propiedades según sea necesario
                };
        },

        // Método para enviar al servidor
        async guardarnuevoIn() {
        try {
            let url = "http://localhost:5243/api/Inventario/Create"
            var data = {
                nombre: this.nuevoIn.nombre,
                descripcion: this.nuevoIn.descripcion,
                vehiculoCompatible: this.nuevoIn.vehiculoCompatible,
                cantidadStock: this.nuevoIn.cantidadStock,
                precioUnitario: this.nuevoIn.precioUnitario
            }
            console.log(data)
            //peticion post
            axios.post(url,data)
                    .then(reponse => {
                        this.$q.notify({
                            message: "Se añadió correctamente",
                            color: 'green',
                            position: 'top',
                            timeout: 10000
                        })
                    }).catch(error => {
                        this.$q.notify({
                            message: "Ha Ocurrido un problema",
                            color: 'red',
                            position: 'top',
                            timeout: 10000
                        })
                    })     
            location.reload();
            this.cerrarModal();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
        },

        async getDatos(){
            try {
            const response = await axios.get('http://localhost:5243/api/Inventario/GetAll');
            this.clientes = response.data;
            //console.log(this.clientes)
        } catch (error) {
            console.error('Error al obtener clientes:', error);
        }
        }

    },
}
</script>
