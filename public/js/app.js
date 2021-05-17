import 'core-js'
import 'regenerator-runtime/runtime'
import proyectos from './modulos/proyectos'
import tareas from './modulos/tareas'
import { actualizarAvance } from './funciones/avance'

document.addEventListener('DOMContentLoaded', () => actualizarAvance())
