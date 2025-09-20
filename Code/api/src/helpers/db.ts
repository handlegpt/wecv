import { appConfig } from "../config";
import { MongoClient } from 'mongodb';

// 使用环境变量中的完整连接字符串
const uri = process.env.DB_HOST || `mongodb+srv://aravin:${appConfig.db.password}@resumetree-cluster-1.cwfik.mongodb.net/${appConfig.db.name}?retryWrites=true&w=majority`;

export const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true } as any);

// 连接数据库
db.connect()
    .then(() => console.log('WeCV AI DB Connection Successful.'))
    .catch(err => {
        console.error('WeCV AI DB Connection Failed:', err.message);
        console.error('Connection URI:', uri.replace(/\/\/.*@/, '//***:***@')); // 隐藏密码
    });

