# SocialAutoWeb Project Structure

Полная структура созданного проекта:

```
jarveee/
├── README.md                          # Основная документация
├── QUICKSTART.md                      # Инструкция по быстрому старту
├── DEPLOYMENT.md                      # Руководство по деплою
├── CONTRIBUTING.md                    # Правила контрибуции
├── SECURITY.md                        # Политика безопасности
├── LICENSE                            # Лицензия
├── docker-compose.yml                 # Docker Compose конфигурация
├── .dockerignore                      # Docker ignore файл
│
├── backend/                           # Backend (NestJS)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/                 # Модуль аутентификации
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── register.dto.ts
│   │   │   │   │   ├── login.dto.ts
│   │   │   │   │   └── refresh-token.dto.ts
│   │   │   │   └── strategies/
│   │   │   │       ├── jwt.strategy.ts
│   │   │   │       ├── local.strategy.ts
│   │   │   │       └── google.strategy.ts
│   │   │   │
│   │   │   ├── users/                # Модуль пользователей
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   └── entities/
│   │   │   │       └── user.entity.ts
│   │   │   │
│   │   │   ├── accounts/             # Модуль соц. аккаунтов
│   │   │   │   ├── accounts.module.ts
│   │   │   │   ├── accounts.service.ts
│   │   │   │   ├── accounts.controller.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── account.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-account.dto.ts
│   │   │   │       └── update-account.dto.ts
│   │   │   │
│   │   │   ├── campaigns/            # Модуль кампаний
│   │   │   │   ├── campaigns.module.ts
│   │   │   │   ├── campaigns.service.ts
│   │   │   │   ├── campaigns.controller.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── campaign.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-campaign.dto.ts
│   │   │   │       └── update-campaign.dto.ts
│   │   │   │
│   │   │   ├── tasks/                # Модуль задач
│   │   │   │   ├── tasks.module.ts
│   │   │   │   ├── tasks.service.ts
│   │   │   │   ├── tasks.controller.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── task.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   └── create-task.dto.ts
│   │   │   │   └── processors/
│   │   │   │       └── task.processor.ts
│   │   │   │
│   │   │   ├── automation/           # Модуль автоматизации
│   │   │   │   ├── automation.module.ts
│   │   │   │   ├── automation.service.ts
│   │   │   │   └── services/
│   │   │   │       ├── instagram.automation.ts
│   │   │   │       ├── facebook.automation.ts
│   │   │   │       └── twitter.automation.ts
│   │   │   │
│   │   │   ├── analytics/            # Модуль аналитики
│   │   │   │   ├── analytics.module.ts
│   │   │   │   ├── analytics.service.ts
│   │   │   │   └── analytics.controller.ts
│   │   │   │
│   │   │   ├── subscriptions/        # Модуль подписок
│   │   │   │   ├── subscriptions.module.ts
│   │   │   │   ├── subscriptions.service.ts
│   │   │   │   ├── subscriptions.controller.ts
│   │   │   │   └── entities/
│   │   │   │       └── subscription.entity.ts
│   │   │   │
│   │   │   └── proxy/                # Модуль прокси
│   │   │       ├── proxy.module.ts
│   │   │       └── proxy.service.ts
│   │   │
│   │   ├── app.module.ts             # Главный модуль
│   │   └── main.ts                   # Точка входа
│   │
│   ├── package.json                  # Зависимости
│   ├── tsconfig.json                 # TypeScript конфиг
│   ├── nest-cli.json                 # NestJS CLI конфиг
│   ├── .env.example                  # Пример переменных окружения
│   ├── .eslintrc.js                  # ESLint конфиг
│   ├── .prettierrc                   # Prettier конфиг
│   ├── .gitignore                    # Git ignore
│   ├── Dockerfile                    # Docker образ
│   └── README.md                     # Backend документация
│
├── frontend/                          # Frontend (React)
│   ├── src/
│   │   ├── components/               # React компоненты
│   │   │   └── Layout.tsx
│   │   │
│   │   ├── pages/                    # Страницы
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Accounts.tsx
│   │   │   ├── Campaigns.tsx
│   │   │   ├── Tasks.tsx
│   │   │   ├── Analytics.tsx
│   │   │   └── Settings.tsx
│   │   │
│   │   ├── store/                    # Redux store
│   │   │   ├── index.ts
│   │   │   └── slices/
│   │   │       ├── authSlice.ts
│   │   │       ├── accountsSlice.ts
│   │   │       ├── campaignsSlice.ts
│   │   │       └── tasksSlice.ts
│   │   │
│   │   ├── services/                 # API сервисы
│   │   │   └── api.ts
│   │   │
│   │   ├── hooks/                    # Custom hooks
│   │   │   └── redux.ts
│   │   │
│   │   ├── App.tsx                   # Главный компонент
│   │   ├── main.tsx                  # Точка входа
│   │   └── index.css                 # Глобальные стили
│   │
│   ├── public/                       # Публичные файлы
│   ├── index.html                    # HTML шаблон
│   ├── package.json                  # Зависимости
│   ├── tsconfig.json                 # TypeScript конфиг
│   ├── tsconfig.node.json            # Node TypeScript конфиг
│   ├── vite.config.ts                # Vite конфиг
│   ├── tailwind.config.js            # Tailwind CSS конфиг
│   ├── postcss.config.js             # PostCSS конфиг
│   ├── .env.example                  # Пример переменных окружения
│   ├── .gitignore                    # Git ignore
│   ├── Dockerfile                    # Docker образ (dev)
│   ├── Dockerfile.prod               # Docker образ (prod)
│   └── README.md                     # Frontend документация
│
└── .git/                             # Git репозиторий
```

