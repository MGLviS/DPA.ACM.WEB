<template>
    <div class="vehiculo-page">
        <div class="titulo"><h5>GESTIÓN VEHÍCULO</h5></div>

        <div class="agregar">Agregar</div>
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

export default {
    name: "GestionVehiculo",
    components: {
        VehiculoTabla
    }
}

</script>