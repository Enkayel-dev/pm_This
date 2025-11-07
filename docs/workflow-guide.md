# Lovable PM Agent - Complete Workflow Guide

This guide walks you through a complete development workflow using the Lovable PM Agent.

## 🎬 Starting a New Project

### Step 1: Initialize Your Project

```bash
lpm init
```

Answer the questions:
- **Project name**: "Task Tracker Pro"
- **Description**: "A modern task management app for remote teams"
- **Guidelines**: "Focus on simplicity, mobile-first design, clean UI"
- **Integrations**: Select Supabase and Stripe

### Step 2: Set Up Your Knowledge Base

Edit `.lovable-pm/knowledge-base.md` with your project details:

```markdown
# Task Tracker Pro Knowledge Base

## Project Guidelines
- Mobile-first: All features must work perfectly on mobile
- Simplicity: Every screen should have one clear purpose
- Speed: Fast loading, instant feedback
- Accessibility: WCAG 2.1 AA compliance

## User Personas
**Sarah - Remote Team Lead**
- Manages 5-person distributed team
- Needs quick status overview
- Uses mobile 60% of the time
- Values clear communication

**Mike - Developer**
- Part of 3 different project teams
- Needs to track personal tasks across projects
- Desktop power user
- Wants keyboard shortcuts

## Design Assets
### Color Palette
- Primary: #3B82F6 (Blue)
- Secondary: #8B5CF6 (Purple)
- Accent: #10B981 (Green)
- Neutral: #6B7280 (Gray)

### Typography
- Headings: Inter Bold
- Body: Inter Regular
- Code: JetBrains Mono

## Coding Conventions
- Use TypeScript for all new files
- Components in PascalCase
- Hooks start with 'use'
- Group imports: external, internal, types
- Max component length: 200 lines

## External References
- Design inspiration: Linear.app, Height.app
- API: RESTful endpoints, JWT auth
- Database: Supabase PostgreSQL

## Security Practices
- All user inputs sanitized
- API keys in environment variables
- Row Level Security (RLS) for all tables
- HTTPS only, no exceptions
```

### Step 3: Check Your Status

```bash
lpm status
```

You'll see:
- Current phase: Planning & Setup
- Tasks to complete
- Progress: 0/5

## 📋 Phase 1: Planning & Setup

### Get Guidance on First Steps

```bash
lpm next
```

The PM Agent will tell you exactly what to focus on based on your current phase.

### Chat with Your PM

```bash
lpm chat
```

**Example conversation:**

> **You**: "I'm not sure what pages I need. Can you help me plan the structure?"

> **PM Agent**: "Based on your project (Task Tracker Pro for remote teams), I recommend starting with these core pages:
>
> 1. **Dashboard** - Overview of all tasks, team activity
> 2. **Tasks List** - Main task management view
> 3. **Task Detail** - Individual task with comments, subtasks
> 4. **Projects** - Organize tasks into projects
> 5. **Team** - Team members and permissions
>
> Start with just Dashboard and Tasks List to validate the core experience. We can add the others in Phase 3.
>
> Should I help you structure the Lovable prompt for these two pages?"

> **You**: "Yes, let's start with those two pages."

### Complete Planning Tasks

As you complete each planning task, mark them:

```bash
lpm complete-task
```

Select:
1. ✅ Define project overview
2. ✅ Set up knowledge base
3. ✅ Identify user personas
4. ✅ Plan page structure

Once all tasks are done, the PM will suggest moving to the next phase.

## 🏗️ Phase 2: Foundation

### Generate Your First Lovable Prompt

```bash
lpm prompt
```

**Describe the feature**:
> "Create the initial app structure with Dashboard and Tasks List pages. Include navigation between them and a basic layout with header and sidebar."

**The PM Agent generates an optimized prompt**:

```
# Task Tracker Pro - Initial Structure

## Project Overview
Building a modern task management app for remote teams. Mobile-first focus with clean, simple UI. Target users are team leads and developers who need quick task overview and management.

## Pages to Create

### 1. Dashboard (Landing Page)
- Header with app logo and user menu
- Sidebar navigation (Dashboard, Tasks, [Projects], [Team])
- Main content area showing:
  - Welcome message with user name
  - Quick stats: Total tasks, Completed, In Progress, Overdue
  - Recent activity feed (latest 5 task updates)
  - Quick action button: "New Task"
- Responsive design with collapsible sidebar on mobile

### 2. Tasks List Page
- Same header and sidebar layout
- Filters: All, Active, Completed
- Sort options: Due date, Priority, Created date
- Task list showing:
  - Task title
  - Due date with color coding (overdue = red, due soon = yellow)
  - Priority badge (High, Medium, Low)
  - Project tag
  - Checkbox to mark complete
- "New Task" button (fixed position on mobile)
- Empty state when no tasks

## Navigation Logic
- Clicking "Dashboard" in sidebar → Dashboard page
- Clicking "Tasks" in sidebar → Tasks List page
- Clicking "New Task" button → Opens task creation modal
- Projects and Team are disabled/grayed (coming in later phase)

## Implementation Order
1. Create basic layout with header and sidebar
2. Add Dashboard page with mock data
3. Add Tasks List page with mock data
4. Implement navigation between pages
5. Test on mobile, tablet, desktop breakpoints

## Design Guidelines (from Knowledge Base)
- Colors: Primary #3B82F6, Accent #10B981
- Typography: Inter font family
- Mobile-first: Test mobile layout first
- Keep it simple: One clear action per screen

## Guardrails
- Don't implement backend/database yet (Phase 4)
- Don't add Projects or Team pages (Phase 3)
- Use static mock data for now
- Focus on layout and navigation only
```

### Copy to Lovable

1. Open your Lovable.dev project
2. Paste the prompt
3. Let Lovable build the initial structure

### Test in Lovable

- Check all breakpoints (mobile, tablet, desktop)
- Navigate between pages
- Verify the layout matches expectations

### Pin Your Version

Once it's working:
1. In Lovable, click "Pin Version"
2. Add note: "Initial structure - Dashboard and Tasks pages"

### Mark Foundation Complete

```bash
lpm complete-task
```

Complete all foundation tasks, then move to Phase 3.

## ✨ Phase 3: Feature Development

### Check Next Steps

```bash
lpm next
```

PM Agent suggests implementing features one at a time.

### Generate Feature Prompts

```bash
lpm prompt
```

**Feature**: "Task creation - allow users to create new tasks with title, description, due date, priority"

**PM Agent generates**:
```
# Task Tracker Pro - Task Creation Feature

## Feature Overview
Implement task creation functionality allowing users to add new tasks with all necessary details.

## Implementation Details

### Task Creation Modal
- Triggered by "New Task" button on Dashboard or Tasks List
- Modal overlay with form containing:
  - Title (required, text input)
  - Description (optional, textarea)
  - Due Date (date picker)
  - Priority (dropdown: High, Medium, Low)
  - Project (dropdown, optional - "Personal" default)
- Cancel and Save buttons
- Form validation for required fields

### UI/UX Considerations
- Modal should be responsive (full screen on mobile)
- Auto-focus on title field when opened
- Show validation errors inline
- Disable Save button until required fields filled
- Close modal with ESC key
- Close modal when clicking outside (with confirmation if form has data)

### After Creation
- Close modal
- Show success toast: "Task created"
- If on Tasks List: Add new task to top of list
- If on Dashboard: Increment task count, show in recent activity

### Data Structure (Mock for now)
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: 'high' | 'medium' | 'low';
  project: string;
  completed: boolean;
  createdAt: Date;
}
```

## Implementation Order
1. Create TaskCreationModal component
2. Add form fields with validation
3. Connect "New Task" buttons to open modal
4. Implement form submission (add to local state for now)
5. Add success feedback
6. Test on all breakpoints

## Guardrails
- Don't connect to backend yet (that's Phase 4)
- Store tasks in component state for now
- Keep the form simple - we can add more fields later
- Focus on the user experience

## Knowledge Base Reference
- Mobile-first: Make sure form works great on mobile
- Instant feedback: Show validation immediately
- Simplicity: Every field should be necessary
```

### Implement in Lovable

1. Paste the prompt in Lovable
2. Test the feature thoroughly
3. Use "Try to Fix" for minor issues
4. Switch to Chat Mode if you hit 3 failed fixes
5. Pin version after feature works

### Track Your Progress

```bash
lpm complete-task
# Select: "Task creation feature"

