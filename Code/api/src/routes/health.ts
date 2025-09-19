import { Router, Request, Response } from 'express';

const router = Router();

// 健康检查端点
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// 就绪检查端点
router.get('/ready', (req: Request, res: Response) => {
  // 这里可以添加数据库连接检查等
  res.status(200).json({
    status: 'ready',
    timestamp: new Date().toISOString()
  });
});

export default router;
