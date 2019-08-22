Para correrlo es necesario configurar una conexión a un servidor (App.config > RestoContext) y correr tanto el API como el proyecto de react.

Una breve descripción del proyecto:
•El proyecto resto-react es un single-page que carga los datos del API en RestoAPI, si el API no está corriendo todo sale vacío.
•Todos los llamados desde react se hacen a HomeController en RestoAPI, quien llama las funciones del repositorio RestoRepo.
