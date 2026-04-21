# 📮 Postman Collection - NexusTrade Core API

## 🚀 **API Base URL**
```
Local: http://localhost:8080/api/v1
Production: https://your-domain.com/api/v1
```

## 🔐 **Authentication Endpoints**

### **1. User Registration**
```http
POST {{baseUrl}}/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123",
  "email": "test@example.com"
}
```

**Response (201)**:
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "role": "USER",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **2. User Login**
```http
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200)**:
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@nexustrade.com",
  "role": "ADMIN",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer"
}
```

## 📊 **Asset Management Endpoints**

### **3. Get User Assets**
```http
GET {{baseUrl}}/assets
Authorization: Bearer {{token}}
```

**Response (200)**:
```json
[
  {
    "id": 1,
    "symbol": "BTC",
    "targetPrice": 45000.00,
    "createdAt": "2026-04-21T10:30:00",
    "updatedAt": "2026-04-21T10:30:00"
  }
]
```

### **4. Create Asset**
```http
POST {{baseUrl}}/assets
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "symbol": "ETH",
  "targetPrice": 3000.00
}
```

**Response (201)**:
```json
{
  "id": 2,
  "symbol": "ETH",
  "targetPrice": 3000.00,
  "createdAt": "2026-04-21T10:35:00",
  "updatedAt": "2026-04-21T10:35:00"
}
```

### **5. Get Asset by ID**
```http
GET {{baseUrl}}/assets/1
Authorization: Bearer {{token}}
```

### **6. Update Asset**
```http
PUT {{baseUrl}}/assets/1
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "targetPrice": 46000.00
}
```

### **7. Delete Asset**
```http
DELETE {{baseUrl}}/assets/1
Authorization: Bearer {{token}}
```

## 👑 **Admin Endpoints (ADMIN Only)**

### **8. Get All Users**
```http
GET {{baseUrl}}/admin/users
Authorization: Bearer {{adminToken}}
```

### **9. Get User by ID**
```http
GET {{baseUrl}}/admin/users/1
Authorization: Bearer {{adminToken}}
```

### **10. Update User Role**
```http
PUT {{baseUrl}}/admin/users/1/role
Authorization: Bearer {{adminToken}}
Content-Type: application/json

{
  "role": "ADMIN"
}
```

### **11. Delete User**
```http
DELETE {{baseUrl}}/admin/users/2
Authorization: Bearer {{adminToken}}
```

### **12. Get System Statistics**
```http
GET {{baseUrl}}/admin/stats
Authorization: Bearer {{adminToken}}
```

**Response (200)**:
```json
{
  "totalUsers": 150,
  "totalAssets": 1250,
  "activeUsers": 45,
  "newUsersToday": 8,
  "topAssets": [
    {"symbol": "BTC", "count": 450},
    {"symbol": "ETH", "count": 320},
    {"symbol": "AAPL", "count": 280}
  ]
}
```

## 🔍 **Health Check**

### **13. System Health**
```http
GET {{baseUrl}}/actuator/health
```

**Response (200)**:
```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "PostgreSQL",
        "validationQuery": "isValid()"
      }
    },
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 250685575168,
        "free": 125342787584,
        "threshold": 10485760
      }
    }
  }
}
```

## 📝 **Environment Variables**

### **Postman Variables**
```
baseUrl: http://localhost:8080/api/v1
token: {{login_response.token}}
adminToken: {{admin_login_response.token}}
```

### **Test Data**
```
Default Admin:
- Username: admin
- Password: admin123

Test User:
- Username: testuser
- Password: password123
- Email: test@example.com
```

## 🚨 **Error Responses**

### **Authentication Errors**
```json
{
  "timestamp": "2026-04-21T10:30:00.123+00:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid credentials",
  "path": "/api/v1/auth/login"
}
```

### **Validation Errors**
```json
{
  "timestamp": "2026-04-21T10:30:00.123+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "details": [
    {
      "field": "username",
      "message": "Username is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### **Authorization Errors**
```json
{
  "timestamp": "2026-04-21T10:30:00.123+00:00",
  "status": 403,
  "error": "Forbidden",
  "message": "Access denied: insufficient permissions",
  "path": "/api/v1/admin/users"
}
```

## 📥 **Import Collection**

### **Direct Import**
1. **Copy** the collection JSON below
2. **Open** Postman
3. **Click** "Import"
4. **Paste** the JSON
5. **Set** environment variables

### **Collection JSON**
```json
{
  "info": {
    "name": "NexusTrade Core API",
    "description": "Complete API collection for NexusTrade trading platform",
    "version": "1.0.0",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:8080/api/v1",
      "type": "string"
    },
    {
      "key": "token",
      "value": "",
      "type": "string"
    },
    {
      "key": "adminToken",
      "value": "",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"testuser\",\n  \"password\": \"password123\",\n  \"email\": \"test@example.com\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/auth/register",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "register"]
            }
          }
        },
        {
          "name": "Login User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"admin\",\n  \"password\": \"admin123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["auth", "login"]
            }
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 200) {",
                  "    var response = pm.response.json();",
                  "    pm.collectionVariables.set('token', response.token);",
                  "}"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "name": "Assets",
      "item": [
        {
          "name": "Get Assets",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/assets",
              "host": ["{{baseUrl}}"],
              "path": ["assets"]
            }
          }
        },
        {
          "name": "Create Asset",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"symbol\": \"ETH\",\n  \"targetPrice\": 3000.00\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/assets",
              "host": ["{{baseUrl}}"],
              "path": ["assets"]
            }
          }
        },
        {
          "name": "Update Asset",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"targetPrice\": 46000.00\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/assets/1",
              "host": ["{{baseUrl}}"],
              "path": ["assets", "1"]
            }
          }
        },
        {
          "name": "Delete Asset",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/assets/1",
              "host": ["{{baseUrl}}"],
              "path": ["assets", "1"]
            }
          }
        }
      ]
    },
    {
      "name": "Admin",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/admin/users",
              "host": ["{{baseUrl}}"],
              "path": ["admin", "users"]
            }
          }
        },
        {
          "name": "Get System Stats",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/admin/stats",
              "host": ["{{baseUrl}}"],
              "path": ["admin", "stats"]
            }
          }
        }
      ]
    }
  ]
}
```

## 🎯 **Testing Workflow**

### **1. Setup Environment**
- Set `baseUrl` to your API endpoint
- Run "Login User" to get token
- Token automatically saved to `{{token}}` variable

### **2. Test Authentication**
- Register new user
- Login with admin credentials
- Verify token generation

### **3. Test Asset Management**
- Get all assets
- Create new asset
- Update existing asset
- Delete asset

### **4. Test Admin Features**
- Access admin endpoints with admin token
- Test user management
- Check system statistics

---

**📮 This Postman collection covers all NexusTrade Core API endpoints with proper authentication, error handling, and test data!**
