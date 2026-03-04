export interface DocPage {
  title: string
  description: string
  body: string
}

export interface NavItem {
  title: string
  slug: string
  icon?: string
}

export interface NavSection {
  title: string
  icon: string
  slug: string
  children: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: 'Guides',
    icon: 'i-lucide-rocket',
    slug: 'guides',
    children: [
      { title: 'Introduction', slug: 'guides/introduction', icon: 'i-lucide-info' },
      { title: 'Quick Start', slug: 'guides/quick-start', icon: 'i-lucide-zap' },
      { title: 'Configuration', slug: 'guides/configuration', icon: 'i-lucide-settings' },
      { title: 'Deployment', slug: 'guides/deployment', icon: 'i-lucide-upload' },
    ],
  },
  {
    title: 'API Reference',
    icon: 'i-lucide-code',
    slug: 'api-reference',
    children: [
      { title: 'Authentication', slug: 'api-reference/authentication', icon: 'i-lucide-lock' },
      { title: 'Endpoints', slug: 'api-reference/endpoints', icon: 'i-lucide-route' },
      { title: 'Error Handling', slug: 'api-reference/error-handling', icon: 'i-lucide-alert-triangle' },
      { title: 'Rate Limiting', slug: 'api-reference/rate-limiting', icon: 'i-lucide-gauge' },
    ],
  },
  {
    title: 'Examples',
    icon: 'i-lucide-file-code',
    slug: 'examples',
    children: [
      { title: 'Basic Usage', slug: 'examples/basic-usage', icon: 'i-lucide-play' },
      { title: 'Advanced Patterns', slug: 'examples/advanced-patterns', icon: 'i-lucide-puzzle' },
      { title: 'Integrations', slug: 'examples/integrations', icon: 'i-lucide-plug' },
    ],
  },
]

