# Backend API Documentation

## Структура модулей

### Auth Module
Модуль аутентификации и авторизации пользователей.

**Сервисы:**
- JWT токены (access + refresh)
- Google OAuth
- 2FA (опционально)

### Users Module
Управление пользователями.

**Сущности:**
- User (пользователь)
- Роли: user, admin, moderator
- Тарифы: free, basic, premium, enterprise

### Accounts Module
Управление социальными аккаунтами.

**Платформы:**
- Instagram, Facebook, Twitter, LinkedIn, TikTok, Pinterest, YouTube, Tumblr, Quora, Reddit

**Статусы:**
- active, paused, banned, error, warming_up

### Campaigns Module
Управление маркетинговыми кампаниями.

**Типы:**
- follower_growth - рост подписчиков
- engagement - взаимодействие
- content_posting - публикация контента
- messaging - отправка сообщений
- scraping - сбор данных

### Tasks Module
Система задач и очередей.

**Типы задач:**
- follow, unfollow
- like, unlike
- comment, delete_comment
- post, delete_post
- direct_message
- story_view, reel_view
- share, save
- scrape

**Статусы:**
- pending, queued, processing, completed, failed, skipped, cancelled

### Automation Module
Автоматизация действий в социальных сетях.

**Сервисы:**
- InstagramAutomation
- FacebookAutomation
- TwitterAutomation
- (другие платформы)

**Технологии:**
- Puppeteer + Stealth Plugin
- Fingerprint spoofing
- Proxy rotation

### Analytics Module
Аналитика и статистика.

**Метрики:**
- Рост подписчиков
- Engagement rate
- Выполненные задачи
- Успешность кампаний

### Subscriptions Module
Управление подписками и платежами.

**Интеграции:**
- Stripe
- PayPal (планируется)

### Proxy Module
Управление прокси серверами.

**Типы:**
- HTTP, HTTPS, SOCKS5
- Ротация IP
- Проверка работоспособности

## База данных

### Таблицы:
1. **users** - пользователи
2. **social_accounts** - социальные аккаунты
3. **campaigns** - кампании
4. **tasks** - задачи
5. **subscriptions** - подписки

### Связи:
- User -> SocialAccount (1:N)
- User -> Campaign (1:N)
- User -> Subscription (1:N)
- SocialAccount -> Task (1:N)
- Campaign -> Task (1:N)

## Очереди (Bull)

### tasks
Обработка задач автоматизации.

**Jobs:**
- process-task - выполнение задачи
- retry-task - повтор при ошибке

### emails
Отправка email уведомлений.

### analytics
Сбор и обработка аналитики.

## Переменные окружения

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=socialauto

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
```

## Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run start:dev

# Сборка
npm run build

# Запуск в продакшн
npm run start:prod

# Миграции
npm run migration:generate
npm run migration:run
npm run migration:revert

# Тесты
npm test
npm run test:e2e
npm run test:cov

# Линтинг
npm run lint
npm run format
```

## Расширение функционала

### Добавление новой платформы

1. Создать сервис автоматизации в `src/modules/automation/services/`
2. Реализовать интерфейс с методами: `executeTask()`, `login()`, etc.
3. Зарегистрировать в `AutomationModule`
4. Добавить платформу в enum `SocialPlatform`

### Добавление нового типа задачи

1. Добавить тип в enum `TaskType`
2. Реализовать обработку в соответствующем сервисе автоматизации
3. Обновить `TaskProcessor`
