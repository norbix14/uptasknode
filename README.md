# Uptask

Un proyecto simple para la creación de proyectos y tareas para cada proyecto

Realizado en Node con Pug como motor de plantilla y usando MySql como base de datos

Hace uso de varias variables de entorno para funcionar

## Snapshots

![Iniciar sesion](/snapshots/login.png "Iniciar sesión")

![Crear cuenta](/snapshots/createaccount.png "Crear cuenta")

![Dashboard](/snapshots/admin.png "Panel principal")

![Nuevo proyecto](/snapshots/nuevo-proyecto.png "Nuevo proyecto")

![Tareas de un proyecto](/snapshots/tareas-proyecto.png "Tareas de un proyecto")

## Pasos

Clonar repositorio

		git clone <repository>

Instalar las dependencias necesarias

		npm i

Ejecutar la App en modo de desarrollo/produccion

		npm run development
		npm run production

## Elementos necesarios

**Variables de entorno**

		# Para la base de datos en Mysql
		BD_NOMBRE=""
		BD_USER=""
		BD_PASS=""
		BD_HOST="
		BD_PORT=""

		# Host local para el proyecto
		HOST=""

		# Sesion key
		SESSION=""
