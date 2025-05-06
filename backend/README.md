# Backend en NEST

### Pasos para desplegar el backend
1. Instalar dependencias Node: `npm i`
2. Instalar CLI Nest: `npm i -g @nestjs/cli`
3. Instalar paquete Nest gestion Mongodb: `npm i @nestjs/mongoose mongoose`
4. Instalar paquete Nest variables de entorno: `npm i @nestjs/config`
5. Instalar paquetes class-validator y class-transformer:`npm i class-validator class-transformer`
6. Instalar paquete hasheo:`npm i bcryptjs`
7. Instalar paquete tipado de hasheo:`npm i --save-dev @types/bcryptjs`
8. Crear imagen BD en docker: `docker compose up -d`
9. Lanzamos el backend con el comando: `npm run start:dev`
10. Utilizamos MongoCompass para visualizar la base de datos, `URI: mongodb://localhost:27017`
