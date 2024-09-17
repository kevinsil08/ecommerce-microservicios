# e-commerce microservicios

### Versión node

Para asegurarte de la compatibilidad, asegúrate de estar utilizando Node versión 20 o superior. Puedes verificar la versión de Node.js ejecutando el siguiente comando en tu terminal:

```
node -v
```

Si tienes una versión inferior de Node.js instalada, por favor actualízala antes de ejecutar el comando mencionado anteriormente.

### Instalación de dependencias

Antes de ejecutar los comandos mencionados anteriormente, asegúrate de instalar todas las dependencias necesarias. Puedes hacerlo ejecutando el siguiente comando en la raíz del proyecto:

```
npm install
```

Esto instalará todas las dependencias especificadas en el archivo `package.json`.


### Comando para levantar los microservicios

Para levantar cada microservicio, puedes utilizar el siguiente comando en cada carpeta correspondiente:

```
npx nodemon src/index.ts
```

Esto iniciará el servidor para cada microservicio utilizando nodemon. Recuerda ejecutar este comando en cada carpeta de los microservicios.
