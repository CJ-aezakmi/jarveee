const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function createDemoUser() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'socialauto',
    user: 'nonnakomissarova',
    password: '',
  });

  try {
    await client.connect();
    console.log('✅ Подключен к базе данных');

    // Хешируем пароль
    const password = 'demo1234';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Проверяем, существует ли уже демо-пользователь
    const checkResult = await client.query(
      'SELECT id FROM users WHERE email = $1',
      ['demo@socialauto.com']
    );

    if (checkResult.rows.length > 0) {
      console.log('⚠️  Демо-пользователь уже существует');
      
      // Обновляем пароль
      await client.query(
        'UPDATE users SET password = $1, "emailVerified" = true WHERE email = $2',
        [hashedPassword, 'demo@socialauto.com']
      );
      console.log('✅ Пароль демо-пользователя обновлен');
    } else {
      // Создаем нового пользователя
      const result = await client.query(
        `INSERT INTO users (
          email, password, "firstName", "lastName", role, 
          "subscriptionTier", "emailVerified", "isActive"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING id, email`,
        [
          'demo@socialauto.com',
          hashedPassword,
          'Demo',
          'User',
          'user',
          'premium',
          true,
          true
        ]
      );

      console.log('✅ Демо-пользователь создан:', result.rows[0]);
    }

    console.log('\n📧 Email: demo@socialauto.com');
    console.log('🔑 Пароль: demo1234');
    console.log('🎉 Подписка: Premium (без ограничений)\n');

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    await client.end();
  }
}

createDemoUser();
