# Países App — Actualización a Versión Móvil (React Native)

Este proyecto contiene la versión completamente adaptada a móvil de la aplicación de gestión de países.
La actualización transforma la versión previa (web) en una experiencia nativa mediante React Native + Expo, 
manteniendo toda la lógica de negocio y consumo de servicios desde el backend que se encuentra en un repositorio separado.

## ¿Qué es esta actualización?

Esta actualización consiste en:

✔️ Adaptación total a interfaz móvil
- Componentes nativos (Inputs, Dropdowns, Lists, Cards).
- Diseño responsivo y navegación mediante @react-navigation/native.
- Manejo de estados globales con Context API.

✔️ Integración completa con el backend existente
- La app móvil no contiene los servicios HTTP dentro de este repo.
- Todos los endpoints (crear país, listar, editar, borrar, cargar catálogos, login) se consumen desde el backend en:
🔗 Backend (Laravel + MySQL):
https://github.com/DanyH2002/paises-services

✔️ Nuevas funcionalidades añadidas en esta versión
- Autenticación real con token guardados en AsyncStorage.
- Dropdown dinámico conectado.
- Ver / editar país con formularios dinámicos.
- Subida de imágenes (banderas) mediante Expo ImagePicker.

## Cómo ejecutar el proyecto (desde cero)
1️⃣ Clonar este repositorio

    git clone https://github.com/DanyH2002/Pais_vm_rn.git
    cd Pais_vm_rn

2️⃣ Levantar el backend con Docker
El backend está en:

🔗 https://github.com/DanyH2002/paises-services

Pasos:

      git clone https://github.com/DanyH2002/paises-services
      cd paises-services
      docker-compose up -d

Se debe crear el acrhivo .env con los datos del conetendos para establecer la conexión.
Se debe ejecutar 
      
      php artisan serve

El backend quedará corriendo en:

    http://127.0.0.1:8000

3️⃣ Instalar dependencias del proyecto móvil

En el repo móvil:

    npm install

4️⃣ Ejecutar la app en Expo

    npx expo start


Podrás correrlo en:
- iOS Simulator 
- Android Emulator

## Dependencias principales usadas
 - Frontend (móvil)
     - React Native
     - Axios
     - AsyncStorage
     - React Navigation
     - Expo ImagePicker
     - Context API

- Backend (repo separado)
    - Laravel 
    - MySQL
    - Docker & Docker Compose
    - Autenticación con token

### Estado actual del proyecto
- Autenticación funcional
- Vistas conectadas al contexto
- CRUD completo de países
- Dropdowns dinámicos 
- Manejo de imágenes
- Adaptado completamente a móvil
