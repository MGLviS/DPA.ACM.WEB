
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'vehiculo', component: () => import('pages/GestionVehiculo.vue') },
      { path: 'inventario', component: () => import('pages/GestionInventario.vue') },
      { path: 'reporte', component: () => import('pages/ReporteACM.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
