<script setup>
import { ref, computed } from 'vue'

// Datos reactivos del componente
const listaTareas = ref([
  {id: 1, titulo: 'Lavar o guardar los platos', completada: true, fechaCreacion: '17/10/2026'},
  {id: 2, titulo: 'Sacar la basura', completada: false, fechaCreacion: '17/10/2026'},
  {id: 3, titulo: 'Hacer la cama', completada: true, fechaCreacion: '17/10/2026'},
  {id: 4, titulo: 'Responder un correo', completada: false, fechaCreacion: '17/10/2026'}
])

// Texto que el usuario escribe en el input con v-model
const textoNuevaTarea = ref('')

// Casilla "Mostra només pendents" con v-model
const soloPendientes = ref(false)

// Para mostrar un aviso si intenta añadir una tarea vacía con v-show
const mostrarAviso = ref(false)

// Contador para dar un id distinto a cada tarea nueva
let siguienteId = listaTareas.value.length + 1


// Propiedades computed

// Todas o solo las pendientes según la casilla
const tareasVisibles = computed(() => {
  if(soloPendientes.value) return listaTareas.value.filter((tarea) => !tarea.completada)
  return listaTareas.value
})

// Número total de tareas
const totalTareas = computed(() => listaTareas.value.length)

// Número de tareas que aún no están completadas
const totalPendientes = computed(() => {
  return listaTareas.value.filter((tarea) => !tarea.completada).length
})


// Funciones del componente

// Añade una tarea nueva a la lista
function agregarTarea() {
  const titulo = textoNuevaTarea.value.trim() // quito espacios de los lados

  // Si está vacío no se añade y se enseña el aviso
  if(titulo === '') {
    mostrarAviso.value = true
    return
  }

  listaTareas.value.push({id: siguienteId, titulo: titulo, completada: false, fechaCreacion: new Date().toLocaleDateString('ca-ES')})

  siguienteId++
  textoNuevaTarea.value = ''
  mostrarAviso.value = false
}

// Cambia entre completada y pendiente
function cambiarEstado(tarea) {
  tarea.completada = !tarea.completada
}

// Elimina la tarea que tenga ese id
function eliminarTarea(idTarea) {
  listaTareas.value = listaTareas.value.filter((tarea) => tarea.id !== idTarea)
}
</script>

<template>
  <div class="gestor">
    <h1>Gestor de Tasques</h1>

    <!-- Input para escribir y el botón para añadir -->
    <div class="formulario">
      <input v-model="textoNuevaTarea" type="text" placeholder="Escriu una nova tasca"/>
      <button @click="agregarTarea">Afegir</button>
    </div>

    <!-- Solo se oculta y se muestra con v-show -->
    <p v-show="mostrarAviso" class="aviso">Has d'escriure un títol per a la tasca</p>

    <!-- Filtro de pendientes -->
    <label class="filtro">
      <input v-model="soloPendientes" type="checkbox"/>
      Mostra només pendents
    </label>

    <!-- Si hay tareas o no -->
    <ul v-if="tareasVisibles.length > 0" class="lista">
      <li v-for="tarea in tareasVisibles" :key="tarea.id">
        <!-- Aplicar filtro para tachar -->
        <span :class="{tachada: tarea.completada}">{{tarea.titulo}}</span>
        <span class="fecha">({{tarea.fechaCreacion}})</span>

        <button @click="cambiarEstado(tarea)">
          <span v-if="tarea.completada">Desmarcar</span>
          <span v-else>Completar</span>
        </button>
        <button @click="eliminarTarea(tarea.id)" title="Eliminar tasca">🗑️</button>
      </li>
    </ul>
    <p v-else class="vacio">No hi ha tasques per mostrar</p>

    <p class="resumen">Total: {{totalTareas}} | Pendents: {{totalPendientes}}</p>
  </div>
</template>

<style scoped src="./TaskApp.css"></style>