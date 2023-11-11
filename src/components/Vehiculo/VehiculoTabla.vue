
<template>
  <div>
    <VehiculoEditar ref="VehiculoEditar"/>
    
    <q-table
      :rows="datosFiltrados"
      :columns="columns"
      row-key="vehiculoId"
      :rows-per-page-options="[10,50,100]"
      
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
</template>


<style>

</style>



<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'
import VehiculoEditar from 'src/components/Vehiculo/VehiculoEdit.vue'


export default{

  name: "VehiculoTabla",

  components: {
    VehiculoEditar,
  },
  
  data(){
    return{
      datos: [],
      busqueda: '',
      columns: [
        { name: 'id', align: 'center', label: 'ID', field: 'vehiculoId', sortable: true },
        { name: 'marca', align: 'center', label: 'Marca', field: 'marca', sortable: true },
        { name: 'modelo', align: 'center', label: 'Modelo', field: 'modelo', sortable: true },
        { name: 'anio', align: 'center', label: 'Año', field: 'anio', sortable: true },
        { name: 'placa', align: 'center', label: 'Placa', field: 'numeroPlaca', sortable: true },
        { name: 'cliente', align: 'center', label: 'Cod. Cliente', field: 'clienteId', sortable: true },
        { name: 'cliente', align: 'left', label: 'Cliente', field: 'cliente', sortable: true },
        { name: 'acciones', align: 'center', label: 'Acciones', field: 'acciones', sortable: false},
      ]
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
        const response = await axios.get('http://localhost:5243/api/Vehiculo/GetAll');
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
      return this.columns.filter((columna) => columna.field !== 'vehiculoId');
    },

    editarFila(fila) {
      this.$refs.VehiculoEditar.abrirModalEdicion(fila);
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
          const response = await axios.delete(`http://localhost:5243/api/Vehiculo/Delete/${fila.vehiculoId}`);
          //console.log('ID enviado: ',fila.vehiculoId)
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