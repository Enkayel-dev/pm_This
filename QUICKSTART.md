# Quick Start Guide

Get started with Lovable PM Agent in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))
- A Lovable.dev project (or ready to start one)

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/lovable-pm-agent.git
cd lovable-pm-agent

# Install dependencies
npm install

# Set up your API key
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

## Your First Project

### 1. Initialize

```bash
node bin/lpm.js init
```

Answer the questions about your project. Don't worry, you can change everything later.

### 2. Check Status

```bash
node bin/lpm.js status
```

You'll see:
- Current phase: **Planning & Setup**
- Tasks to complete
- Progress indicator

### 3. Chat with Your PM

```bash
node bin/lpm.js chat
```

Try asking:
- "What should I focus on first?"
- "Help me plan the pages I need"
- "What should go in my knowledge base?"

Type `exit` to end the chat.

### 4. Edit Your Knowledge Base

```bash
# Open in your editor
code .lovable-pm/knowledge-base.md
```

Add details about:
- Your target users
- Design preferences
- Coding conventions
- Project guidelines

Even a few lines make a big difference!

### 5. Get Next Steps

```bash
node bin/lpm.js next
```

The PM agent will tell you exactly what to do next based on your current phase.

### 6. Generate Your First Lovable Prompt

```bash
node bin/lpm.js prompt
```

When asked, describe your first feature. For example:
> "Create a landing page with hero section, feature list, and CTA button"

The PM agent will generate an optimized Lovable.dev prompt you can copy directly into Lovable.

### 7. Implement in Lovable

1. Open your Lovable.dev project
2. Paste the generated prompt
3. Let Lovable build it
4. Test on all breakpoints
5. Pin the version in Lovable

### 8. Mark Task Complete

```bash
node bin/lpm.js complete-task
```

Select the task you just finished. The PM will track your progress.

### 9. Repeat

```bash
node bin/lpm.js next    # Get next task
node bin/lpm.js prompt  # Generate prompt
# Implement in Lovable
node bin/lpm.js complete-task
```

## Common Commands

```bash
# See all available commands
node bin/lpm.js --help

# Project status
node bin/lpm.js status

# Interactive chat
node bin/lpm.js chat

# Generate prompts
node bin/lpm.js prompt

# Next step guidance
node bin/lpm.js next

# Complete tasks
node bin/lpm.js complete-task

# View decisions
node bin/lpm.js decisions

# View knowledge base
node bin/lpm.js knowledge
```

## Tips for Success

### Start Small
Don't try to build everything at once. Start with 2-3 core pages and add features gradually.

### Use Chat Liberally
Whenever you're unsure, ask your PM agent:
```bash
node bin/lpm.js chat
```

### Keep Knowledge Base Updated
As you make decisions and learn patterns, add them to your knowledge base. Future prompts will be better!

### Pin Frequently in Lovable
After every working feature, pin the version in Lovable. Makes it easy to rollback if needed.

### Mobile First
Always test mobile layout first. The PM agent will remind you!

## Example Workflow

```bash
# Morning: Start new feature
node bin/lpm.js next
# Output: "Implement user authentication"

# Generate the prompt
node bin/lpm.js prompt
# Describe: "Add email/password authentication"

# Copy prompt to Lovable → Build → Test

# Mark complete
node bin/lpm.js complete-task

# Check progress
node bin/lpm.js status

# Afternoon: Next feature
node bin/lpm.js next
# Repeat process
```

## When You Need Help

### Stuck on a Decision?
```bash
node bin/lpm.js chat
```
> "Should I use Supabase or Firebase for the backend?"

### Not Sure What to Do Next?
```bash
node bin/lpm.js next
```

### Feature Feels Too Complex?
```bash
node bin/lpm.js chat
```
> "The user profile feature feels overwhelming. Help me break it down."

### Lost Track of Progress?
```bash
node bin/lpm.js status
```

## Troubleshooting

### "Project not initialized" error
Run `node bin/lpm.js init` first

### "ANTHROPIC_API_KEY not found" error
Make sure you:
1. Copied `.env.example` to `.env`
2. Added your API key to `.env`
3. Restarted your terminal

### PM Agent responses seem generic
Update your knowledge base with more project-specific details:
```bash
code .lovable-pm/knowledge-base.md
```

## Next Steps

Once you're comfortable:
1. Read the [Complete Workflow Guide](docs/workflow-guide.md)
2. Check out the [Example Project](docs/examples/example-project.md)
3. Review [Lovable.dev Methodology](docs/lovable-methodology.md)

## Ready to Build?

```bash
node bin/lpm.js init
```

Your AI PM is ready to guide you! 🚀

---

**Questions?** Open an issue or check the [full README](README.md).
