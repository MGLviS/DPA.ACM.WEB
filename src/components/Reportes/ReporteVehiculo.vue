<template>
    <div class="grafico">
        <div class="container">
             <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
        </div>
    </div>
  </template>
  
  <style>
  .grafico {
    margin: 20px;
    justify-content: center;
    align-items: center;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh; /* Ajusta la altura según tus necesidades */
  }
  
  </style>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      return {
        loaded: false,
        chartData: null,
        chartOptions: {
          maintainAspectRatio: false, // Esto permite ajustar el tamaño del gráfico
          responsive: true,
        }
      };
    },
    async mounted() {
      this.loaded = false;
  
      try {
        const response = await fetch('http://localhost:5243/api/Vehiculo/Count');
        const data = await response.json();
  
        // Transforma los datos en el formato adecuado para vue-chartjs
        this.chartData = {
          labels: data.map(item => item.marca),
          datasets: [
            {
              label: 'Cantidad',
              backgroundColor: 'rgba(54, 162, 235, 0.4)', // Azul claro
              borderColor: 'rgba(54, 162, 235, 1)', // Azul oscuro
              borderWidth: 1,
              data: data.map(item => item.cantidad)
            }
          ]
        };
  
        this.loaded = true;
      } catch (error) {
        console.error(error);
      }
    }
  };
  </script>