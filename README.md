# Lovable PM Agent

An AI-powered Project Manager agent that guides you through building applications with Lovable.dev using industry best practices.

## 🎯 What is this?

This is a project management system that acts as your AI PM, keeping you on track when building with Lovable.dev. It:

- **Guides you through structured development phases** (Planning → Foundation → Features → Integration → Refinement)
- **Prompts you for key decisions** at the right moments
- **Generates optimized Lovable.dev prompts** following best practices
- **Maintains project knowledge** across development sessions
- **Tracks progress** through phases and tasks
- **Ensures best practices** from the Lovable.dev methodology

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration

Create a `.env` file in the project root:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Get your API key from: https://console.anthropic.com/

## 📖 Quick Start

### 1. Initialize a new project

```bash
node bin/lpm.js init
```

This will:
- Ask you about your project
- Set up the project structure in `.lovable-pm/`
- Create a knowledge base template
- Initialize development phases

### 2. Check your status

```bash
node bin/lpm.js status
```

See your current phase, tasks, and progress.

### 3. Chat with the PM Agent

```bash
node bin/lpm.js chat
```

Start an interactive session with your AI PM. Ask questions like:
- "What should I focus on first?"
- "Help me structure the knowledge base"
- "What's the best way to implement user authentication?"
- "Should I integrate Supabase now or later?"

### 4. Generate Lovable prompts

```bash
node bin/lpm.js prompt
```

Describe a feature, and the PM agent will generate an optimized Lovable.dev prompt following best practices.

### 5. Get next step guidance

```bash
node bin/lpm.js next
```

Get AI-powered guidance on what to do next based on your current phase and project context.

## 🎨 Development Workflow

The PM Agent guides you through these phases:

### Phase 1: Planning & Setup
- Define project overview
- Set up knowledge base
- Identify user personas
- Plan page structure
- Determine integrations needed

### Phase 2: Foundation
- Create initial project structure in Lovable
- Set up basic layout and navigation
- Implement design system
- Pin stable foundation version

### Phase 3: Feature Development
- Implement features one at a time
- Use structured prompts
- Test each feature before moving on
- Keep knowledge base updated

### Phase 4: Integration
- Add Supabase (if needed)
- Integrate Stripe (if needed)
- Set up GitHub sync
- Test integrations thoroughly

### Phase 5: Refinement & Testing
- Test on all breakpoints (mobile-first!)
- Refactor complex components
- Optimize performance
- Update final documentation

## 📋 Commands Reference

| Command | Description |
|---------|-------------|
| `lpm init` | Initialize a new project |
| `lpm status` | Show current project status |
| `lpm chat` | Interactive chat with PM agent |
| `lpm prompt` | Generate optimized Lovable prompt |
| `lpm next` | Get next step guidance |
| `lpm complete-task` | Mark a task as completed |
| `lpm decisions` | View project decisions |
| `lpm knowledge` | View knowledge base |

## 🗂️ Project Structure

After initialization, you'll have:

```
.lovable-pm/
├── project.json          # Project configuration
├── knowledge-base.md     # Your project's knowledge base
├── phases.json          # Development phases and tasks
└── decisions.json       # Decision history
```

## 💡 Tips for Success

### 1. Invest in your Knowledge Base
The knowledge base is sent with every Lovable prompt. Even a few lines make a big difference:
- Add coding conventions
- Define your design system
- Document user personas
- Include API references

### 2. Use the Chat Mode
When stuck, chat with the PM agent before making changes:
- "Should I refactor this component?"
- "What's the best approach for X?"
- "Help me decide between option A and B"

### 3. Break Down Features
The PM agent will help you break complex features into manageable pieces:
- Implement one thing at a time
- Test thoroughly before moving on
- Update the knowledge base with learnings

### 4. Follow the Phases
Don't skip phases! Each phase builds on the previous:
- Stable foundation = easier feature development
- Front-end first = fewer Supabase headaches
- Test early = catch issues faster

## 🔧 Lovable.dev Best Practices (Built-in)

The PM agent knows and enforces these best practices:

### Prompting
- ✅ Specific and verbose prompts
- ✅ Add guardrails ("don't touch component X")
- ✅ Break down complex tasks
- ✅ Use Chat Mode when planning

### Development
- ✅ Mobile-first design
- ✅ Pin stable versions
- ✅ Refactor regularly
- ✅ Document decisions

### Integration
- ⚠️ Supabase after front-end is stable
- ✅ Test integrations thoroughly
- ✅ Validate schema on reverts

## 📚 Methodology

The PM agent follows the complete Lovable.dev methodology documented in `docs/lovable-methodology.md`.

Key principles:
- **Documentation as Infrastructure**: Your knowledge base is active thought infrastructure
- **Multi-Perspective Development**: View problems from UX, Product, and Architecture angles
- **Iterative Cycles**: Expansion → Refinement → Integration

## 🤝 Working with the PM Agent

The PM Agent is designed to:
- **Ask clarifying questions** before assumptions
- **Suggest best practices** at relevant moments
- **Break down complexity** into manageable tasks
- **Prompt for decisions** when needed
- **Keep you focused** on one thing at a time

Think of it as your AI project manager who knows Lovable.dev inside and out.

## 🛠️ Example Workflow

```bash
# Initialize project
lpm init

# Edit knowledge base with your project details
# Edit .lovable-pm/knowledge-base.md

# Get guidance on first steps
lpm next

# Generate your first Lovable prompt
lpm prompt

# After implementing in Lovable, mark task complete
lpm complete-task

# Check progress
lpm status

# Get guidance on next steps
lpm next

# Chat when you need help deciding
lpm chat
```

## 🔐 Environment Variables

Required:
- `ANTHROPIC_API_KEY` - Your Anthropic API key

Optional:
- `NODE_ENV` - Set to `production` for production use

## 📄 License

MIT

## 🤖 About

Built to help developers succeed with Lovable.dev by providing structured guidance, best practices, and AI-powered project management.

---

**Ready to build something amazing?** Run `lpm init` to get started! 🚀
