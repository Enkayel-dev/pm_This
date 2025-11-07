# Lovable.dev Development Methodology

## Overview
This document outlines the best practices for using Lovable.dev to build applications effectively. The PM Agent uses this methodology to guide development.

## Project Knowledge & Context Management

The Knowledge Base is your project's brain, sent with every prompt to help AI understand full context.

### Essential Knowledge Base Content:
- **Project guidelines**: What to prioritize, avoid, and how decisions should be made
- **User personas**: Detailed descriptions of target users and their needs
- **Design assets**: Color palettes, typography, layout rules
- **Coding conventions**: Naming conventions, formatting rules, file structure
- **External references**: Links to API docs, internal tools, design systems
- **Security practices**: Guidelines for secure coding and data protection
- **Compliance requirements**: Legal or regulatory requirements

**Pro Tip**: Start small—even a few lines can make a meaningful difference. Think of it as shared memory for future edits.

## Optimal Prompting Methodology

### Structured Prompt Format
Use this format for well-structured prompts:
1. **Project Overview**
2. **Page Structure**
3. **Navigation Logic**
4. **Screenshots/Wireframes**
5. **Implementation Order**

### Key Prompting Principles:

#### 1. Be Specific and Verbose
- Mention exact pages and expected behavior
- Use natural language
- Add screenshots for bugs or UX issues

#### 2. Add Guardrails
Tell the AI what not to touch:
```
"Please don't touch component A, layout B, or shared logic unless necessary"
```

#### 3. Break Down Complex Tasks
- Tackle smaller tasks for better testing
- Reduce complexity by starting broad and refining
- Avoid implementing 5 things at once

#### 4. Use Chat Mode Strategically
Switch to Chat Mode when:
- After 2-3 failed "Try to Fix" attempts
- Debugging complex logic
- Planning new features (avoid code edits until ready)

#### 5. Mobile-First Design
- Always make things responsive on all breakpoints
- Use ShadCN and Tailwind built-in breakpoints
- Create a phased plan before editing code

## Advanced Development Techniques

### Documentation as Infrastructure
- Create documentation that serves as active thought infrastructure
- Have Lovable document key decisions and reasoning flows
- Reference documentation before making changes
- Creates continuity across development sessions

### Multi-Perspective Development
Approach architecture from specific perspectives:
- **Senior UX Strategist**: User experience and interface design
- **Product Manager**: Feature prioritization and requirements
- **VP of Product**: Strategic alignment and roadmap
- **Cognitive Architect**: Build reasoning pathways, not hardcoded solutions

### Iterative Development Cycles
Work in structured cycles:
1. **Expansion**: Let AI explore possibilities
2. **Refinement**: Focus and optimize
3. **Integration**: Lock in learnings through documentation

## Tool Integration Best Practices

### Supabase Integration
Lovable integrates with Supabase for backend services.

**Usage Example**:
```
"When a user submits the feedback form, analyze the text using OpenAI
and store a sentiment score"
```

**⚠️ CRITICAL WARNING**:
- Supabase does not revert cleanly
- If you revert a version, your database schema may break
- Connect Supabase AFTER front-end is stable
- Always validate SQL schema when reverting

### Stripe Payment Integration
For payment processing:
- Prompt Lovable to add checkout functionality
- Creates Edge Functions that communicate with Stripe's API
- Uses securely stored secret keys
- Updates UI and handles responses

### GitHub & Version Control
- Every edit is a commit
- Use pinning to mark stable versions after every working feature
- Compare versions visually after bugs

## Common Pitfalls & Troubleshooting

### Debugging Strategy
1. Review console logs
2. Use breakpoints to inspect state changes
3. Validate network requests for data flow

### When to Stop "Try to Fix"
- **USE** for minor syntax errors
- **AVOID** for complex issues after 3 attempts
- Can lead to AI-generated inconsistencies
- Consider rephrasing the prompt or manually debugging

### When to Remix
Remix creates a clean copy of your project when:
- Stuck in a buggy loop
- Want to restart clean with preserved history
- Can rebuild with better prompting and clearer knowledge

## Refactoring & Code Quality

Refactor regularly after:
- Completing major features
- Before integrating new functionality
- Ensures code remains readable and optimized

**Example Refactoring Prompt**:
```
"Refactor the ProjectList component file, but keep its behavior and UI
exactly the same. Goals: improve code structure and readability, remove
unused variables, and ensure it follows best practices"
```

## Supporting Tools & Resources

- **Visual Edit Tool**: Quick UI fixes (text, colors, fonts, layout)
  - Free, fast, safe commits with undo

- **Code Mode**: View and edit code directly in Lovable
  - No GitHub connection required

- **21st.dev**: Enhance UI components alongside Lovable

## Key Success Principles

The key to success with Lovable.dev is:
1. Treat it as a **collaborative thought partner**, not just a code generator
2. Invest in proper **project documentation**
3. Use **clear and specific prompts**
4. Iterate in **structured cycles**

---

*This methodology is the foundation of the PM Agent's guidance system.*
