# CRUD Empleados — React + Supabase + Vercel

## ✅ Qué hace este proyecto

- Registrar, editar y eliminar empleados
- Los datos se guardan en **Supabase** (PostgreSQL en la nube)
- El frontend React y la API están juntos en un solo proyecto
- Se despliega en **Vercel** (gratis)

---

## 📁 Estructura del proyecto

```
crud-empleados/
├── api/                     ← Backend (Serverless Functions de Vercel)
│   ├── employees.js         ← GET todos / POST crear
│   ├── create.js            ← POST /api/create
│   ├── update/
│   │   └── [id].js          ← PUT /api/update/:id
│   └── delete/
│       └── [id].js          ← DELETE /api/delete/:id
├── client/                  ← Frontend React
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── vercel.json              ← Configuración de Vercel
├── package.json
└── .env.example
```

---

## 🗄️ Paso 1 — Crear la tabla en Supabase

1. Ve a [supabase.com](https://supabase.com) → tu proyecto
2. Haz clic en **SQL Editor** (menú izquierdo)
3. Pega y ejecuta este SQL:

```sql
CREATE TABLE IF NOT EXISTS empleados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  edad INT DEFAULT 0,
  pais VARCHAR(255) NOT NULL,
  cargo VARCHAR(255) NOT NULL,
  anios INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔑 Paso 2 — Obtener tus credenciales de Supabase

1. En Supabase → **Settings** (engranaje) → **API**
2. Copia:
   - **Project URL** → es tu `SUPABASE_URL`
   - **service_role key** (en "Project API keys", no la `anon key`) → es tu `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ Nunca compartas la `service_role key` ni la metas en el frontend.

---

## 🚀 Paso 3 — Subir a GitHub

1. Crea un repositorio en [github.com](https://github.com) (puede ser privado)
2. Dentro de la carpeta `crud-empleados`, ejecuta:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/crud-empleados.git
git push -u origin main
```

---

## ▲ Paso 4 — Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub
2. Clic en **"Add New Project"**
3. Selecciona tu repositorio `crud-empleados`
4. En la configuración del proyecto:
   - **Framework Preset**: `Other` (no React, porque el build lo maneja `vercel.json`)
   - Deja todo lo demás como está
5. Clic en **"Deploy"** (va a fallar la primera vez porque faltan las variables)

---

## ⚙️ Paso 5 — Agregar las variables de entorno en Vercel

1. En tu proyecto de Vercel → **Settings** → **Environment Variables**
2. Agrega estas dos variables:

| Nombre | Valor |
|--------|-------|
| `SUPABASE_URL` | `https://TU_PROJECT_ID.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | `tu_service_role_key` |

3. Guarda y ve a **Deployments** → haz clic en los tres puntos del último deploy → **Redeploy**

---

## ✅ ¡Listo!

Tu app estará en `https://tu-proyecto.vercel.app`

Cada vez que hagas `git push`, Vercel desplegará automáticamente.

---

## 🧪 Probar localmente (opcional)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Crear archivo de variables locales
cp .env.example .env.local
# Edita .env.local con tus credenciales reales

# Instalar dependencias
npm install
cd client && npm install && cd ..

# Correr en local
vercel dev
```

La app corre en `http://localhost:3000`
