<template>
    <div class="vehiculo-page">
        <div class="titulo"><h5>GESTIÓN VEHÍCULO</h5></div>
        <VehiculoAdd ref="VehiculoAdd" />
        <div class="agregar"><q-btn @click="agregarv" color="blue" icon="add" label="Añadir Vehiculo" /></div>
        <br/>
        <div class="tabla"><VehiculoTabla /></div>
    </div>  
</template>



<style>

.vehiculo-page{

    justify-content: space-between;
}
.titulo {
    text-align: center;
    width: 100%;
}

.agregar {
    text-align: left;
    margin-left: 2%;
}
.tabla {
    text-align: center;
    width: 100%;
}
</style>


<script>

import VehiculoTabla from 'src/components/Vehiculo/VehiculoTabla.vue';
import VehiculoAdd from 'src/components/Vehiculo/VehiculoAdd.vue'

export default {
    name: "GestionVehiculo",
    components: {
        VehiculoTabla,
        VehiculoAdd
    },

    methods: {
        agregarv(){
            this.$refs.VehiculoAdd.abrirModalnuevoV();
        }
    }
}

</script>