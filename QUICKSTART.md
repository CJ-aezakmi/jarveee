# 🚀 Быстрый старт - SocialAutoWeb

## За 5 минут до первого запуска

### Способ 1: Docker (рекомендуется)

```bash
# 1. Склонируйте репозиторий
git clone <your-repo-url>
cd jarveee

# 2. Запустите все сервисы
docker-compose up -d

# 3. Подождите 30 секунд пока все сервисы запустятся

# 4. Откройте в браузере
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000/api/v1
# API Docs: http://localhost:3000/api/docs
```

**Готово! 🎉**

### Способ 2: Локальная установка

#### Требования
- Node.js 20+
- PostgreSQL 15+
- Redis 7+

#### Шаги

**1. Backend**
```bash
cd backend

# Установить зависимости
npm install

# Создать .env
cp .env.example .env

# Отредактировать .env (установите DB_HOST, DB_PASSWORD и т.д.)
nano .env

# Запустить
npm run start:dev
```

**2. Frontend (в новом терминале)**
```bash
cd frontend

# Установить зависимости
npm install

# Создать .env
echo "VITE_API_URL=http://localhost:3000/api/v1" > .env

# Запустить
npm run dev
```

**3. База данных**

Если у вас нет PostgreSQL:
```bash
# С Docker
docker run --name socialauto-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=socialauto \
  -p 5432:5432 \
  -d postgres:15-alpine

# С Homebrew (macOS)
brew install postgresql@15
brew services start postgresql@15
createdb socialauto
```

Если у вас нет Redis:
```bash
# С Docker
docker run --name socialauto-redis \
  -p 6379:6379 \
  -d redis:7-alpine

# С Homebrew (macOS)
brew install redis
brew services start redis
```

## Первые шаги после запуска

### 1. Зарегистрируйтесь

Откройте http://localhost:5173/register и создайте аккаунт.

### 2. Добавьте социальный аккаунт

1. Перейдите в раздел "Accounts"
2. Нажмите "Add Account"
3. Выберите платформу (например, Instagram)
4. Введите данные аккаунта

### 3. Создайте кампанию

1. Перейдите в "Campaigns"
2. Нажмите "Create Campaign"
3. Выберите тип кампании (например, "Follower Growth")
4. Настройте параметры:
   - Hashtags для таргетинга
   - Лимиты действий в день
   - Расписание

### 4. Запустите кампанию

1. Откройте созданную кампанию
2. Нажмите "Start"
3. Следите за прогрессом в разделе "Tasks"

## Тестовые данные

Для быстрого тестирования можно использовать:

```javascript
// Пример добавления аккаунта через API
POST http://localhost:3000/api/v1/accounts
Headers: Authorization: Bearer <your-token>
Body:
{
  "platform": "instagram",
  "username": "test_account",
  "credentials": {
    "email": "test@example.com",
    "password": "password123"
  }
}
```

## Проверка работы

### Backend
```bash
# Проверить здоровье API
curl http://localhost:3000/api/v1/health

# Посмотреть Swagger документацию
open http://localhost:3000/api/docs
```

### Frontend
```bash
# Открыть в браузере
open http://localhost:5173
```

### Database
```bash
# Подключиться к PostgreSQL
docker exec -it socialauto-postgres psql -U postgres -d socialauto

# Или без Docker
psql -U postgres -d socialauto

# Проверить таблицы
\dt
```

### Redis
```bash
# Подключиться к Redis
docker exec -it socialauto-redis redis-cli

# Или без Docker
redis-cli

# Проверить ключи
KEYS *
```

## Частые проблемы

### Backend не запускается

```bash
# Проверьте логи
docker logs socialauto-backend

# Проверьте подключение к БД
docker exec -it socialauto-postgres psql -U postgres -c "SELECT 1"

# Проверьте Redis
docker exec -it socialauto-redis redis-cli PING
```

### Frontend не открывается

```bash
# Проверьте логи
cd frontend
npm run dev

# Проверьте порт (должен быть свободен 5173)
lsof -i :5173
```

### CORS ошибки

Убедитесь что в `backend/.env`:
```
FRONTEND_URL=http://localhost:5173
```

### База данных не создается

```bash
# Создайте БД вручную
docker exec -it socialauto-postgres createdb -U postgres socialauto

# Запустите миграции
cd backend
npm run migration:run
```

## Следующие шаги

1. 📖 Прочитайте [README.md](README.md) для полной документации
2. 🔧 Изучите [Backend README](backend/README.md) для API
3. 🎨 Изучите [Frontend README](frontend/README.md) для UI
4. 🚀 Прочитайте [DEPLOYMENT.md](DEPLOYMENT.md) для продакшн деплоя

## Полезные команды

```bash
# Остановить все сервисы
docker-compose down

# Остановить и удалить volumes
docker-compose down -v

# Пересобрать и запустить
docker-compose up --build -d

# Посмотреть логи
docker-compose logs -f

# Войти в контейнер
docker exec -it socialauto-backend sh
```

## Нужна помощь?

- 📧 Email: support@socialauto.com
- 💬 Создайте issue на GitHub
- 📚 Прочитайте документацию

---

**Happy automating! 🤖✨**
