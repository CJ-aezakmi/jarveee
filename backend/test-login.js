const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function testLogin() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'socialauto',
    user: 'nonnakomissarova',
    password: '',
  });

  try {
    await client.connect();
    console.log('✅ Подключен к базе данных\n');

    // Получаем пользователя
    const result = await client.query(
      'SELECT id, email, password, "firstName", "lastName", "isActive" FROM users WHERE email = $1',
      ['demo@socialauto.com']
    );

    if (result.rows.length === 0) {
      console.log('❌ Пользователь не найден!');
      return;
    }

    const user = result.rows[0];
    console.log('👤 Найден пользователь:');
    console.log('   Email:', user.email);
    console.log('   Имя:', user.firstName, user.lastName);
    console.log('   Активен:', user.isActive);
    console.log('   Hash пароля:', user.password.substring(0, 20) + '...\n');

    // Проверяем пароль
    const testPassword = 'demo1234';
    const isValid = await bcrypt.compare(testPassword, user.password);
    
    console.log('🔐 Проверка пароля "demo1234":', isValid ? '✅ ВЕРНО' : '❌ НЕВЕРНО');
    
    if (!isValid) {
      console.log('\n🔄 Создаю новый хеш для пароля demo1234...');
      const newHash = await bcrypt.hash(testPassword, 10);
      
      await client.query(
        'UPDATE users SET password = $1 WHERE email = $2',
        [newHash, 'demo@socialauto.com']
      );
      
      console.log('✅ Пароль обновлен!');
      
      // Проверяем еще раз
      const checkResult = await client.query(
        'SELECT password FROM users WHERE email = $1',
        ['demo@socialauto.com']
      );
      
      const finalCheck = await bcrypt.compare(testPassword, checkResult.rows[0].password);
      console.log('🔐 Финальная проверка:', finalCheck ? '✅ РАБОТАЕТ' : '❌ НЕ РАБОТАЕТ');
    }

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    await client.end();
  }
}

testLogin();
