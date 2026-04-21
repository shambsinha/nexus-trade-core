import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
}

// Health check endpoint
const healthCheck = () => {
  return {
    status: 'healthy',
    message: 'NexusTrade API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      auth: '/auth/login',
      users: '/users',
      assets: '/assets',
      health: '/health'
    }
  }
}

// Mock user data (in production, this would come from your database)
const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@nexustrade.com', role: 'ADMIN' },
  { id: 2, username: 'user1', email: 'user1@nexustrade.com', role: 'USER' }
]

// Mock asset data
const mockAssets = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin', price: 45000.00, quantity: 0.5 },
  { id: 2, symbol: 'ETH', name: 'Ethereum', price: 3000.00, quantity: 10.0 },
  { id: 3, symbol: 'AAPL', name: 'Apple Inc.', price: 150.00, quantity: 100.0 }
]

// Handle requests
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const path = url.pathname
  const method = req.method

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, { 
      status: 200, 
      headers: corsHeaders 
    })
  }

  console.log(`${method} ${path}`)

  try {
    // Health check endpoint
    if (path === '/health' || path === '/api/v1/health') {
      return new Response(JSON.stringify(healthCheck()), {
        status: 200,
        headers: corsHeaders
      })
    }

    // Auth endpoints
    if (path === '/auth/login' || path === '/api/v1/auth/login') {
      if (method === 'POST') {
        const body = await req.json()
        const { username, password } = body
        
        // Mock authentication (in production, validate against database)
        if (username === 'admin' && password === 'admin123') {
          const token = 'mock-jwt-token-' + Date.now()
          return new Response(JSON.stringify({
            token,
            type: 'Bearer',
            id: 1,
            username: 'admin',
            email: 'admin@nexustrade.com',
            role: 'ADMIN'
          }), {
            status: 200,
            headers: corsHeaders
          })
        }
        
        return new Response(JSON.stringify({
          message: 'Invalid credentials'
        }), {
          status: 401,
          headers: corsHeaders
        })
      }
    }

    // Users endpoints
    if (path === '/users' || path === '/api/v1/users') {
      if (method === 'GET') {
        return new Response(JSON.stringify(mockUsers), {
          status: 200,
          headers: corsHeaders
        })
      }
    }

    // Assets endpoints
    if (path === '/assets' || path === '/api/v1/assets') {
      if (method === 'GET') {
        return new Response(JSON.stringify(mockAssets), {
          status: 200,
          headers: corsHeaders
        })
      }
      
      if (method === 'POST') {
        const body = await req.json()
        const newAsset = {
          id: mockAssets.length + 1,
          ...body,
          createdAt: new Date().toISOString()
        }
        mockAssets.push(newAsset)
        
        return new Response(JSON.stringify(newAsset), {
          status: 201,
          headers: corsHeaders
        })
      }
    }

    // Asset by ID
    if (path.startsWith('/assets/') || path.startsWith('/api/v1/assets/')) {
      const assetId = parseInt(path.split('/').pop())
      const asset = mockAssets.find(a => a.id === assetId)
      
      if (asset) {
        if (method === 'GET') {
          return new Response(JSON.stringify(asset), {
            status: 200,
            headers: corsHeaders
          })
        }
        
        if (method === 'PUT') {
          const body = await req.json()
          Object.assign(asset, body, { updatedAt: new Date().toISOString() })
          
          return new Response(JSON.stringify(asset), {
            status: 200,
            headers: corsHeaders
          })
        }
        
        if (method === 'DELETE') {
          const index = mockAssets.findIndex(a => a.id === assetId)
          mockAssets.splice(index, 1)
          
          return new Response(JSON.stringify({
            message: 'Asset deleted successfully'
          }), {
            status: 200,
            headers: corsHeaders
          })
        }
      }
    }

    // Default response for unknown endpoints
    return new Response(JSON.stringify({
      message: 'Endpoint not found',
      availableEndpoints: [
        'GET /health',
        'POST /auth/login',
        'GET /users',
        'GET /assets',
        'POST /assets',
        'GET /assets/:id',
        'PUT /assets/:id',
        'DELETE /assets/:id'
      ]
    }), {
      status: 404,
      headers: corsHeaders
    })

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}

// Serve the function
serve(handler)
