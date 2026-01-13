# Contributing Guidelines

## Как внести вклад

Мы рады вашему вкладу в проект! Вот как вы можете помочь:

### Процесс разработки

1. **Fork** репозитория
2. **Clone** форка на локальную машину
3. Создайте **новую ветку** для вашей фичи
4. Внесите изменения
5. **Commit** с понятным сообщением
6. **Push** в ваш fork
7. Создайте **Pull Request**

### Правила кода

#### Backend (NestJS)

```typescript
// Используйте TypeScript строго
// Плохо
function getUserData(id) {
  return this.usersService.findOne(id);
}

// Хорошо
async getUserData(id: string): Promise<User> {
  return this.usersService.findOne(id);
}

// Используйте decorators правильно
@Get(':id')
@ApiOperation({ summary: 'Get user by ID' })
async findOne(@Param('id') id: string): Promise<User> {
  return this.usersService.findOne(id);
}

// Обрабатывайте ошибки
try {
  const user = await this.usersService.findOne(id);
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user;
} catch (error) {
  this.logger.error(`Error finding user: ${error.message}`);
  throw error;
}
```

#### Frontend (React)

```typescript
// Используйте функциональные компоненты с hooks
import { useState, useEffect } from 'react';

// Хорошо
export default function MyComponent() {
  const [data, setData] = useState<Data[]>([]);
  
  useEffect(() => {
    loadData();
  }, []);
  
  return <div>{/* JSX */}</div>;
}

// Типизируйте props
interface Props {
  userId: string;
  onUpdate: (data: UserData) => void;
}

export default function UserProfile({ userId, onUpdate }: Props) {
  // ...
}

// Используйте custom hooks для переиспользуемой логики
function useUserData(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // load user
  }, [userId]);
  
  return { user, loading };
}
```

### Стиль кода

- **Отступы**: 2 пробела
- **Quotes**: одинарные кавычки
- **Semicolons**: обязательны
- **Naming**: camelCase для переменных, PascalCase для компонентов/классов
- **Комментарии**: на английском, JSDoc для функций

### Git Commit Messages

Следуйте Conventional Commits:

```
feat: добавлена поддержка TikTok автоматизации
fix: исправлена ошибка в обработке прокси
docs: обновлена документация API
style: форматирование кода
refactor: рефакторинг модуля аутентификации
test: добавлены тесты для TasksService
chore: обновлены зависимости
```

### Pull Request Guidelines

1. **Описание**: Четко опишите что и зачем
2. **Тесты**: Добавьте тесты для новых фич
3. **Документация**: Обновите README если нужно
4. **Размер**: Держите PR небольшими и фокусированными
5. **Code Review**: Будьте готовы к обсуждению

### Тестирование

```bash
# Backend тесты
cd backend
npm test
npm run test:e2e
npm run test:cov

# Frontend тесты (когда будут добавлены)
cd frontend
npm test
```

### Issue Guidelines

При создании issue:
- Используйте понятный заголовок
- Опишите проблему детально
- Приложите скриншоты если возможно
- Укажите версию, OS, браузер
- Добавьте шаги для воспроизведения

### Вопросы?

Если у вас есть вопросы, создайте issue с тегом `question`.

Спасибо за ваш вклад! 🎉
