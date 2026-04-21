# NexusTrade Core - Trading Intelligence Platform

A secure, scalable REST API with authentication and role-based access control, built with Spring Boot and React.

## 🚀 Features

### Backend (Primary Focus)
- ✅ **User Authentication**: JWT-based authentication with secure password hashing
- ✅ **Role-Based Access Control**: USER vs ADMIN roles with proper authorization
- ✅ **CRUD Operations**: Complete asset management with user-specific data isolation
- ✅ **API Versioning**: Clean `/api/v1/` versioning strategy
- ✅ **Error Handling**: Comprehensive global exception handling with proper HTTP status codes
- ✅ **Input Validation**: Bean validation with detailed error responses
- ✅ **API Documentation**: Swagger/OpenAPI 3.0 documentation
- ✅ **Database Schema**: PostgreSQL with JPA entities and relationships
- ✅ **Security Practices**: JWT token handling, password hashing, input sanitization

### Frontend (Supportive)
- ✅ **Modern React UI**: Built with React 18, Vite, and Tailwind CSS
- ✅ **Authentication Pages**: Login and registration with form validation
- ✅ **Protected Dashboard**: JWT-protected route with asset management
- ✅ **CRUD Interface**: Complete asset operations with real-time updates
- ✅ **Error Handling**: User-friendly error messages and success notifications
- ✅ **Professional Design**: Modern, responsive UI with gradient themes

### Security & Scalability
- ✅ **Secure JWT Handling**: Stateless authentication with proper token validation
- ✅ **Input Sanitization**: Bean validation and SQL injection prevention
- ✅ **Scalable Structure**: Modular architecture for easy extension
- ✅ **Admin Dashboard**: User management and system statistics
- ✅ **Rate Limiting**: Request throttling for API protection
- 🔄 **Logging**: Structured logging setup (bonus feature)
- 🔄 **Caching Layer**: Redis integration ready (bonus feature)
- 🔄 **Docker Support**: Containerization ready (bonus feature)

## 📋 API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User authentication

### Assets (`/api/v1/assets`)
- `GET /` - Get current user's assets
- `POST /` - Create new asset
- `GET /{id}` - Get specific asset
- `PUT /{id}` - Update asset
- `DELETE /{id}` - Delete asset

### Admin (`/api/v1/admin`) - ADMIN only
- `GET /users` - Get all users
- `GET /users/{id}` - Get specific user
- `PUT /users/{id}/role` - Update user role
- `DELETE /users/{id}` - Delete user
- `GET /stats` - Get system statistics

## 🛠️ Tech Stack

### Backend
- **Java 17** - Modern Java with latest features
- **Spring Boot 3.2.5** - Enterprise-grade framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database abstraction layer
- **PostgreSQL** - Robust relational database
- **JWT (io.jsonwebtoken)** - Stateless authentication
- **Maven** - Dependency management
- **Swagger/OpenAPI 3.0** - API documentation

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast development build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with JWT interceptor
- **Lucide React** - Modern icon library

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 16+
- PostgreSQL 13+

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Configure database (update application.yml)
# Update PostgreSQL connection string

# Run the application
./mvnw spring-boot:run
```

Backend will start on `http://localhost:8080`

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on `http://localhost:5173`

## 📋 **Local Development Setup**

### **Prerequisites**
- Java 17+
- Maven 3.6+
- Node.js 18+
- PostgreSQL (or use Neon)

### **Quick Start**
```bash
# Clone repository
git clone https://github.com/shambsinha/nexus-trade-core.git
cd nexus-trade-core

# Start backend
cd backend
./mvnw spring-boot:run

# Start frontend (new terminal)
cd frontend
npm install
npm run dev
```

### **Access URLs**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/v1
- Swagger UI: http://localhost:8080/swagger-ui.html
- Health Check: http://localhost:8080/api/v1/actuator/health

### **API Documentation**
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);
```

### Assets Table
```sql
CREATE TABLE assets (
    id BIGSERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    target_price DECIMAL(19,4) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔐 Security Features

### Authentication
- JWT-based stateless authentication
- Secure password hashing with BCrypt
- Token expiration management
- Automatic token refresh

### Authorization
- Role-based access control (USER/ADMIN)
- Method-level security annotations
- Resource ownership validation
- API endpoint protection

### Input Validation
- Bean validation for all DTOs
- SQL injection prevention
- XSS protection
- Request sanitization

## 📈 Scalability Considerations

### Current Architecture
- **Monolithic Design**: Single deployable unit
- **Stateless Authentication**: Easy horizontal scaling
- **Database Pooling**: Connection management
- **Caching Ready**: Redis integration points

### Future Scalability
- **Microservices**: Domain separation (Auth, Assets, Trading)
- **Load Balancing**: Multiple instance deployment
- **Database Sharding**: User data distribution
- **Caching Layer**: Redis for frequent queries
- **Message Queue**: Async processing with RabbitMQ/Kafka
- **Container Orchestration**: Kubernetes deployment

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/nexustrade
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRATION=86400000
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## 🐳 Docker Support (Bonus)

### Development Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/backend-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: nexustrade
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
  
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - postgres
```

## 📈 Performance Monitoring

### Logging
- Structured logging with SLF4J
- Request/response logging
- Error tracking
- Performance metrics

### Metrics (Future)
- Response time monitoring
- Database query performance
- Memory usage tracking
- API endpoint analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **Developer**: Backend Developer Intern
- **Email**: [your-email@example.com]
- **LinkedIn**: [your-profile-link]
- **GitHub**: [your-github-username]

---

**Note**: This project was developed as part of a backend developer internship assignment, demonstrating enterprise-grade development practices with focus on security, scalability, and maintainability.
