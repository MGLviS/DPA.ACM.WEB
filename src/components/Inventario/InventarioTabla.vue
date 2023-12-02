<template>
    <div>
      <InventarioEditar ref="InventarioEditar"/>
      <div class="table-container">
        <q-table
          :rows="datosFiltrados"
          :columns="columns"
          row-key="inventarioId"
          :rows-per-page-options="[10,50,100]"
          class="scroll-table"
  
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="columna in columns" :key="columna.field" align="left">
                <template v-if="columna.field !== 'acciones'">
                  {{ celda(props.row, columna) }}
                </template>
  
                <template v-else>
                  <q-btn @click="editarFila(props.row)" icon="edit"  flat color="primary" />
                  <q-btn @click="eliminarFila(props.row)" icon="delete" flat color="negative" />
                </template>
              </q-td>
            </q-tr>
          </template>
  
  
  
          <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="busqueda" placeholder="Busqueda">
                <template v-slot:append>
                    <q-icon name="search"></q-icon>
                </template>
              </q-input>
          </template>
        </q-table>
      </div>
    </div>
  </template>
  
  
  <style>
  .table-container {
    position: relative;
    overflow: hidden;
  }
  .scroll-table {
    max-height: 600px; /* ajusta la altura máxima según tus necesidades */
    overflow-y: auto;
  }
  
  .q-table .q-table__top,
  .q-table .q-th {
    position: sticky;
    top: 0;
    background-color: #fff; /* ajusta el color de fondo según tu diseño */
    z-index: 1;
  }
  
  /* Fijar el buscador a la derecha */
  .q-table .q-field--dense {
    position: sticky;
    top: 0;
    right: 0;
    background-color: #fff; /* ajusta el color de fondo según tu diseño */
    z-index: 1;
  }
  </style>
  
  
  
  <script>
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'
  import axios from 'axios'
  import InventarioEditar from 'src/components/Inventario/InventarioEdit.vue'
  
  
  export default{
  
    name: "InventarioTabla",
  
    components: {
      InventarioEditar,
    },
  
    data(){
      return{
        datos: [],
        busqueda: '',
        columns: [
          { name: 'id', align: 'center', label: 'ID', field: 'inventarioId', sortable: true },
          { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
          { name: 'descripcion', align: 'center', label: 'Descripcion', field: 'descripcion', sortable: true },
          { name: 'vehiculoCompatible', align: 'center', label: 'Modelo Comp', field: 'vehiculoCompatible', sortable: true },
          { name: 'cantidadStock', align: 'center', label: 'Stock', field: 'cantidadStock', sortable: true },
          { name: 'precioUnitario', align: 'center', label: 'Precio Unidad', field: 'precioUnitario', sortable: true },
          { name: 'acciones', align: 'center', label: 'Acciones', field: 'acciones', sortable: false},

        ],
      }
    },
  
    computed: {
      // Filtra los datos según el texto de búsqueda
      datosFiltrados() {
        return this.datos.filter((dato) =>
          this.columnasFiltrables().some((columna) =>
            String(this.celda(dato, columna)).toLowerCase().includes(this.busqueda.toLowerCase())
          )
        );
  
  
      },
    },
  
    mounted() {
      this.getDatos();
    },
  
    methods: {
      async getDatos(){
        try {
          const response = await axios.get('http://localhost:5243/api/Inventario/GetAll');
          this.datos = response.data;
          console.log(this.datos)
        } catch (error){
          console.error('Error al obtener datos: ',error);
        }
      },
      celda(fila, columna){
        if (columna.field === 'cliente') {
          return fila.cliente.nombre + ' ' + fila.cliente.apellido;
        }
        return fila[columna.field];
      },
  
      // Retorna las columnas que se pueden filtrar
      columnasFiltrables() {
        return this.columns.filter((columna) => columna.field !== 'inventarioId');
      },
  
      editarFila(fila) {
        this.$refs.InventarioEditar.abrirModalEdicion(fila);
        //console.log('Editar:', fila);
      },
  
      // Función para eliminar una fila
      eliminarFila(fila) {
        const $q = useQuasar()
        this.$q.dialog({
          title: 'Confirmacion Requerida',
          message: '¿Seguro que desea eliminar?',
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          try {
            const response = await axios.delete(`http://localhost:5243/api/Inventario/Delete/${fila.inventarioId}`);
            //console.log('ID enviado: ',fila.inventarioId)
            console.log('Registro eliminado:', response.data);
            // Actualizar tus datos después de eliminar
            this.getDatos();
          } catch (error) {
            console.error('Error al eliminar:', error);
          }
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        })
      },
    },
  
    actualizar(){
      this.getDatos()
    }
  
  
  
  }
  
  </script>
  