<template>
    <div>
      <q-dialog v-model="mostrarModal">
        <q-card class="qcard-modal-edit">
          <q-card-section>
            <div class="titulo">Agregar Vehiculo</div>
            <q-input v-model="nuevoV.marca" label="Fabricante" class="custom-label"/>
            <q-input v-model="nuevoV.modelo" label="Modelo" class="custom-label" />
            <q-input v-model="nuevoV.anio" label="Año" class="custom-label" />
            <q-input v-model="nuevoV.numeroPlaca" label="Número de Placa" class="custom-label" />
            <!-- <q-input v-model="nuevoV.clienteId" label="Codigo Cliente" class="custom-label" /> -->
            <!-- <q-input v-model="nuevoV.clienteId" label="Cliente" class="custom-label"> -->
                <q-select
                    v-model="nuevoV.clienteId"
                    :options="clientes"
                    option-value="clienteId"  
                    :option-label="option => `${option.nombre} ${option.apellido}`"
                    
                />
            <!-- </q-input> -->

            <br />
            <div class="buttons">
              <q-btn @click="guardarnuevoV" label="Guardar" color="secondary" />
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
import axios from 'axios'
export default{
    data() {
      return {

        mostrarModal: false,
        nuevoV: {
            marca: '',
            modelo: '',
            anio: '',
            numeroPlaca: '',
            clienteId: '',
         
        },
        clientes: [],
      };
    },


    mounted() {
        this.getClientes()   

    },
    methods: {
            
        abrirModalnuevoV() {
            this.mostrarModal = true;
        },

            // Método para cerrar el modal de edición
        cerrarModal() {
            this.mostrarModal = false;
            // Limpia los campos de edición
            this.nuevoV = {
                marca: '',
                modelo: '',
                anio: '',
                numeroPlaca: '',
                clienteId: '',
                // Limpia más propiedades según sea necesario
                };
        },

        // Método para enviar al servidor
        async guardarnuevoV() {
        try {
            let url = "http://localhost:5243/api/Vehiculo/Create"
            var data = {
                marca: this.nuevoV.marca,
                modelo: this.nuevoV.modelo,
                anio: this.nuevoV.anio,
                numeroPlaca: this.nuevoV.numeroPlaca,
                clienteId: this.nuevoV.clienteId.clienteId
            }
            //console.log(data)
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


            
            //location.reload();
            this.cerrarModal();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
        },

        async getClientes(){
            try {
            const response = await axios.get('http://localhost:5243/api/Cliente/GetAll');
            this.clientes = response.data;
            //console.log(this.clientes)
        } catch (error) {
            console.error('Error al obtener clientes:', error);
        }
        }
},
}
</script>