lpm status
# Check progress
```

### Repeat for Each Feature

1. Plan the feature (chat with PM if needed)
2. Generate optimized prompt
3. Implement in Lovable
4. Test thoroughly
5. Pin stable version
6. Mark task complete
7. Move to next feature

## 🔌 Phase 4: Integration

### Supabase Integration

**⚠️ Important**: Only integrate Supabase AFTER your front-end is stable!

```bash
lpm chat
```

> **You**: "I'm ready to add Supabase. What should I do first?"

> **PM Agent**: "Great timing! Your front-end is stable. Here's the Supabase integration plan:
>
> **Step 1: Plan Database Schema**
> Before prompting Lovable, design your schema:
>
> Tables needed:
> - `profiles` (user data)
> - `projects` (project grouping)
> - `tasks` (main tasks table)
> - `comments` (task comments)
>
> **Step 2: Set Up in Supabase Dashboard**
> 1. Create new Supabase project
> 2. Create tables manually or use Lovable to generate SQL
> 3. Set up Row Level Security (RLS) policies
> 4. Get your Supabase URL and anon key
>
> **Step 3: Prompt Lovable for Integration**
> Ask Lovable to:
> - Connect to Supabase using your credentials
> - Replace mock data with Supabase queries
> - Add auth with Supabase Auth
>
> Should I generate the Supabase integration prompt for you?"

### Generate Integration Prompt

```bash
lpm prompt
```

The PM Agent will generate a comprehensive Supabase integration prompt with:
- Schema setup
- Authentication flow
- Data fetching patterns
- Error handling

### After Integration

```bash
lpm complete-task
# Mark Supabase integration complete

lpm status
# Check progress
```

## 🎨 Phase 5: Refinement & Testing

### Test All Breakpoints

```bash
lpm next
```

PM Agent provides a testing checklist:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1280px)
- [ ] Large desktop (1920px)

### Refactor Complex Components

```bash
lpm prompt
```

> "Refactor the TaskList component to improve code structure while keeping behavior identical"

### Final Steps

1. Test thoroughly on all devices
2. Optimize performance
3. Update documentation
4. Mark all tasks complete

```bash
lpm complete-task
```

When all refinement tasks are done:

```bash
lpm status
```

🎉 **All phases completed!**

## 🎯 Tips for Success

### Use Chat Mode Frequently

Don't hesitate to ask your PM:
- "What should I work on next?"
- "Is this the right approach?"
- "Should I refactor now or later?"
- "What's the best way to handle X?"

### Break Down Complex Features

If a feature feels overwhelming:
```bash
lpm chat
```

> "The user profile feature feels complex. Can you help me break it down?"

### Track Decisions

Important decisions are automatically tracked. View them:
```bash
lpm decisions
```

### Keep Knowledge Base Updated

As you make decisions and learn, update your knowledge base:
```bash
# Edit .lovable-pm/knowledge-base.md
```

Add:
- Patterns that work well
- Things to avoid
- API quirks
- Component conventions

### Pin Frequently

In Lovable:
- Pin after every working feature
- Pin before trying risky changes
- Pin before integrations

Compare versions visually if bugs appear.

## 🚨 When Things Go Wrong

### Stuck in a Bug Loop?

1. Stop using "Try to Fix" after 3 attempts
2. Use Chat Mode in Lovable to discuss the issue
3. Or chat with your PM Agent for guidance
4. Consider reverting to last pinned version
5. If really stuck, Remix the project

### PM Agent Not Understanding Context?

Make sure your knowledge base is up to date:
```bash
lpm knowledge
```

Update with current patterns and decisions.

### Lost Track of Progress?

```bash
lpm status
```

Shows exactly where you are and what's next.

## 🎓 Learning from the PM Agent

The PM Agent is trained on Lovable.dev best practices. Use it to:

- **Learn prompting techniques**: Study the prompts it generates
- **Understand best practices**: Ask "why" questions
- **Get unstuck**: Discuss problems before implementing
- **Make better decisions**: Review options with the PM

## 🏁 Ready to Start?

```bash
lpm init
```

Your AI PM is ready to guide you! 🚀

---

**Questions?** Chat with your PM agent anytime:
```bash
lpm chat
```