## Ключевые файлы и их назначение

### Backend

**main.ts** - Точка входа приложения, настройка NestJS, CORS, Swagger
**app.module.ts** - Главный модуль с импортами всех фич-модулей
***.entity.ts** - TypeORM сущности для работы с БД
***.dto.ts** - Data Transfer Objects для валидации входных данных
***.service.ts** - Бизнес-логика
***.controller.ts** - HTTP endpoints
***.module.ts** - NestJS модули

### Frontend

**main.tsx** - Точка входа React приложения
**App.tsx** - Главный компонент с роутингом
**Layout.tsx** - Основной layout с навигацией
**store/** - Redux store и slices
**services/api.ts** - Axios клиент для API запросов
**pages/** - Страницы приложения

### Конфигурация

**docker-compose.yml** - Оркестрация сервисов (PostgreSQL, Redis, Backend, Frontend)
**Dockerfile** - Docker образы для каждого сервиса
**.env.example** - Пример переменных окружения

## Технологии

### Backend Stack
- NestJS 10.3 (Node.js фреймворк)
- TypeScript 5.3
- PostgreSQL 15 (основная БД)
- TypeORM 0.3 (ORM)
- Redis 4.6 (кэш и очереди)
- Bull 4.12 (фоновые задачи)
- Passport + JWT (аутентификация)
- Swagger (API документация)
- Puppeteer (автоматизация браузера)

### Frontend Stack
- React 18.2
- TypeScript 5.3
- Redux Toolkit 2.0 (state management)
- React Router 6.21 (роутинг)
- Tailwind CSS 3.4 (стилизация)
- Axios 1.6 (HTTP клиент)
- Formik + Yup (формы)
- Chart.js (графики)

### DevOps
- Docker & Docker Compose
- Nginx (reverse proxy)
- Let's Encrypt (SSL)

## Статистика проекта

- **Всего файлов**: 70+
- **Строк кода**: ~6000+
- **Модулей Backend**: 9
- **Страниц Frontend**: 7
- **API Endpoints**: 30+
- **Поддерживаемых платформ**: 10

## Основные возможности

✅ Полная аутентификация (JWT + Google OAuth)
✅ Управление социальными аккаунтами
✅ Создание и управление кампаниями
✅ Система задач с очередями
✅ Автоматизация для Instagram, Facebook, Twitter
✅ Аналитика и статистика
✅ Система подписок
✅ Прокси поддержка
✅ Docker деплой
✅ API документация (Swagger)
✅ Адаптивный UI
✅ TypeScript везде
