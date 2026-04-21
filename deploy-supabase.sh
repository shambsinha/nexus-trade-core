#!/bin/bash

# NexusTrade Core - Supabase Deployment Script

echo "=== NexusTrade Core Supabase Deployment ==="
echo ""

# Check if supabase CLI is available
if ! command -v ./supabase &> /dev/null; then
    echo "Error: Supabase CLI not found. Please install it first."
    echo "Run: curl -L https://github.com/supabase/cli/releases/latest/download/supabase_darwin_amd64.tar.gz | tar xz"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "supabase/functions/nexus-trade-api/index.ts" ]; then
    echo "Error: Please run this script from the project root directory."
    exit 1
fi

echo "Step 1: Login to Supabase"
echo "Please run: ./supabase login"
echo "This will open a browser for authentication."
echo ""

read -p "Press Enter after you've logged in to Supabase..."

echo ""
echo "Step 2: Link to your Supabase project"
echo "Please run: ./supabase link"
echo "Select your nexus-trade-core project from the list."
echo ""

read -p "Press Enter after you've linked your project..."

echo ""
echo "Step 3: Deploy the edge function"
echo "Deploying nexus-trade-api function..."

./supabase functions deploy nexus-trade-api

if [ $? -eq 0 ]; then
    echo ""
    echo "=== Deployment Successful! ==="
    echo ""
    echo "Your API is now live at:"
    echo "https://[your-project-ref].supabase.co/functions/v1/nexus-trade-api"
    echo ""
    echo "Test the health endpoint:"
    echo "curl https://[your-project-ref].supabase.co/functions/v1/nexus-trade-api/health"
    echo ""
    echo "Next steps:"
    echo "1. Update Vercel environment variable VITE_API_BASE_URL"
    echo "2. Test the frontend integration"
    echo "3. Verify all API endpoints work correctly"
else
    echo ""
    echo "=== Deployment Failed ==="
    echo "Please check the error messages above and try again."
fi
