# Uptask

Un proyecto simple para la creación de proyectos y tareas para cada proyecto.

Realizado en Node con Pug como motor de plantilla y usando MySql como base de datos.

Hace uso de varias variables de entorno para funcionar.

## Snapshots

![Iniciar sesion](/screenshots/login.png "Iniciar sesión")
![Crear cuenta](/screenshots/createaccount.png "Crear cuenta")
![Dashboard](/screenshots/admin.png "Panel principal")
![Nuevo proyecto](/screenshots/nuevo-proyecto.png "Nuevo proyecto")
![Tareas de un proyecto](/screenshots/tareas-proyecto.png "Tareas de un proyecto")

## Pasos

### Clonar repositorio **(gh CLI)**
```
gh repo clone norbix14/uptasknode uptask
```

### Ingresar al proyecto
```
cd uptask
```

### Instalar las dependencias necesarias
```
npm i
```

### Ejecutar la App en modo de desarrollo/producción
```
npm run development
```
```
npm run production
```

## Elementos necesarios

**Variables de entorno en un archivo _.env_**
```
# Para la base de datos en Mysql
BD_NOMBRE=""
BD_USER=""
BD_PASS=""
BD_HOST=""
BD_PORT=""

# Host local para el proyecto
HOST=""

# Session key
SESSION=""
```
