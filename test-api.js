const fetch = require('node-fetch');

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing WeCV AI API...\n');

  // Test health endpoint
  try {
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }

  // Test registration
  try {
    console.log('\n2. Testing registration...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123'
    };

    const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });

    const registerData = await registerResponse.json();
    
    if (registerResponse.ok) {
      console.log('✅ Registration successful:', registerData.message);
    } else {
      console.log('❌ Registration failed:', registerData.message);
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message);
  }

  // Test login
  try {
    console.log('\n3. Testing login...');
    const loginData = {
      email: 'test@example.com',
      password: 'testpassword123'
    };

    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    const loginResult = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log('✅ Login successful:', loginResult.message);
      console.log('Token received:', loginResult.token ? 'Yes' : 'No');
    } else {
      console.log('❌ Login failed:', loginResult.message);
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
  }

  console.log('\n🏁 API testing completed!');
}

// Run the test
testAPI().catch(console.error); 