export const pages: Record<string, DocPage> = {
  'guides/introduction': {
    title: 'Introduction',
    description: 'Learn what Botim Open Platform is and how it can help you build better applications.',
    body: `# Introduction

Botim Open Platform is a developer platform that enables you to build, integrate, and scale applications quickly. It provides a unified API for managing resources, handling authentication, and processing data.

## What You Will Learn

In this documentation you will find:

- **Guides** -- Step-by-step tutorials for common tasks
- **API Reference** -- Complete endpoint documentation
- **Examples** -- Ready-to-use code samples

::note
This documentation is a living resource. If you find an error or have a suggestion, please [open an issue](https://github.com/myorg/docs-site/issues) on GitHub.
::

## Key Features

::card-group
  :::card
  ---
  title: Unified API
  icon: i-lucide-layers
  ---
  A single, consistent API for all your application needs. No more juggling multiple services.
  :::

  :::card
  ---
  title: Real-time Events
  icon: i-lucide-activity
  ---
  Subscribe to webhooks and receive real-time notifications for resource changes.
  :::

  :::card
  ---
  title: SDKs & Libraries
  icon: i-lucide-package
  ---
  Official SDKs for JavaScript, Python, Go, and Ruby. Community libraries for many more.
  :::

  :::card
  ---
  title: Dashboard
  icon: i-lucide-layout-dashboard
  ---
  A powerful web dashboard for managing resources, viewing analytics, and configuring settings.
  :::
::

## Prerequisites

Before getting started, make sure you have:

- Node.js 18 or later installed
- An active Botim Open Platform account ([sign up here](https://myproject.com/signup))
- Basic familiarity with REST APIs

::tip
New to Botim Open Platform? Start with the [Quick Start](/docs/guides/quick-start) guide to get up and running in under 5 minutes.
::`,
  },

  'guides/quick-start': {
    title: 'Quick Start',
    description: 'Get up and running with Botim Open Platform in under 5 minutes.',
    body: `# Quick Start

Follow these steps to set up your first Botim Open Platform integration.

::steps

### Install the SDK

Choose your preferred package manager:

::tabs
  :::tabs-item{label="npm"}
  \`\`\`bash
  npm install @myproject/sdk
  \`\`\`
  :::

  :::tabs-item{label="yarn"}
  \`\`\`bash
  yarn add @myproject/sdk
  \`\`\`
  :::

  :::tabs-item{label="pnpm"}
  \`\`\`bash
  pnpm add @myproject/sdk
  \`\`\`
  :::
::

### Configure Your API Key

Create a \`.env\` file in your project root:

\`\`\`bash
MYPROJECT_API_KEY=your_api_key_here
MYPROJECT_ENV=sandbox
\`\`\`

::warning
Never commit your API key to version control. Always use environment variables.
::

### Initialize the Client

Create a new file to configure the SDK:

::tabs
  :::tabs-item{label="TypeScript"}
  \`\`\`typescript
  import { BotimOpenPlatform } from '@myproject/sdk'

  const client = new BotimOpenPlatform({
    apiKey: process.env.MYPROJECT_API_KEY,
    environment: process.env.MYPROJECT_ENV ?? 'sandbox',
  })

  export default client
  \`\`\`
  :::

  :::tabs-item{label="JavaScript"}
  \`\`\`javascript
  const { BotimOpenPlatform } = require('@myproject/sdk')

  const client = new BotimOpenPlatform({
    apiKey: process.env.MYPROJECT_API_KEY,
    environment: process.env.MYPROJECT_ENV ?? 'sandbox',
  })

  module.exports = client
  \`\`\`
  :::
::

### Make Your First API Call

\`\`\`typescript
import client from './client'

async function main() {
  // List all resources
  const resources = await client.resources.list({
    limit: 10,
  })

  console.log(\\\`Found \\\${resources.meta.total} resources:\\\`)
  resources.data.forEach(resource => {
    console.log(\\\`  - \\\${resource.name} (\\\${resource.id})\\\`)
  })
}

main().catch(console.error)
\`\`\`

### Verify the Response

Run your script:

\`\`\`bash
npx tsx src/index.ts
\`\`\`

You should see output like this:

\`\`\`json
{
  "data": [
    {
      "id": "res_abc123",
      "name": "My First Resource",
      "status": "active",
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 10
  }
}
\`\`\`

::

::tip
Congratulations! You have successfully made your first API call. Continue to the [Configuration](/docs/guides/configuration) guide to learn about advanced options.
::

## Next Steps

::card-group
  :::card
  ---
  title: Configuration
  icon: i-lucide-settings
  to: /docs/guides/configuration
  ---
  Learn about all available configuration options and environment settings.
  :::

  :::card
  ---
  title: API Reference
  icon: i-lucide-book-open
  to: /docs/api-reference/authentication
  ---
  Explore the complete API reference documentation.
  :::
::`,
  },

  'guides/configuration': {
    title: 'Configuration',
    description: 'Configure Botim Open Platform for your specific use case.',
    body: `# Configuration

Botim Open Platform can be configured through environment variables, a configuration file, or programmatically through the SDK.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| \`MYPROJECT_API_KEY\` | Yes | -- | Your API authentication key |
| \`MYPROJECT_ENV\` | No | \`production\` | Target environment (\`sandbox\` or \`production\`) |
| \`MYPROJECT_TIMEOUT\` | No | \`30000\` | Request timeout in milliseconds |
| \`MYPROJECT_MAX_RETRIES\` | No | \`3\` | Number of automatic retry attempts |
| \`MYPROJECT_LOG_LEVEL\` | No | \`warn\` | Logging level (\`debug\`, \`info\`, \`warn\`, \`error\`) |

## SDK Configuration

You can configure the client programmatically when initializing the SDK:

\`\`\`typescript
import { BotimOpenPlatform } from '@myproject/sdk'

const client = new BotimOpenPlatform({
  apiKey: process.env.MYPROJECT_API_KEY,
  environment: 'production',
  timeout: 30000,
  retry: {
    attempts: 3,
    backoff: 'exponential',
    maxDelay: 5000,
  },
  logging: {
    level: 'info',
    format: 'json',
  },
})
\`\`\`

## Retry Configuration

\`\`\`typescript
const client = new BotimOpenPlatform({
  apiKey: process.env.MYPROJECT_API_KEY,
  retry: {
    // Maximum number of retries
    attempts: 3,
    // Backoff strategy: 'linear' | 'exponential'
    backoff: 'exponential',
    // Maximum delay between retries in ms
    maxDelay: 5000,
    // HTTP status codes that trigger a retry
    retryOn: [408, 429, 500, 502, 503, 504],
  },
})
\`\`\`

::caution
Changing the \`environment\` setting after initial setup may cause data inconsistencies. Always verify your target environment before deploying.
::

## Multiple Environments

If your application needs to connect to multiple environments, create separate client instances:

\`\`\`typescript
import { BotimOpenPlatform } from '@myproject/sdk'

export const sandbox = new BotimOpenPlatform({
  apiKey: process.env.MYPROJECT_SANDBOX_KEY,
  environment: 'sandbox',
})

export const production = new BotimOpenPlatform({
  apiKey: process.env.MYPROJECT_PRODUCTION_KEY,
  environment: 'production',
})
\`\`\`

::note
Each environment has its own API key. Make sure to use the correct key for each environment.
::`,
  },

  'guides/deployment': {
    title: 'Deployment',
    description: 'Deploy your Botim Open Platform integration to production.',
    body: `# Deployment

This guide covers deploying your Botim Open Platform integration to production environments.

## Pre-deployment Checklist

- All environment variables are set for your production environment
- API keys are stored securely (not in source code)
- Error handling is implemented for all API calls
- Rate limiting is considered in your application design
- Webhook endpoints are accessible from the internet

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Deployment Platforms

::tabs
  :::tabs-item{label="Vercel"}
  Add your environment variables in the Vercel dashboard, then deploy:

  \`\`\`bash
  vercel deploy --prod
  \`\`\`

  Or connect your GitHub repository for automatic deployments.
  :::

  :::tabs-item{label="Docker"}
  \`\`\`dockerfile
  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package.json pnpm-lock.yaml ./
  RUN corepack enable && pnpm install --frozen-lockfile
  COPY . .
  RUN pnpm build

  FROM node:20-alpine
  WORKDIR /app
  COPY --from=builder /app/.output ./.output
  ENV NODE_ENV=production
  EXPOSE 3000
  CMD ["node", ".output/server/index.mjs"]
  \`\`\`

  Build and run:

  \`\`\`bash
  docker build -t myproject-app .
  docker run -p 3000:3000 --env-file .env myproject-app
  \`\`\`
  :::

  :::tabs-item{label="AWS"}
  Deploy using the AWS CDK or Serverless Framework:

  \`\`\`yaml
  service: myproject-app
  provider:
    name: aws
    runtime: nodejs20.x
    region: us-east-1
    environment:
      MYPROJECT_API_KEY: \${env:MYPROJECT_API_KEY}
      MYPROJECT_ENV: production

  functions:
    api:
      handler: dist/handler.main
      events:
        - httpApi: '*'
  \`\`\`
  :::
::

## Production Best Practices

::note
Always use environment-specific API keys. Never share keys between sandbox and production.
::

### Monitoring

Set up logging to monitor your integration:

\`\`\`typescript
import client from './client'

// Enable structured logging
client.on('request', (event) => {
  console.log(JSON.stringify({
    type: 'api_request',
    method: event.method,
    path: event.path,
    timestamp: new Date().toISOString(),
  }))
})

client.on('error', (event) => {
  console.error(JSON.stringify({
    type: 'api_error',
    status: event.status,
    message: event.message,
    timestamp: new Date().toISOString(),
  }))
})
\`\`\`

### Health Check Endpoint

Add a health check that verifies your Botim Open Platform connection:

\`\`\`typescript
export async function healthCheck() {
  try {
    await client.ping()
    return { status: 'healthy', myproject: 'connected' }
  }
  catch (error) {
    return { status: 'degraded', myproject: 'disconnected' }
  }
}
\`\`\``,
  },

  'api-reference/authentication': {
    title: 'Authentication',
    description: 'Learn how to authenticate with the Botim Open Platform API.',
    body: `# Authentication

All API requests require authentication via an API key sent in the \`Authorization\` header.

## API Key Authentication

Include your API key in every request:

\`\`\`bash
curl -X GET https://api.myproject.com/v1/resources \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"
\`\`\`

## SDK Authentication

When using the SDK, pass your API key during initialization:

::tabs
  :::tabs-item{label="TypeScript"}
  \`\`\`typescript
  import { BotimOpenPlatform } from '@myproject/sdk'

  const client = new BotimOpenPlatform({
    apiKey: process.env.MYPROJECT_API_KEY,
  })
  \`\`\`
  :::

  :::tabs-item{label="Python"}
  \`\`\`python
  from myproject import BotimOpenPlatform

  client = BotimOpenPlatform(
      api_key=os.environ["MYPROJECT_API_KEY"]
  )
  \`\`\`
  :::

  :::tabs-item{label="Go"}
  \`\`\`go
  package main

  import "github.com/myorg/myproject-go"

  func main() {
      client := myproject.NewClient(
          os.Getenv("MYPROJECT_API_KEY"),
      )
  }
  \`\`\`
  :::
::

## API Key Management

::warning
API keys grant full access to your account. Keep them secure and rotate them regularly.
::

### Best Practices

1. **Never hardcode keys** -- Always use environment variables
2. **Rotate regularly** -- Change your API keys every 90 days
3. **Use separate keys** -- Create different keys for sandbox and production
4. **Restrict permissions** -- Use scoped keys when possible
5. **Monitor usage** -- Review API key activity in the Dashboard

### Generating a New Key

1. Go to [Dashboard > API Keys](https://dashboard.myproject.com/api-keys)
2. Click **Create New Key**
3. Select the required scopes
4. Copy the key immediately -- it will not be shown again

::caution
When you rotate an API key, the old key is immediately revoked. Make sure to update all your services before revoking the old key.
::`,
  },

  'api-reference/endpoints': {
    title: 'Endpoints',
    description: 'Complete list of Botim Open Platform API endpoints.',
    body: `# Endpoints

## Base URL

All API endpoints use the following base URL:

\`\`\`
https://api.myproject.com/v1
\`\`\`

::note
Use \`https://sandbox.api.myproject.com/v1\` for the sandbox environment.
::

## Resources

### List Resources

\`\`\`bash
GET /resources
\`\`\`

Returns a paginated list of resources.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| \`page\` | integer | \`1\` | Page number for pagination |
| \`per_page\` | integer | \`20\` | Items per page (max: 100) |
| \`status\` | string | \`active\` | Filter by status: \`active\`, \`archived\`, or \`all\` |
| \`sort\` | string | \`created_at\` | Sort field: \`created_at\`, \`updated_at\`, or \`name\` |

**Example Request:**

\`\`\`bash
curl -X GET "https://api.myproject.com/v1/resources?page=1&per_page=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

**Example Response:**

\`\`\`json
{
  "data": [
    {
      "id": "res_abc123",
      "name": "Production API",
      "status": "active",
      "created_at": "2026-01-15T10:30:00Z",
      "updated_at": "2026-02-20T14:15:00Z"
    }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "per_page": 10,
    "total_pages": 5
  }
}
\`\`\`

---

### Create Resource

\`\`\`bash
POST /resources
\`\`\`

Creates a new resource.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| \`name\` | string | Yes | Human-readable name (max 255 chars) |
| \`type\` | string | Yes | Resource type: \`standard\`, \`premium\`, or \`enterprise\` |
| \`config\` | object | No | Optional configuration object |
| \`metadata\` | object | No | Optional key-value metadata |

**Example:**

\`\`\`bash
curl -X POST https://api.myproject.com/v1/resources \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production API",
    "type": "standard",
    "config": {
      "region": "us-east-1",
      "tier": "pro"
    },
    "metadata": {
      "team": "backend",
      "project": "main-app"
    }
  }'
\`\`\`

---

### Get Resource

\`\`\`bash
GET /resources/:id
\`\`\`

Retrieves a single resource by its ID.

**Example:**

\`\`\`bash
curl -X GET https://api.myproject.com/v1/resources/res_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

---

### Update Resource

\`\`\`bash
PATCH /resources/:id
\`\`\`

Updates an existing resource. Only include the fields you want to change.

---

### Delete Resource

\`\`\`bash
DELETE /resources/:id
\`\`\`

Permanently deletes a resource and all associated data.

::caution
Deleting a resource is irreversible. All associated data will be permanently removed.
::`,
  },

  'api-reference/error-handling': {
    title: 'Error Handling',
    description: 'Understand API error responses and how to handle them.',
    body: `# Error Handling

The Botim Open Platform API uses conventional HTTP status codes to indicate the success or failure of requests.

## Error Response Format

All errors follow a consistent JSON structure:

\`\`\`json
{
  "error": {
    "code": "invalid_request",
    "message": "The 'name' field is required.",
    "status": 400,
    "details": {
      "field": "name",
      "reason": "missing_required_field"
    }
  },
  "request_id": "req_xyz789"
}
\`\`\`

## HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| \`200\` | OK | Request succeeded |
| \`201\` | Created | Resource was created successfully |
| \`204\` | No Content | Request succeeded, no response body |
| \`400\` | Bad Request | Invalid request parameters |
| \`401\` | Unauthorized | Missing or invalid API key |
| \`403\` | Forbidden | Insufficient permissions |
| \`404\` | Not Found | Resource does not exist |
| \`409\` | Conflict | Resource already exists or state conflict |
| \`422\` | Unprocessable | Valid JSON but failed validation |
| \`429\` | Too Many Requests | Rate limit exceeded |
| \`500\` | Internal Error | Something went wrong on our end |
| \`503\` | Service Unavailable | Temporary outage, retry later |

## Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| \`invalid_request\` | 400 | Request body or parameters are malformed |
| \`authentication_failed\` | 401 | API key is missing or invalid |
| \`permission_denied\` | 403 | API key lacks required scope |
| \`resource_not_found\` | 404 | Requested resource does not exist |
| \`resource_conflict\` | 409 | Resource with same identifier exists |
| \`validation_error\` | 422 | Request failed validation rules |
| \`rate_limit_exceeded\` | 429 | Too many requests in time window |
| \`internal_error\` | 500 | Unexpected server error |

## Handling Errors in Code

::tabs
  :::tabs-item{label="TypeScript"}
  \`\`\`typescript
  import { BotimOpenPlatform, ApiError } from '@myproject/sdk'

  try {
    const resource = await client.resources.create({
      name: 'New Resource',
      type: 'standard',
    })
  }
  catch (error) {
    if (error instanceof ApiError) {
      switch (error.code) {
        case 'rate_limit_exceeded':
          // Wait and retry
          await sleep(error.retryAfter * 1000)
          break
        case 'validation_error':
          // Fix the request
          console.error('Validation failed:', error.details)
          break
        default:
          console.error(\\\`API error: \\\${error.message}\\\`)
      }
    }
  }
  \`\`\`
  :::

  :::tabs-item{label="Python"}
  \`\`\`python
  from myproject import BotimOpenPlatform, ApiError

  try:
      resource = client.resources.create(
          name="New Resource",
          type="standard",
      )
  except ApiError as e:
      if e.code == "rate_limit_exceeded":
          time.sleep(e.retry_after)
      elif e.code == "validation_error":
          print(f"Validation failed: {e.details}")
      else:
          print(f"API error: {e.message}")
  \`\`\`
  :::
::

::tip
Always include the \`request_id\` from error responses when contacting support. It helps us trace the issue quickly.
::`,
  },

  'api-reference/rate-limiting': {
    title: 'Rate Limiting',
    description: 'Understand API rate limits and how to handle them.',
    body: `# Rate Limiting

The Botim Open Platform API enforces rate limits to ensure fair usage and platform stability.

## Rate Limit Tiers

| Plan | Requests / minute | Requests / day | Burst |
|------|-------------------|----------------|-------|
| Free | 60 | 10,000 | 10 |
| Pro | 600 | 100,000 | 50 |
| Enterprise | 6,000 | 1,000,000 | 200 |

## Response Headers

Every API response includes rate limit headers:

\`\`\`
X-RateLimit-Limit: 600
X-RateLimit-Remaining: 594
X-RateLimit-Reset: 1709312460
\`\`\`

| Header | Type | Description |
|--------|------|-------------|
| \`X-RateLimit-Limit\` | integer | Maximum requests allowed per minute |
| \`X-RateLimit-Remaining\` | integer | Requests remaining in current window |
| \`X-RateLimit-Reset\` | integer | Unix timestamp when the window resets |

## Handling Rate Limits

When you exceed the rate limit, the API returns a \`429 Too Many Requests\` response:

\`\`\`json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Retry after 30 seconds.",
    "status": 429,
    "details": {
      "retry_after": 30,
      "limit": 600,
      "window": "1m"
    }
  }
}
\`\`\`

### Implementing Backoff

\`\`\`typescript
async function withRateLimit<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  }
  catch (error) {
    if (error instanceof ApiError && error.code === 'rate_limit_exceeded') {
      const retryAfter = error.details.retry_after ?? 60
      console.warn(\\\`Rate limited. Retrying in \\\${retryAfter}s...\\\`)
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000))
      return fn()
    }
    throw error
  }
}

// Usage
const resources = await withRateLimit(() =>
  client.resources.list()
)
\`\`\`

## Best Practices

::note
The SDK automatically handles rate limiting with exponential backoff. You only need to implement custom handling for advanced use cases.
::

1. **Cache responses** -- Reduce API calls by caching data that doesn't change frequently
2. **Use pagination** -- Fetch data in smaller batches instead of large single requests
3. **Implement backoff** -- Use exponential backoff when retrying rate-limited requests
4. **Monitor headers** -- Track \`X-RateLimit-Remaining\` to anticipate limits
5. **Batch operations** -- Use bulk endpoints when available to reduce request count`,
  },

  'examples/basic-usage': {
    title: 'Basic Usage',
    description: 'Simple examples to get started with the Botim Open Platform API.',
    body: `# Basic Usage

These examples demonstrate the most common API operations.

## CRUD Operations

### Create a Resource

\`\`\`typescript
import client from './client'

const resource = await client.resources.create({
  name: 'My Application',
  type: 'standard',
  metadata: {
    environment: 'production',
    team: 'engineering',
  },
})

console.log(\\\`Created: \\\${resource.id}\\\`)
// → Created: res_abc123
\`\`\`

### List Resources

\`\`\`typescript
import client from './client'

const { data, meta } = await client.resources.list({
  page: 1,
  per_page: 20,
  status: 'active',
  sort: 'created_at',
})

console.log(\\\`Page \\\${meta.page} of \\\${meta.total_pages}\\\`)
data.forEach(r => console.log(\\\`\\\${r.name}: \\\${r.status}\\\`))
\`\`\`

### Update a Resource

\`\`\`typescript
import client from './client'

const updated = await client.resources.update('res_abc123', {
  name: 'Updated Name',
  metadata: {
    version: '2.0',
  },
})
\`\`\`

### Delete a Resource

\`\`\`typescript
import client from './client'

await client.resources.delete('res_abc123')
console.log('Resource deleted')
\`\`\`

::warning
Deletion is permanent and cannot be undone.
::

## Pagination

Iterate through all pages of results:

\`\`\`typescript
import client from './client'

async function getAllResources() {
  const allResources = []
  let page = 1

  while (true) {
    const { data, meta } = await client.resources.list({
      page,
      per_page: 100,
    })

    allResources.push(...data)

    if (page >= meta.total_pages)
      break
    page++
  }

  return allResources
}
\`\`\`

::tip
The SDK provides a built-in auto-pagination helper. See [Advanced Patterns](/docs/examples/advanced-patterns) for details.
::

## Error Handling

\`\`\`typescript
import client from './client'
import { ApiError } from '@myproject/sdk'

try {
  const resource = await client.resources.get('res_nonexistent')
}
catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      console.log('Resource not found')
    }
    else {
      console.error(\\\`API Error \\\${error.status}: \\\${error.message}\\\`)
    }
  }
  else {
    throw error // Re-throw unexpected errors
  }
}
\`\`\``,
  },

  'examples/advanced-patterns': {
    title: 'Advanced Patterns',
    description: 'Advanced usage patterns for production applications.',
    body: `# Advanced Patterns

These patterns are useful for production applications that need robust error handling, caching, and concurrency management.

## Auto-Pagination

The SDK provides an async iterator for automatic pagination:

\`\`\`typescript
import client from './client'

// Iterate through all resources automatically
for await (const resource of client.resources.listAutoPaginating()) {
  console.log(resource.name)
}

// Or collect all into an array
const allResources = await client.resources.listAutoPaginating().toArray()
console.log(\\\`Total: \\\${allResources.length} resources\\\`)
\`\`\`

## Webhook Handling

Process incoming webhook events securely:

\`\`\`typescript
import { verifyWebhookSignature } from '@myproject/sdk'

export async function handleWebhook(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('X-Webhook-Signature')

  // Verify the signature
  const isValid = verifyWebhookSignature(
    body,
    signature,
    process.env.MYPROJECT_WEBHOOK_SECRET,
  )

  if (!isValid) {
    return new Response('Invalid signature', { status: 401 })
  }

  const event = JSON.parse(body)

  switch (event.type) {
    case 'resource.created':
      console.log('New resource:', event.data.id)
      break
    case 'resource.updated':
      console.log('Updated:', event.data.id)
      break
    case 'resource.deleted':
      console.log('Deleted:', event.data.id)
      break
  }

  return new Response('OK', { status: 200 })
}
\`\`\`

::note
Always verify webhook signatures before processing events. This prevents replay attacks and ensures the event came from Botim Open Platform.
::

## Batch Operations

Process multiple items efficiently:

\`\`\`typescript
import client from './client'

const items = [
  { name: 'Resource A', type: 'standard' },
  { name: 'Resource B', type: 'standard' },
  { name: 'Resource C', type: 'premium' },
]

// Create resources in parallel with concurrency limit
const results = await Promise.allSettled(
  items.map(item => client.resources.create(item))
)

const created = results.filter(r => r.status === 'fulfilled')
const failed = results.filter(r => r.status === 'rejected')

console.log(\\\`Created: \\\${created.length}, Failed: \\\${failed.length}\\\`)
\`\`\`

## Middleware Pattern

Add custom logic to every API call:

\`\`\`typescript
import { BotimOpenPlatform } from '@myproject/sdk'

const client = new BotimOpenPlatform({
  apiKey: process.env.MYPROJECT_API_KEY,
  middleware: [
    // Logging middleware
    async (request, next) => {
      const start = Date.now()
      const response = await next(request)
      const duration = Date.now() - start
      console.log(\\\`\\\${request.method} \\\${request.path} → \\\${response.status} (\\\${duration}ms)\\\`)
      return response
    },

    // Custom header middleware
    async (request, next) => {
      request.headers.set('X-Custom-Header', 'my-value')
      return next(request)
    },
  ],
})
\`\`\`

::tip
Middleware runs in order. Place logging middleware first to capture the full request lifecycle.
::`,
  },

  'examples/integrations': {
    title: 'Integrations',
    description: 'Integrate Botim Open Platform with popular frameworks and services.',
    body: `# Integrations

Examples for integrating Botim Open Platform with popular frameworks.

## Next.js

Use Botim Open Platform in a Next.js API route:

\`\`\`typescript
import { BotimOpenPlatform } from '@myproject/sdk'
import { NextResponse } from 'next/server'

const client = new BotimOpenPlatform({
  apiKey: process.env.MYPROJECT_API_KEY!,
})

export async function GET() {
  const resources = await client.resources.list({ per_page: 10 })
  return NextResponse.json(resources)
}

export async function POST(request: Request) {
  const body = await request.json()
  const resource = await client.resources.create(body)
  return NextResponse.json(resource, { status: 201 })
}
\`\`\`

## Nuxt

Use Botim Open Platform in a Nuxt server route:

\`\`\`typescript
import { BotimOpenPlatform } from '@myproject/sdk'

const client = new BotimOpenPlatform({
  apiKey: useRuntimeConfig().myprojectApiKey,
})

export default defineEventHandler(async () => {
  return client.resources.list({ per_page: 10 })
})
\`\`\`

Configure the runtime config in \`nuxt.config.ts\`:

\`\`\`typescript
export default defineNuxtConfig({
  runtimeConfig: {
    myprojectApiKey: process.env.MYPROJECT_API_KEY,
  },
})
\`\`\`

## Express

Set up a REST API with Express:

\`\`\`typescript
import express from 'express'
import { BotimOpenPlatform } from '@myproject/sdk'

const app = express()
const client = new BotimOpenPlatform({
  apiKey: process.env.MYPROJECT_API_KEY!,
})

app.use(express.json())

app.get('/api/resources', async (req, res) => {
  try {
    const resources = await client.resources.list({
      page: Number(req.query.page) || 1,
    })
    res.json(resources)
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' })
  }
})

app.post('/api/resources', async (req, res) => {
  try {
    const resource = await client.resources.create(req.body)
    res.status(201).json(resource)
  }
  catch (error) {
    res.status(400).json({ error: 'Failed to create resource' })
  }
})

app.listen(3000, () => console.log('Server running on :3000'))
\`\`\`

## Webhook with Hono

Handle webhooks using the Hono framework:

\`\`\`typescript
import { Hono } from 'hono'
import { verifyWebhookSignature } from '@myproject/sdk'

const app = new Hono()

app.post('/webhooks/myproject', async (c) => {
  const body = await c.req.text()
  const signature = c.req.header('X-Webhook-Signature')

  if (!verifyWebhookSignature(body, signature, c.env.WEBHOOK_SECRET)) {
    return c.json({ error: 'Invalid signature' }, 401)
  }

  const event = JSON.parse(body)
  console.log(\\\`Received event: \\\${event.type}\\\`)

  // Process the event asynchronously
  c.executionCtx.waitUntil(processEvent(event))

  return c.json({ received: true })
})

export default app
\`\`\`

::tip
All integration examples are available in the [examples repository](https://github.com/myorg/myproject-examples) with complete, runnable code.
::`,
  },
}
