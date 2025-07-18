#!/bin/bash

# WeCV AI 启动脚本
# 支持开发环境和生产环境一键部署

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}    WeCV AI 启动脚本${NC}"
    echo -e "${BLUE}================================${NC}"
}

# 检查Docker是否安装
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker 未安装，请先安装 Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose 未安装，请先安装 Docker Compose"
        exit 1
    fi
    
    print_message "Docker 环境检查通过"
}

# 检查环境文件
check_env_files() {
    if [ ! -f ".env" ]; then
        print_warning "未找到 .env 文件，正在创建..."
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_message "已从 .env.example 创建 .env 文件"
        else
            print_error "未找到 .env.example 文件"
            exit 1
        fi
    fi
    
    if [ ! -f ".env.prod" ]; then
        print_warning "未找到 .env.prod 文件，正在创建..."
        if [ -f ".env.prod.example" ]; then
            cp .env.prod.example .env.prod
            print_message "已从 .env.prod.example 创建 .env.prod 文件"
        fi
    fi
}

# 启动开发环境
start_dev() {
    print_message "启动开发环境..."
    
    # 启动基础服务
    docker-compose up -d postgres redis
    
    # 等待数据库启动
    print_message "等待数据库启动..."
    sleep 10
    
    # 运行数据库迁移
    print_message "运行数据库迁移..."
    docker-compose exec -T backend npx prisma migrate dev --name init
    
    # 启动所有服务
    print_message "启动所有服务..."
    docker-compose up -d
    
    print_message "开发环境启动完成！"
    print_message "前端地址: http://localhost:3000"
    print_message "后端API: http://localhost:3001"
    print_message "健康检查: http://localhost:3001/api/health"
}

# 启动生产环境
start_prod() {
    print_message "启动生产环境..."
    
    # 检查生产环境配置
    if [ ! -f ".env.prod" ]; then
        print_error "未找到生产环境配置文件 .env.prod"
        exit 1
    fi
    
    # 使用生产环境配置启动
    docker-compose -f docker-compose.prod.yml up -d
    
    print_message "生产环境启动完成！"
    print_message "请确保已配置域名和SSL证书"
}

# 停止服务
stop_services() {
    print_message "停止所有服务..."
    docker-compose down
    docker-compose -f docker-compose.prod.yml down
    print_message "服务已停止"
}

# 查看服务状态
status() {
    print_message "查看服务状态..."
    docker-compose ps
    echo ""
    print_message "查看生产环境状态..."
    docker-compose -f docker-compose.prod.yml ps
}

# 查看日志
logs() {
    if [ "$1" = "prod" ]; then
        print_message "查看生产环境日志..."
        docker-compose -f docker-compose.prod.yml logs -f
    else
        print_message "查看开发环境日志..."
        docker-compose logs -f
    fi
}

# 清理环境
clean() {
    print_warning "这将删除所有容器和数据，确定继续吗？(y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_message "清理环境..."
        docker-compose down -v
        docker-compose -f docker-compose.prod.yml down -v
        docker system prune -f
        print_message "环境清理完成"
    else
        print_message "取消清理操作"
    fi
}

# 显示帮助信息
show_help() {
    echo "用法: $0 [命令]"
    echo ""
    echo "命令:"
    echo "  dev     启动开发环境"
    echo "  prod    启动生产环境"
    echo "  stop    停止所有服务"
    echo "  status  查看服务状态"
    echo "  logs    查看日志 (可选参数: prod)"
    echo "  clean   清理环境"
    echo "  help    显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 dev          # 启动开发环境"
    echo "  $0 prod         # 启动生产环境"
    echo "  $0 logs         # 查看开发环境日志"
    echo "  $0 logs prod    # 查看生产环境日志"
}

# 主函数
main() {
    print_header
    
    # 检查Docker环境
    check_docker
    
    # 检查环境文件
    check_env_files
    
    # 解析命令行参数
    case "${1:-dev}" in
        "dev")
            start_dev
            ;;
        "prod")
            start_prod
            ;;
        "stop")
            stop_services
            ;;
        "status")
            status
            ;;
        "logs")
            logs "$2"
            ;;
        "clean")
            clean
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "未知命令: $1"
            show_help
            exit 1
            ;;
    esac
}

# 运行主函数
main "$@" 