# Деплой SocialAutoWeb на бесплатные сервера

## 🚀 Railway (Backend + Database)

### 1. Регистрация
Зайдите на https://railway.app и зарегистрируйтесь через GitHub

### 2. Создание проекта
```bash
# Установите Railway CLI
npm install -g @railway/cli

# Войдите в аккаунт
railway login

# Инициализируйте проект (в папке backend)
cd /Users/nonnakomissarova/Desktop/jarveee/backend
railway init
railway add --database postgres
```

### 3. Настройте переменные окружения в Railway Dashboard:
- `NODE_ENV=production`
- `PORT=3000`
- `JWT_SECRET=your-super-secret-jwt-key-change-this`
- `DATABASE_URL` (автоматически создастся Railway)

### 4. Деплой backend:
```bash
cd /Users/nonnakomissarova/Desktop/jarveee/backend
railway up
```

После деплоя вы получите URL типа: `https://your-app.railway.app`

---

## 🌐 Vercel (Frontend)

### 1. Регистрация
Зайдите на https://vercel.com и зарегистрируйтесь через GitHub

### 2. Установка Vercel CLI:
```bash
npm install -g vercel
```

### 3. Деплой frontend:
```bash
cd /Users/nonnakomissarova/Desktop/jarveee/frontend
vercel
```

Следуйте инструкциям:
- Project name: socialauto-frontend
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

### 4. Настройте переменную окружения в Vercel Dashboard:
```
VITE_API_URL=https://your-backend-url.railway.app/api/v1
```

После изменения переменных, переделайте деплой:
```bash
vercel --prod
```

---

## ✅ После деплоя

Ваше приложение будет доступно по адресам:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.railway.app/api/v1`
- API Docs: `https://your-backend.railway.app/api/docs`

---

## 🔧 Альтернатива: Render (всё в одном месте)

Если хотите всё на одной платформе:

1. Зайдите на https://render.com
2. Создайте PostgreSQL базу данных (бесплатный план)
3. Создайте Web Service для backend:
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm run start:prod`
4. Создайте Static Site для frontend:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`

---

## 📝 Важно перед деплоем

Убедитесь что в `backend/.env` НЕТ чувствительных данных.
Все секреты настраиваются через dashboard хостинга!
