const { MongoClient } = require('mongodb');

async function testConnection() {
    const uri = 'mongodb+srv://We_Cv20:kn3_L2@wecv.bwsuyab.mongodb.net/wecv_ai?retryWrites=true&w=majority&appName=wecv';
    
    console.log('Testing MongoDB connection...');
    console.log('URI:', uri.replace(/\/\/.*@/, '//***:***@')); // 隐藏密码
    
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('✅ MongoDB connection successful!');
        
        // 测试数据库操作
        const db = client.db('wecv_ai');
        const collections = await db.listCollections().toArray();
        console.log('📁 Available collections:', collections.map(c => c.name));
        
        await client.close();
        console.log('🔌 Connection closed');
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        if (error.code === 8000) {
            console.log('\n🔍 Troubleshooting tips:');
            console.log('1. Check if the username/password is correct');
            console.log('2. Verify the user has proper permissions');
            console.log('3. Ensure your IP is whitelisted in Network Access');
            console.log('4. Check if the database name is correct');
        }
    }
}

testConnection();
