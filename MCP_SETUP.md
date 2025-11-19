# MCP (Model Context Protocol) Setup Guide

This guide explains how to use MCP servers with the Keten project, including shadcn/ui components and Supabase integration.

## 📦 What is MCP?

Model Context Protocol (MCP) is an open protocol that enables AI assistants to securely connect to external data sources and tools. With MCP servers, your AI assistant can:

- Browse and search components from registries
- Install components using natural language
- Access database queries and tools
- Interact with external services

## 🎨 shadcn/ui MCP Server

The shadcn MCP server is already configured for Cursor! This allows you to:

### ✅ Already Configured

The shadcn MCP server has been set up in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

### 🚀 How to Use

1. **Restart Cursor** after the MCP configuration
2. **Enable the MCP server** in Cursor Settings (if not already enabled)
3. **Use natural language** to interact with components:

#### Example Prompts:

- "Show me all available components in the shadcn registry"
- "Add a dropdown menu component to my project"
- "Create a login form using shadcn components"
- "Find me a data table component"
- "Install the sidebar component"

### 🔍 Verifying MCP Connection

1. Open Cursor Settings
2. Navigate to MCP Servers section
3. Look for the `shadcn` server
4. You should see a green dot indicating it's connected
5. You can see available tools listed

### 🛠️ Troubleshooting

If the MCP server isn't working:

1. **Check Configuration**: Verify `.cursor/mcp.json` exists and is correct
2. **Restart Cursor**: Close and reopen Cursor completely
3. **Check Logs**: In Cursor, go to View → Output and select `MCP: project-*` in the dropdown
4. **Verify Installation**: Ensure `shadcn` CLI is accessible via `npx`

## 🗄️ Supabase MCP Integration

While Supabase doesn't have an official MCP server yet, you can set up custom MCP tools to interact with your Supabase database. Here's how:

### Option 1: Use Supabase Client Directly (Recommended)

The project already has Supabase client setup in `src/lib/supabase/`. You can use it directly in your code:

```typescript
import { createClient } from "@/lib/supabase/server";

// In a Server Component or API Route
const supabase = await createClient();
const { data, error } = await supabase.from("properties").select("*");
```

### Option 2: Create Custom MCP Tools for Supabase

You can create a custom MCP server that wraps Supabase queries. Here's a basic example:

#### Create `.cursor/mcp-supabase.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "node",
      "args": ["./scripts/mcp-supabase-server.js"],
      "env": {
        "SUPABASE_URL": "${NEXT_PUBLIC_SUPABASE_URL}",
        "SUPABASE_KEY": "${SUPABASE_SERVICE_ROLE_KEY}"
      }
    }
  }
}
```

#### Create `scripts/mcp-supabase-server.js`:

```javascript
#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// MCP Server implementation
// This is a simplified example - you'd need to implement the full MCP protocol
```

**Note**: This requires implementing the full MCP protocol, which is complex. For now, using the Supabase client directly is recommended.

### Option 3: Use Supabase REST API via MCP

You can create MCP tools that call Supabase's REST API:

```typescript
// Example: Query properties via Supabase REST API
async function queryProperties() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/properties`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    }
  );
  return response.json();
}
```

## 📚 Available MCP Tools

### shadcn/ui MCP Tools

Once connected, you'll have access to these tools:

1. **Browse Components** - List all available components from registries
2. **Search Components** - Find components by name or functionality
3. **Install Components** - Add components to your project
4. **View Component Details** - See component code and documentation

### Using MCP Tools in Cursor

1. **Natural Language**: Just describe what you want
   - "Add a date picker component"
   - "Show me all form components"
   - "Install a card component"

2. **Direct Commands**: Use specific component names
   - "Install @shadcn/button"
   - "Add dropdown-menu component"

## 🔐 Environment Variables for MCP

Make sure your `.env.local` has the required variables:

```bash
# Supabase (for direct client usage)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Registry Authentication (if using private registries)
REGISTRY_TOKEN=your_token_here
```

## 🎯 Best Practices

1. **Use shadcn MCP for Components**: Let the AI assistant help you find and install components
2. **Use Supabase Client for Data**: Use the existing Supabase client setup for database operations
3. **Keep MCP Simple**: Don't overcomplicate - use MCP for what it's good at (component discovery)
4. **Document Custom Tools**: If you create custom MCP tools, document them well

## 📖 Resources

- [shadcn/ui MCP Documentation](https://ui.shadcn.com/docs/mcp)
- [Model Context Protocol Specification](https://modelcontextprotocol.io)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Cursor MCP Documentation](https://cursor.sh/docs/mcp)

## 🚀 Quick Start Examples

### Example 1: Install a Component via MCP

Just ask in Cursor:

> "Add a combobox component from shadcn"

The MCP server will handle the installation automatically.

### Example 2: Query Supabase (Direct Client)

```typescript
// In your component or API route
import { getPropertyBySlug } from "@/lib/supabase/queries";

const property = await getPropertyBySlug("keten-property");
```

### Example 3: Use Date Picker Component

```typescript
import { DateRangePicker } from "@/components/ui/date-picker";

<DateRangePicker
  dateRange={dateRange}
  onSelect={(range) => setDateRange(range)}
  placeholder="Select check-in and check-out dates"
/>
```

## ✅ Checklist

- [x] shadcn MCP server configured
- [x] Date picker component created
- [x] Supabase client setup complete
- [ ] Test MCP connection in Cursor
- [ ] Verify component installation via MCP
- [ ] Set up Supabase database schema
- [ ] Test Supabase queries

---

**Next Steps**:

1. Restart Cursor to activate MCP
2. Test the shadcn MCP server with a simple prompt
3. Start building your components using MCP assistance
4. Use the Supabase client directly for database operations
