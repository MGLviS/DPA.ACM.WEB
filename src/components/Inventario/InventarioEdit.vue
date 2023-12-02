<template>
    <div>
      <q-dialog v-model="mostrarModal">
        <q-card class="qcard-modal-edit">
          <q-card-section>
            <q-input v-model="edicion.nombre" label="Nombre Producto" class="custom-label" readonly="readonly"/>
            <q-input v-model="edicion.descripcion" label="Descripcion" class="custom-label" />
            <!-- <q-input v-model="edicion.vehiculoCompatible" label="Vehiculo Compatible" class="custom-label" /> -->
            <q-select 
                v-model="edicion.vehiculoCompatible"
                :options= "comp_vehiculos"
                label="Auto Compatible"
            />
            <q-input v-model="edicion.cantidadStock" label="Stock" class="custom-label" />
            <q-input v-model="edicion.precioUnitario" label="Precio Unidad" class="custom-label" />
            <br />
            <div class="buttons">
              <q-btn @click="guardarEdicion" label="Actualizar" color="secondary" />
              <q-btn @click="cerrarModal" label="Cancelar" color="red" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <style>
  .qcard-modal-edit {
    width: 450px;
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
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import axios from 'axios';

  
  export default {

    data() {
      return {
        // ... Resto del código ...
        mostrarModal: false,
        edicion: {
            nombre: '',
            descripcion: '',
            vehiculoCompatible: '',
            cantidadStock: '',
            precioUnitario: '',
        },
        comp_vehiculos: ["Kia", "Hyundai", "Honda", "Toyota", "Nissan","Todos"],
      };
    },
  
    methods: {
  
      // Método para abrir el modal de edición
      abrirModalEdicion(fila) {
        // Guarda la fila seleccionada para editar
        this.edicion = { ...fila };
        this.mostrarModal = true;
      },
  
      // Método para cerrar el modal de edición
      cerrarModal() {
        this.mostrarModal = false;
        // Limpia los campos de edición
        this.edicion = {
            nombre: '',
            descripcion: '',
            vehiculoCompatible: '',
            cantidadStock: '',
            precioUnitario: '',
          // Limpia más propiedades según sea necesario
        };
      },
  
      // Método para guardar la edición y enviarla al servidor
      async guardarEdicion() {
      try {
        const response = await axios.put(`http://localhost:5243/api/Inventario/Update/${this.edicion.inventarioId}`, this.edicion);
        
        console.log('Registro actualizado:', response.data);

        //this.getDatos();
        location.reload();

        this.cerrarModal();
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    },
    },
  };
  </script>