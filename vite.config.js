// Escribe la configuración del proyecto
import { defineConfig } from 'vite'
// Importación del plugin de Vue, que permite que Vite entienda los archivos .vue
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Activación del plugin de Vue para poder usar componentes .vue en el proyecto
  plugins: [vue()],
})