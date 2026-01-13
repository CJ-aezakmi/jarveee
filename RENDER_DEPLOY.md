# Быстрый деплой на Render.com (РЕКОМЕНДУЕТСЯ)

## Почему Render?
- ✅ Всё бесплатно (750 часов в месяц)
- ✅ Поддержка PostgreSQL
- ✅ Простой деплой через GitHub
- ✅ Автоматические SSL сертификаты
- ✅ Поддержка background workers

## Шаг 1: Подготовка репозитория

### Создайте репозиторий на GitHub:
```bash
cd /Users/nonnakomissarova/Desktop/jarveee
git init
git add .
git commit -m "Initial commit: SocialAutoWeb platform"

# Создайте новый репозиторий на github.com
# Затем:
git remote add origin https://github.com/ваш-username/socialauto.git
git branch -M main
git push -u origin main
```

## Шаг 2: Деплой на Render

### 1. Зарегистрируйтесь на https://render.com

### 2. Создайте PostgreSQL базу данных:
- Dashboard → New → PostgreSQL
- Name: `socialauto-db`
- Region: `Frankfurt (EU Central)`
- Plan: `Free`
- Нажмите "Create Database"
- **Сохраните "Internal Database URL"** - он понадобится!

### 3. Создайте Backend Web Service:
- Dashboard → New → Web Service
- Connect your GitHub repository: `socialauto`
- Name: `socialauto-backend`
- Region: `Frankfurt (EU Central)`
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Node`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start:prod`
- Plan: `Free`

### 4. Настройте Environment Variables для Backend:
```
NODE_ENV=production
PORT=10000
DATABASE_URL=[Internal Database URL из шага 2]
REDIS_HOST=redis-12345.c1.eu-central-1.ec2.redns.redis-cloud.com
REDIS_PORT=12345
JWT_SECRET=super-secret-jwt-key-change-this-please
API_PREFIX=api/v1
FRONTEND_URL=https://your-frontend.onrender.com
```

### 5. Создайте Redis (опционально, для продакшена):
- Можно использовать https://redis.com (бесплатно 30MB)
- Или пока закомментировать Bull queues в коде

### 6. Создайте Frontend Static Site:
- Dashboard → New → Static Site
- Connect same repository: `socialauto`
- Name: `socialauto-frontend`
- Branch: `main`
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

### 7. Environment Variables для Frontend:
```
VITE_API_URL=https://socialauto-backend.onrender.com/api/v1
```

### 8. После деплоя обновите FRONTEND_URL:
Вернитесь в настройки Backend и обновите:
```
FRONTEND_URL=https://socialauto-frontend.onrender.com
```

## Шаг 3: Проверка

Ваше приложение будет доступно:
- 🌐 Frontend: https://socialauto-frontend.onrender.com
- 🔧 Backend: https://socialauto-backend.onrender.com
- 📚 API Docs: https://socialauto-backend.onrender.com/api/docs

## Шаг 4: Создание первого пользователя

После успешного деплоя, создайте пользователя через API:

```bash
curl -X POST https://socialauto-backend.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@socialauto.com",
    "password": "Admin123!",
    "name": "Administrator"
  }'
```

## ⚠️ Важные замечания

### Бесплатный план Render:
- Сервис "засыпает" после 15 минут неактивности
- Первый запрос после сна займёт ~30-60 секунд
- 750 часов в месяц (достаточно для одного сервиса 24/7)

### Чтобы держать сервис активным:
Используйте cron-сервис (например, cron-job.org) для пинга каждые 10 минут:
```
GET https://socialauto-backend.onrender.com/api/docs
```

## 🚀 Альтернативы

Если нужна производительность получше:

### Vercel (Frontend) + Railway (Backend + DB)
- Frontend на Vercel: быстрее и надёжнее
- Backend на Railway: лучше для Node.js приложений
- Инструкции в [DEPLOY.md](./DEPLOY.md)

### Fly.io (Backend + DB) + Vercel (Frontend)
- Лучшая производительность
- Более сложная настройка
- $5/месяц за приличные ресурсы

## 📝 Troubleshooting

### Build failed в Render:
```bash
# Проверьте package.json
# Убедитесь что все dependencies на месте
npm install
npm run build
```

### Database connection failed:
- Проверьте что DATABASE_URL правильный
- Формат: `postgresql://user:password@host:port/database`
- Используйте "Internal Database URL" для backend

### CORS errors:
- Проверьте что FRONTEND_URL в backend environment совпадает с реальным URL frontend
- Frontend должен использовать правильный VITE_API_URL

---

**Готово!** После этих шагов у вас будет полностью рабочее приложение, доступное из любой точки мира! 🎉
