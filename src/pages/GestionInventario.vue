<template>
    <div class="inventario-page">
        <div class="titulo"><h5>GESTIÓN INVENTARIO</h5></div>
        <InventarioAdd ref="InventarioAdd" />
        <div class="agregar"><q-btn @click="agregarv" color="blue" icon="add" label="Añadir Inventario" /></div>
        <br/>
        <div class="tabla"><InventarioTabla /></div>
    </div>  
</template>



<style>

.inventario-page{

    justify-content: space-between;
    position: sticky;
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

import InventarioTabla from 'src/components/Inventario/InventarioTabla.vue';
import InventarioAdd from 'src/components/Inventario/InventarioAdd.vue'

export default {
    name: "GestionInventario",
    components: {
        InventarioTabla,
        InventarioAdd
    },

    methods: {
        agregarv(){
            this.$refs.InventarioAdd.abrirModalnuevoIn();
        }
    }
}

</script>