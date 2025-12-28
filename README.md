🚀 Full-Stack Task Manager (Modern Stack)
📋 Descripción del Proyecto
Este proyecto es una aplicación de gestión de tareas (Task Manager) completa, desarrollada con un stack tecnológico moderno y enfocado en la calidad del código, la seguridad de tipos y una experiencia de usuario (UX) fluida.
Resuelve el problema común de la necesidad de una herramienta de productividad robusta, demostrando la capacidad de construir una aplicación Full-Stack escalable, desde la base de datos hasta la interfaz de usuario.

✨ Características Principales
CRUD Completo: Creación, lectura, actualización y eliminación de tareas.
Filtrado y Priorización: Funcionalidad para filtrar tareas por estado (pendiente/completado) y asignar niveles de prioridad.
Seguridad de Tipos (End-to-End): Uso riguroso de TypeScript en el frontend y backend para garantizar la consistencia y reducir errores en tiempo de ejecución.
Diseño Moderno y Responsivo: Interfaz de usuario construida con Tailwind CSS y componentes de Shadcn/ui para una estética profesional y adaptabilidad a cualquier dispositivo.
Gestión de Base de Datos Profesional: Uso de Prisma como ORM para una gestión de esquemas de base de datos eficiente y segura.

| Componente        | Tecnología                              | Propósito                                                               |
| :---------------- | :-------------------------------------- | :---------------------------------------------------------------------- |
| **Frontend**      | `React` + `Vite` + `TypeScript`         | Interfaz de usuario moderna y rápida.                                   |
| **Estilos/UI**    | `Tailwind CSS` + `Shadcn/ui`            | Estilizado atómico y componentes de UI accesibles.                      |
| **Backend (API)** | `Node.js` + `Express.js` + `TypeScript` | Servidor API RESTful robusto y tipado.                                  |
| **Base de Datos** | `PostgreSQL` (o `MySQL`)                | Persistencia de datos relacional.                                       |
| **ORM**           | `Prisma`                                | Abstracción de base de datos y migración de esquemas.                   |
| **Pruebas**       | `Jest` / `Vitest` (Ejemplo)             | Demostración de pruebas unitarias básicas en el *backend* o *frontend*. |
⚙️ Instalación y Configuración
Siga estos pasos para levantar el proyecto localmente.
1. Clonar el Repositorio
Bash
git clone https://github.com/cameraphp/fullstack-task-manager.git
cd fullstack-task-manager

2. Configuración del Backend (API )
Variables de Entorno: Cree un archivo .env en la carpeta /server y configure la conexión a su base de datos (ejemplo con PostgreSQL):
env
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanagerdb"
PORT=3000
Instalar Dependencias y Migrar DB:
Bash
cd server
npm install
npx prisma migrate dev --name init
Iniciar el Servidor:
Bash
npm run dev
# El servidor se iniciará en http://localhost:3000

3. Configuración del Frontend (Cliente )
Instalar Dependencias:
Bash
cd ../client # Asumiendo que el frontend está en una carpeta 'client'
npm install
Iniciar la Aplicación:
Bash
npm run dev

# La aplicación se abrirá en http://localhost:5173 (o similar )