<template>
  <q-page>
    <q-container class="q-mb-md">
      <q-select
        v-model="selectedChart"
        :options="chartOptions"
        label="Selecciona un gráfico"
        emit-value
        map-options
      />
    </q-container>

    <div :class="selectedChart">
      <component :is="selectedChart" />
    </div>
  </q-page>
</template>

<style scoped>
/* Ajusta el ancho del gráfico */
.BarChart {
  width: 100%; /* Haz ajustes según sea necesario */
}
</style>

<script>
  import BarChart from 'src/components/Reportes/ReporteVehiculo.vue'; // Ajusta la ruta según tu estructura de carpetas
  import BCFactura from 'src/components/Reportes/ReporteFacturas.vue';
  export default {
    data() {
      return {
        selectedChart: null,
        chartOptions: [
          { label: 'Reporte Vehiculo por Fabrincante', value: 'BarChart' },
          { label: 'Reporte Montos Facturados', value: 'BCFactura' },
          // Agrega más opciones según los gráficos disponibles
        ],
      };
    },
    components: {
      BarChart,
      BCFactura
      // Agrega otros componentes de gráficos aquí según sea necesario
    },
  };
  </script>
  
