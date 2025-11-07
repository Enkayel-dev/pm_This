# Contributing to Lovable PM Agent

Thank you for your interest in contributing! This project aims to help developers succeed with Lovable.dev through AI-powered project management.

## How to Contribute

### Reporting Issues
- Use GitHub Issues to report bugs
- Include reproduction steps
- Share your environment details
- Describe expected vs actual behavior

### Suggesting Features
- Open a GitHub Issue with the `enhancement` label
- Describe the use case
- Explain how it aligns with Lovable.dev best practices
- Consider if it fits the PM agent's role

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/lovable-pm-agent.git
cd lovable-pm-agent

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Anthropic API key to .env

# Test the CLI
node bin/lpm.js --help
```

## Project Structure

```
lovable-pm-agent/
├── bin/
│   └── lpm.js              # CLI entry point
├── src/
│   ├── pm-agent.js         # Core PM agent with Claude
│   └── project-manager.js  # Project state management
├── docs/
│   ├── lovable-methodology.md  # Lovable.dev best practices
│   ├── workflow-guide.md       # Complete usage guide
│   └── examples/               # Example projects
└── package.json
```

## Areas for Contribution

### 1. PM Agent Intelligence
- Improve prompting strategies
- Add more decision-making logic
- Enhance context understanding
- Better phase transition logic

### 2. CLI Features
- Additional commands
- Better progress visualization
- Export/import project configs
- Team collaboration features

### 3. Templates
- More project templates
- Industry-specific workflows
- Component libraries
- Best practice prompts

### 4. Documentation
- More examples
- Video tutorials
- Integration guides
- Troubleshooting tips

### 5. Testing
- Unit tests for core logic
- Integration tests for CLI
- E2E workflow tests
- PM agent response validation

## Coding Standards

### JavaScript/Node.js
- Use ES modules (`import/export`)
- Async/await for asynchronous operations
- Clear, descriptive variable names
- Comments for complex logic

### CLI Design
- Commands should be intuitive
- Provide helpful error messages
- Use colors meaningfully (chalk)
- Show progress for long operations (ora)

### PM Agent Prompts
- Follow the Lovable.dev methodology
- Be specific and actionable
- Include guardrails
- Structure clearly

## Testing Your Changes

### Manual Testing

1. Initialize a test project:
```bash
cd /tmp/test-project
node /path/to/lovable-pm-agent/bin/lpm.js init
```

2. Test all commands:
```bash
# Status
node /path/to/lpm.js status

# Chat (requires API key)
node /path/to/lpm.js chat

# Prompt generation
node /path/to/lpm.js prompt

# Next step
node /path/to/lpm.js next

# Complete task
node /path/to/lpm.js complete-task

# Decisions
node /path/to/lpm.js decisions

# Knowledge base
node /path/to/lpm.js knowledge
```

3. Test edge cases:
- Project not initialized
- Missing API key
- Invalid inputs
- Empty knowledge base

### Automated Testing (Coming Soon)

We're working on a test suite. Contributions welcome!

## Improving the PM Agent

The PM agent's effectiveness depends on:

1. **System Prompt Quality**: Located in `src/pm-agent.js` → `getSystemPrompt()`
2. **Methodology Accuracy**: Located in `docs/lovable-methodology.md`
3. **Context Management**: How project context is passed to Claude

When improving the agent:
- Test with real projects
- Compare responses to expected guidance
- Ensure alignment with Lovable.dev best practices
- Keep responses actionable

## Adding New Commands

Example of adding a new command to the CLI:

```javascript
// In bin/lpm.js

program
  .command('my-command')
  .description('Description of what it does')
  .action(async () => {
    const pm = new ProjectManager();

    // Check if initialized
    if (!pm.isInitialized()) {
      console.log(chalk.red('\n❌ Project not initialized.\n'));
      return;
    }

    // Your command logic here
    console.log(chalk.cyan('Command executed!'));
  });
```

## Documentation Standards

- Use clear, simple language
- Include code examples
- Add real-world use cases
- Keep guides step-by-step
- Update README if adding features

## Questions?

- Open a GitHub Discussion
- Check existing Issues
- Review the workflow guide in `docs/workflow-guide.md`

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making Lovable PM Agent better! 🚀
