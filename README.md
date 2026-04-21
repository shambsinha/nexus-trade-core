# NexusTrade Core - Trading Intelligence Platform

A secure, scalable REST API with authentication and role-based access control, built with Spring Boot and React.

## 🌐 Live Deployment

| Service | URL |
|---------|-----|
| **Frontend** | [https://nexus-trade-core-edhjtxe1c-shambsinhas-projects.vercel.app](https://nexus-trade-core-edhjtxe1c-shambsinhas-projects.vercel.app) |
| **Backend API** | [https://nexus-trade-core.onrender.com/api/v1](https://nexus-trade-core.onrender.com/api/v1) |
| **Swagger UI** | [https://nexus-trade-core.onrender.com/swagger-ui.html](https://nexus-trade-core.onrender.com/swagger-ui.html) |
| **API Docs (JSON)** | [https://nexus-trade-core.onrender.com/v3/api-docs](https://nexus-trade-core.onrender.com/v3/api-docs) |

## 🚀 Features

### Backend (Primary Focus)
- ✅ **User Authentication**: JWT-based authentication with secure BCrypt password hashing
- ✅ **Role-Based Access Control**: USER vs ADMIN roles with method-level security
- ✅ **CRUD Operations**: Complete asset management with user-specific data isolation
- ✅ **API Versioning**: Clean `/api/v1/` versioning strategy
- ✅ **Error Handling**: Comprehensive global exception handling with proper HTTP status codes
- ✅ **Input Validation**: Bean validation with detailed error responses
- ✅ **API Documentation**: Swagger/OpenAPI 3.0 with JWT auth support
- ✅ **Database Schema**: PostgreSQL (Neon) with JPA entities and foreign key relationships
- ✅ **Security Practices**: JWT token handling, BCrypt hashing, CORS, input sanitization

### Frontend (Supportive)
- ✅ **Modern React UI**: Built with React 18, Vite, and Tailwind CSS
- ✅ **Authentication Pages**: Login and registration with form validation
- ✅ **Protected Dashboard**: JWT-protected route with asset management
- ✅ **CRUD Interface**: Complete asset operations with real-time updates
- ✅ **Error Handling**: User-friendly error messages and success notifications
- ✅ **Professional Design**: Modern, responsive UI with gradient themes

## 📋 API Endpoints

### Authentication (`/api/v1/auth`) — Public
| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| `POST` | `/register` | User registration | `200` Success, `400` Username taken |
| `POST` | `/login` | User authentication | `200` JWT returned, `401` Invalid credentials |

### Assets (`/api/v1/assets`) — Authenticated Users
| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/` | Get current user's assets | `200` OK |
| `POST` | `/` | Create new asset | `200` Created |
| `GET` | `/{id}` | Get specific asset | `200` OK, `403` Not owner, `404` Not found |
| `PUT` | `/{id}` | Update asset | `200` Updated, `403` Not owner |
| `DELETE` | `/{id}` | Delete asset | `200` Deleted, `403` Not owner |

### Admin (`/api/v1/admin`) — ADMIN Only
| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/users` | Get all users | `200` OK |
| `GET` | `/users/{id}` | Get specific user | `200` OK, `404` Not found |
| `PUT` | `/users/{id}/role` | Update user role | `200` Updated, `404` Not found |
| `DELETE` | `/users/{id}` | Delete user | `200` Deleted, `404` Not found |
| `GET` | `/stats` | Get system statistics | `200` OK |

## 🛠️ Tech Stack

### Backend
- **Java 17** — Modern Java with latest features
- **Spring Boot 3.2.5** — Enterprise-grade framework
- **Spring Security** — Authentication and authorization
- **Spring Data JPA** — Database abstraction layer
- **PostgreSQL (Neon)** — Cloud-hosted robust relational database
- **JWT (io.jsonwebtoken)** — Stateless authentication
- **BCrypt** — Secure password hashing
- **Swagger/OpenAPI 3.0** — Interactive API documentation
- **Maven** — Dependency management

### Frontend
- **React 18** — Modern UI framework
- **Vite** — Fast development build tool
- **Tailwind CSS** — Utility-first CSS framework
- **React Router DOM** — Client-side routing
- **Axios** — HTTP client with JWT interceptor
- **Lucide React** — Modern icon library

### Infrastructure
- **Render** — Backend hosting (Docker-based)
- **Vercel** — Frontend hosting (static build)
- **Neon PostgreSQL** — Cloud database with connection pooling
- **Docker** — Multi-stage containerized builds
- **GitHub Actions** — CI/CD pipeline

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Java 17+** ([Download](https://adoptium.net/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **Maven 3.6+** (included via `mvnw`)

### 1. Clone the Repository
```bash
git clone https://github.com/shambsinha/nexus-trade-core.git
cd nexus-trade-core
```

### 2. Start the Backend
```bash
cd backend

# Run with H2 in-memory database (default, no setup needed)
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**

> **Note**: By default, the app uses H2 in-memory database. To use PostgreSQL instead, update `backend/src/main/resources/application.properties` with your PostgreSQL credentials.

### 3. Start the Frontend
```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The frontend will start on **http://localhost:5173**

### 4. Test the Application
1. Open **http://localhost:5173** in your browser
2. Register a new user account
3. Login with your credentials
4. Add, view, update, and delete assets in the dashboard

### Access URLs (Local)
| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080/api/v1 |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| OpenAPI JSON | http://localhost:8080/v3/api-docs |
| H2 Console | http://localhost:8080/h2-console |

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    username    VARCHAR(50) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,       -- BCrypt hashed
    role        VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (role IN ('USER','ADMIN')),
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Assets Table
```sql
CREATE TABLE assets (
    id            BIGSERIAL PRIMARY KEY,
    symbol        VARCHAR(255) NOT NULL,
    target_price  NUMERIC(19,2) NOT NULL,
    user_id       BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Entity Relationships
```
User (1) ────────< (N) Asset
  │                    │
  ├── id               ├── id
  ├── username         ├── symbol
  ├── password         ├── target_price
  ├── role             └── user_id (FK)
  ├── is_active
  ├── created_at
  └── updated_at
```

## 🔐 Security Features

### Authentication
- **JWT-based stateless authentication** — No server-side sessions
- **BCrypt password hashing** — 10-round salted hash, never stores plaintext
- **Token expiration** — 24-hour JWT expiry with automatic validation
- **Bearer token scheme** — Standard `Authorization: Bearer <token>` header

### Authorization
- **Role-based access control** — USER and ADMIN roles
- **Method-level security** — `@PreAuthorize` annotations on endpoints
- **Resource ownership validation** — Users can only access their own assets
- **Admin-only endpoints** — User management and system statistics

### Input Validation
- **Bean Validation** — `@Valid` on all request DTOs
- **SQL injection prevention** — JPA parameterized queries
- **XSS protection** — Input sanitization and output encoding
- **CORS configuration** — Controlled cross-origin access

### API Security Flow
```
Client ──► JWT Filter ──► Security Context ──► Controller
              │                                    │
              ├── No token ──► 401 Unauthorized    ├── @PreAuthorize check
              ├── Invalid token ──► 401            └── Ownership validation
              └── Valid token ──► Proceed
```

## 📈 Scalability Note

### Current Architecture
- **Stateless Design** — JWT authentication enables horizontal scaling without session affinity
- **Connection Pooling** — HikariCP manages database connections efficiently
- **API Versioning** — `/api/v1/` prefix allows backward-compatible evolution
- **Modular Codebase** — Controller → Service → Repository layers for easy extension

### Scaling Path
| Concern | Solution |
|---------|----------|
| **Horizontal scaling** | Deploy multiple backend instances behind a load balancer (NGINX/ALB) |
| **Database scaling** | Read replicas for query-heavy workloads; connection pooling via PgBouncer |
| **Caching** | Redis for session data, asset prices, and frequently accessed queries |
| **Microservices** | Split into Auth Service, Asset Service, and Notification Service |
| **Async processing** | Message queue (RabbitMQ/Kafka) for trade alerts and notifications |
| **Container orchestration** | Kubernetes for auto-scaling, rolling deployments, and self-healing |
| **CDN** | Serve static frontend assets via CloudFront/Cloudflare for global latency reduction |

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Build Verification
```bash
cd frontend
npm install --legacy-peer-deps
npm run build
```

## 📝 Environment Variables

### Backend (`backend/src/main/resources/application.properties`)
| Variable | Description | Default |
|----------|-------------|---------|
| `spring.datasource.url` | Database JDBC URL | `jdbc:h2:mem:nexustrade` |
| `spring.datasource.username` | Database username | `sa` |
| `spring.datasource.password` | Database password | `password` |
| `app.jwt.secret` | JWT signing key | (set in production) |
| `app.jwt.expiration-ms` | Token expiry in ms | `86400000` (24h) |

### Frontend (`frontend/.env.local`)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api/v1` |

## 🐳 Docker Support

### Production Build (Multi-stage)
```bash
# Build and run via Docker
cd backend
docker build -t nexus-trade-core .
docker run -p 8080:8080 \
  -e DATABASE_URL=jdbc:postgresql://host:5432/neondb \
  -e DATABASE_USERNAME=user \
  -e DATABASE_PASSWORD=pass \
  -e JWT_SECRET=your-secret \
  nexus-trade-core
```

## 📋 API Documentation

### Swagger UI
Interactive API documentation with "Try it out" functionality:
- **Local**: http://localhost:8080/swagger-ui.html
- **Production**: https://nexus-trade-core.onrender.com/swagger-ui.html

### Quick API Test with cURL
```bash
# Register
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Login (returns JWT token)
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Create asset (use token from login)
curl -X POST http://localhost:8080/api/v1/assets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{"symbol":"AAPL","targetPrice":150.00}'

# Get your assets
curl http://localhost:8080/api/v1/assets \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This project was developed as part of a backend developer internship assignment, demonstrating enterprise-grade development practices with focus on security, scalability, and maintainability.
