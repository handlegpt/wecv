#!/bin/bash

# WeCV AI Startup Script
# Supports one-click deployment for development and production environments

set -e

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored messages
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
    echo -e "${BLUE}    WeCV AI Startup Script${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed, please install Docker first"
        print_message "Installation guide: https://docs.docker.com/get-docker/"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed, please install Docker Compose first"
        print_message "Installation guide: https://docs.docker.com/compose/install/"
        exit 1
    fi
    
    # Check if Docker service is running
    if ! docker info &> /dev/null; then
        print_error "Docker service is not running, please start Docker service"
        exit 1
    fi
    
    print_message "Docker environment check passed"
}

# Check environment files
check_env_files() {
    if [ ! -f ".env" ]; then
        print_warning "No .env file found, creating..."
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_message "Created .env file from .env.example"
            print_warning "Please edit .env file to configure your environment variables"
        else
            print_error "No .env.example file found"
            exit 1
        fi
    fi
    
    if [ ! -f ".env.prod" ]; then
        print_warning "No .env.prod file found, creating..."
        if [ -f ".env.prod.example" ]; then
            cp .env.prod.example .env.prod
            print_message "Created .env.prod file from .env.prod.example"
            print_warning "Please edit .env.prod file to configure production environment variables"
        fi
    fi
}

# Wait for service to start
wait_for_service() {
    local service=$1
    local port=$2
    local max_attempts=30
    local attempt=1
    
    print_message "Waiting for $service service to start..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "http://localhost:$port" > /dev/null 2>&1; then
            print_message "$service service is started"
            return 0
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "$service service startup timeout"
    return 1
}

# Start development environment
start_dev() {
    print_message "Starting development environment..."
    
    # Stop existing services
    docker-compose down 2>/dev/null || true
    
    # Start base services
    print_message "Starting database and Redis services..."
    docker-compose up -d db redis
    
    # Wait for database to start
    print_message "Waiting for database to start..."
    sleep 15
    
    # Check database connection
    if ! docker-compose exec -T db pg_isready -U postgres; then
        print_error "Database startup failed"
        docker-compose logs db
        exit 1
    fi
    
    # Run database migration
    print_message "Running database migration..."
    docker-compose exec -T db psql -U postgres -d wecv_ai -c "SELECT 1;" 2>/dev/null || {
        print_message "Creating database..."
        docker-compose exec -T db createdb -U postgres wecv_ai 2>/dev/null || true
    }
    
    # Start backend service
    print_message "Starting backend service..."
    docker-compose up -d backend
    
    # Wait for backend to start
    print_message "Waiting for backend service to start..."
    sleep 10
    
    # Run Prisma migration
    print_message "Running Prisma migration..."
    docker-compose exec -T backend npx prisma migrate deploy || {
        print_warning "Prisma migration failed, trying to initialize..."
        docker-compose exec -T backend npx prisma migrate dev --name init || true
    }
    
    # Start frontend service
    print_message "Starting frontend service..."
    docker-compose up -d frontend
    
    # Wait for services to start
    wait_for_service "Frontend" 3000 &
    wait_for_service "Backend" 3001 &
    wait
    
    print_message "Development environment startup completed!"
    print_message "Frontend URL: http://localhost:3000"
    print_message "Backend API: http://localhost:3001"
    print_message "Health check: http://localhost:3001/api/health"
    print_message "Database: localhost:5432"
    print_message "Redis: localhost:6379"
}

# Start production environment
start_prod() {
    print_message "Starting production environment..."
    
    # Check production environment configuration
    if [ ! -f ".env.prod" ]; then
        print_error "Production environment configuration file .env.prod not found"
        exit 1
    fi
    
    # Check required environment variables
    source .env.prod
    if [ -z "$JWT_SECRET" ] || [ "$JWT_SECRET" = "your_very_secure_jwt_secret_key_wecv_ai_2024" ]; then
        print_error "Please set a secure JWT_SECRET in the production environment configuration file"
        exit 1
    fi
    
    if [ -z "$OPENAI_API_KEY" ] || [ "$OPENAI_API_KEY" = "your_openai_api_key_here" ]; then
        print_warning "OpenAI API Key not set, AI features will be unavailable"
    fi
    
    # Stop existing services
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    
    # Start with production environment configuration
    docker-compose -f docker-compose.prod.yml up -d
    
    print_message "Production environment startup completed!"
    print_message "Please ensure domain and SSL certificates are configured"
    print_message "Check service status: $0 status"
}

# Stop services
stop_services() {
    print_message "Stopping all services..."
    docker-compose down 2>/dev/null || true
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    print_message "Services stopped"
}

# View service status
status() {
    print_message "Viewing development environment service status..."
    docker-compose ps
    echo ""
    print_message "Viewing production environment service status..."
    docker-compose -f docker-compose.prod.yml ps
    echo ""
    print_message "Viewing container resource usage..."
    docker stats --no-stream
}

# View logs
logs() {
    if [ "$1" = "prod" ]; then
        print_message "Viewing production environment logs..."
        docker-compose -f docker-compose.prod.yml logs -f
    else
        print_message "Viewing development environment logs..."
        docker-compose logs -f
    fi
}

# Restart services
restart() {
    if [ "$1" = "prod" ]; then
        print_message "Restarting production environment services..."
        docker-compose -f docker-compose.prod.yml restart
    else
        print_message "Restarting development environment services..."
        docker-compose restart
    fi
}

# Clean environment
clean() {
    print_warning "This will delete all containers and data, are you sure to continue? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_message "Cleaning environment..."
        docker-compose down -v 2>/dev/null || true
        docker-compose -f docker-compose.prod.yml down -v 2>/dev/null || true
        docker system prune -f
        print_message "Environment cleanup completed"
    else
        print_message "Cleanup operation cancelled"
    fi
}

# Show help information
show_help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  dev      Start development environment"
    echo "  prod     Start production environment"
    echo "  stop     Stop all services"
    echo "  restart  Restart services (optional parameter: prod)"
    echo "  status   View service status"
    echo "  logs     View logs (optional parameter: prod)"
    echo "  clean    Clean environment"
    echo "  help     Show this help information"
    echo ""
    echo "Examples:"
    echo "  $0 dev          # Start development environment"
    echo "  $0 prod         # Start production environment"
    echo "  $0 restart      # Restart development environment"
    echo "  $0 restart prod # Restart production environment"
    echo "  $0 logs         # View development environment logs"
    echo "  $0 logs prod    # View production environment logs"
}

# Main function
main() {
    print_header
    
    # Check Docker environment
    check_docker
    
    # Check environment files
    check_env_files
    
    # Parse command line arguments
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
        "restart")
            restart "$2"
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
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@" 