# Deployment Guide

## Production Deployment

### 1. Подготовка сервера

Требования:
- Ubuntu 20.04+ или другая Linux система
- Docker и Docker Compose
- Nginx (для reverse proxy)
- SSL сертификат (Let's Encrypt)

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
# Production settings
NODE_ENV=production
PORT=3000

# Database (используйте managed PostgreSQL)
DB_HOST=your-db-host.com
DB_PORT=5432
DB_USERNAME=your-db-user
DB_PASSWORD=strong-password-here
DB_DATABASE=socialauto_prod

# Redis (используйте managed Redis)
REDIS_HOST=your-redis-host.com
REDIS_PORT=6379
REDIS_PASSWORD=redis-password-here

# JWT (сгенерируйте надежные ключи)
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRATION=30d

# Google OAuth
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
GOOGLE_CALLBACK_URL=https://api.yourdomain.com/api/v1/auth/google/callback

# Stripe
STRIPE_SECRET_KEY=sk_live_your-live-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email (используйте SendGrid, AWS SES или другой сервис)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# API
API_PREFIX=api/v1
```

### 3. Docker Compose для продакшн

Создайте `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: socialauto-backend-prod
    restart: unless-stopped
    env_file: .env
    networks:
      - socialauto-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    container_name: socialauto-frontend-prod
    restart: unless-stopped
    networks:
      - socialauto-network

  nginx:
    image: nginx:alpine
    container_name: socialauto-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - backend
      - frontend
    networks:
      - socialauto-network

networks:
  socialauto-network:
    driver: bridge
```

### 4. Nginx конфигурация

Создайте `nginx/nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:3000;
    }

    upstream frontend {
        server frontend:5173;
    }

    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        # Backend API
        location /api {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### 5. Frontend Production Dockerfile

Создайте `frontend/Dockerfile.prod`:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 6. Деплой

```bash
# На сервере
git clone your-repository
cd jarveee

# Создать .env файл с production настройками
nano .env

# Запустить
docker-compose -f docker-compose.prod.yml up -d

# Проверить логи
docker-compose -f docker-compose.prod.yml logs -f
```

### 7. SSL сертификат (Let's Encrypt)

```bash
# Установить certbot
sudo apt install certbot

# Получить сертификат
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Скопировать сертификаты
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/

# Перезапустить nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

### 8. Настройка БД

```bash
# Войти в контейнер backend
docker exec -it socialauto-backend-prod sh

# Запустить миграции
npm run migration:run
```

### 9. Мониторинг

Рекомендуемые инструменты:
- **PM2** - для управления процессами
- **Sentry** - для отслеживания ошибок
- **DataDog / New Relic** - для мониторинга производительности
- **Grafana + Prometheus** - для метрик

### 10. Бэкапы

Настройте автоматические бэкапы:
- PostgreSQL database
- Redis data
- Uploaded files
- Конфигурационные файлы

```bash
# Пример бэкапа PostgreSQL
docker exec socialauto-postgres pg_dump -U postgres socialauto_prod > backup_$(date +%Y%m%d).sql
```

### 11. Security Checklist

- [ ] Изменены все секретные ключи
- [ ] Настроен firewall (UFW)
- [ ] Включен fail2ban
- [ ] SSL сертификат установлен
- [ ] CORS правильно настроен
- [ ] Rate limiting включен
- [ ] Логи ротируются
- [ ] Регулярные обновления безопасности
- [ ] Бэкапы настроены

### 12. Performance Optimization

- Используйте CDN для статических файлов
- Включите gzip сжатие
- Настройте кэширование
- Используйте connection pooling для БД
- Масштабируйте horizontally при необходимости

### 13. Scaling

Для высоких нагрузок:
- Используйте Kubernetes для оркестрации
- Настройте load balancer
- Разделите БД (read replicas)
- Используйте message queue (RabbitMQ)
- Кэшируйте часто запрашиваемые данные
