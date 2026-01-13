#!/bin/bash

# После создания репозитория на github.com/new
# Замените YOUR_GITHUB_USERNAME на ваш настоящий username
# Затем выполните: bash GITHUB_SETUP.sh

# Удалим неправильный remote
git remote remove origin

# Добавим правильный (ЗАМЕНИТЕ YOUR_GITHUB_USERNAME!)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/socialauto.git

# Переименуем ветку в main
git branch -M main

# Запушим код
git push -u origin main

echo ""
echo "✅ Готово! Код загружен на GitHub"
echo "🌐 Теперь можно деплоить на Render.com"
