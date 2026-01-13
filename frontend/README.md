# Frontend Documentation

## Структура приложения

### Компоненты

#### Layout
Основной layout с sidebar навигацией.

**Секции:**
- Sidebar с навигацией
- Информация о пользователе
- Кнопка logout

### Страницы

#### Login (`/login`)
Страница входа в систему.

**Функционал:**
- Email/Password авторизация
- Валидация формы
- Redirect после успешного входа

#### Register (`/register`)
Страница регистрации.

**Функционал:**
- Создание аккаунта
- Валидация
- Автоматический вход после регистрации

#### Dashboard (`/`)
Главная страница с общей статистикой.

**Виджеты:**
- Количество аккаунтов
- Активные кампании
- Выполненные задачи
- Рост подписчиков

#### Accounts (`/accounts`)
Управление социальными аккаунтами.

**Функционал:**
- Список аккаунтов
- Добавление аккаунта
- Редактирование
- Удаление
- Статистика по аккаунту

#### Campaigns (`/campaigns`)
Управление кампаниями.

**Функционал:**
- Список кампаний
- Создание кампании
- Редактирование
- Удаление
- Статистика по кампании

#### Tasks (`/tasks`)
Просмотр и управление задачами.

**Функционал:**
- Список задач
- Фильтрация
- Статистика выполнения

#### Analytics (`/analytics`)
Аналитика и отчеты.

**Функционал (планируется):**
- Графики роста
- Engagement metrics
- Сравнение аккаунтов
- Экспорт данных

#### Settings (`/settings`)
Настройки профиля и приложения.

## Redux Store

### Slices

#### authSlice
Состояние аутентификации.

**State:**
```typescript
{
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
```

**Actions:**
- loginSuccess
- logout
- setLoading

#### accountsSlice
Управление аккаунтами.

**State:**
```typescript
{
  accounts: SocialAccount[];
  loading: boolean;
  error: string | null;
}
```

**Actions:**
- setAccounts
- addAccount
- updateAccount
- removeAccount

#### campaignsSlice
Управление кампаниями.

**State:**
```typescript
{
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
}
```

#### tasksSlice
Управление задачами.

**State:**
```typescript
{
  tasks: Task[];
  loading: boolean;
  statistics: TaskStatistics;
}
```

## API Сервисы

### authAPI
Аутентификация.

**Methods:**
- register(data)
- login(data)
- getProfile()
- refreshToken(token)

### accountsAPI
Работа с аккаунтами.

**Methods:**
- getAll()
- getOne(id)
- create(data)
- update(id, data)
- delete(id)

### campaignsAPI
Работа с кампаниями.

**Methods:**
- getAll()
- getOne(id)
- create(data)
- update(id, data)
- delete(id)

### tasksAPI
Работа с задачами.

**Methods:**
- getAll(params)
- getOne(id)
- create(data)
- getStatistics()

### analyticsAPI
Получение аналитики.

**Methods:**
- getDashboard()
- getAccountAnalytics(id, period)
- getCampaignAnalytics(id)

## Стилизация

### Tailwind CSS
Используется utility-first подход.

**Кастомные классы:**
```css
.btn-primary - основная кнопка
.btn-secondary - вторичная кнопка
.input - поле ввода
.card - карточка
```

**Цветовая палитра:**
- primary: оттенки синего
- success: зеленый
- warning: желтый
- error: красный

## Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшн
npm run build

# Preview продакшн сборки
npm run preview

# Линтинг
npm run lint
```

## Переменные окружения

Создайте файл `.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## Расширение функционала

### Добавление новой страницы

1. Создать компонент в `src/pages/`
2. Добавить route в `App.tsx`
3. Добавить ссылку в `Layout.tsx` (если нужна в навигации)

### Добавление нового API endpoint

1. Добавить метод в соответствующий API сервис (`src/services/api.ts`)
2. Использовать в компоненте

### Добавление нового Redux slice

1. Создать slice в `src/store/slices/`
2. Добавить reducer в store (`src/store/index.ts`)
3. Использовать через `useAppSelector` и `useAppDispatch`

## Best Practices

1. Использовать TypeScript для всех компонентов
2. Валидировать формы с Formik + Yup
3. Показывать loading states
4. Обрабатывать ошибки
5. Использовать toast уведомления
6. Кэшировать данные в Redux
7. Оптимизировать рендеринг (React.memo, useMemo, useCallback)
