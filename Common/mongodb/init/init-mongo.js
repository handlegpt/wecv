// MongoDB 初始化脚本
db = db.getSiblingDB('wecv_ai');

// 创建用户
db.createUser({
  user: 'wecv_user',
  pwd: 'wecv_password',
  roles: [
    {
      role: 'readWrite',
      db: 'wecv_ai'
    }
  ]
});

// 创建集合
db.createCollection('users');
db.createCollection('resumes');
db.createCollection('templates');

// 创建索引
db.users.createIndex({ "email": 1 }, { unique: true });
db.resumes.createIndex({ "userId": 1 });
db.resumes.createIndex({ "createdAt": -1 });

print('WeCV AI 数据库初始化完成！');
