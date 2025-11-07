# Example Project: Recipe Sharing App

This is a complete walkthrough of building a recipe sharing app with the Lovable PM Agent.

## Initial Setup

```bash
lpm init
```

**Answers**:
- Name: "TastyShare"
- Description: "A social recipe sharing platform for home cooks"
- Guidelines: "Focus on beautiful food photography, easy recipe discovery, community features"
- Integrations: Supabase, Stripe (for premium features)

## Knowledge Base Setup

Edit `.lovable-pm/knowledge-base.md`:

```markdown
# TastyShare Knowledge Base

## Project Guidelines
- **Visual First**: Large, beautiful food photos are priority #1
- **Discovery**: Make it easy to find recipes by cuisine, diet, difficulty
- **Community**: Comments, ratings, and user profiles matter
- **Mobile-First**: Most users will browse recipes on mobile while cooking

## User Personas

**Emma - Home Cook Enthusiast**
- Age 32, works from home
- Cooks dinner 5-6 nights/week
- Discovers recipes on Instagram, wants them organized
- Uses tablet in kitchen while cooking
- Values: Easy instructions, ingredient lists, cooking tips

**Marcus - Weekend Chef**
- Age 28, busy professional
- Cooks elaborate meals on weekends
- Wants to impress friends
- Shares photos of dishes on social media
- Values: Impressive recipes, step-by-step photos, techniques

## Design Assets

### Color Palette
- Primary: #FF6B35 (Warm Orange)
- Secondary: #F7931E (Golden)
- Accent: #4ECDC4 (Teal)
- Background: #FFF8F0 (Warm White)
- Text: #2D3142 (Dark Blue-Gray)

### Typography
- Headings: Playfair Display (elegant serif)
- Body: Lato (clean sans-serif)
- Accent: Dancing Script (for featured recipes)

### Image Guidelines
- Hero images: 16:9 ratio, minimum 1200px wide
- Recipe cards: 4:3 ratio, 800px wide
- Profile photos: 1:1 ratio, 400px
- Always show food, not people (keep focus on recipes)

## Coding Conventions
- Recipe components go in `/components/recipes/`
- User components in `/components/users/`
- Shared components in `/components/common/`
- All images use Next.js Image component
- Recipe data structure is immutable

## API & Data Structure

### Recipe Object
```typescript
interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorId: string;
  ingredients: Ingredient[];
  steps: Step[];
  cuisine: string;
  dietaryTags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  createdAt: Date;
  rating: number;
  ratingCount: number;
}
```

## Security Practices
- Image uploads: Validate file type and size
- User-generated content: Sanitize all inputs
- Recipe ownership: Users can only edit their own recipes
- RLS: Users see all public recipes, only their own drafts

## Feature Priority (MVP)
1. Browse recipes (grid with filters)
2. View recipe details
3. User authentication
4. Create/edit recipes
5. Save favorites
6. Rate and comment
7. Premium features (Stripe)

## Design Inspiration
- Allrecipes.com (recipe detail layout)
- Tasty.co (grid and video style)
- Notion (clean editing interface)
```

## Phase 1: Planning (Completed)

All planning tasks completed with PM Agent guidance.

## Phase 2: Foundation

### Generate Initial Structure Prompt

```bash
lpm prompt
```

**Feature description**:
> "Create the initial app structure with home page showing recipe grid, recipe detail page, and basic navigation"

**PM Agent generates** (abbreviated):
```
# TastyShare - Initial Structure

## Project Overview
A visual-first recipe sharing platform for home cooks. Primary focus on beautiful food photography and easy recipe discovery.

## Pages to Create

### 1. Home Page (Landing)
- Hero section with featured recipe of the day
- Recipe grid (3 columns desktop, 2 tablet, 1 mobile)
- Each recipe card shows:
  - Large recipe image (4:3 ratio)
  - Recipe title (Playfair Display font)
  - Author name and avatar
  - Cooking time and difficulty badge
  - Rating stars
- Filter bar: Cuisine, Diet, Difficulty
- Search bar in header

### 2. Recipe Detail Page
- Large hero image (16:9)
- Recipe title and description
- Author info with follow button
- Save/favorite button
- Rating display
- Two-column layout:
  - Left: Ingredients list with checkboxes
  - Right: Step-by-step instructions
- Cooking times and servings info
- Tags (cuisine, dietary)
- Comments section below
- Related recipes at bottom

### 3. Navigation
- Header with logo, search, user menu
- Mobile: Bottom navigation (Home, Search, Profile)

## Implementation Order
1. Create layout with header
2. Build home page with mock recipe data (8 recipes)
3. Create recipe card component
4. Build recipe detail page
5. Add navigation between pages
6. Test all breakpoints

## Guardrails
- Use static mock data (provided below)
- Don't implement auth yet
- Don't add creation features yet
- Focus on browsing experience
- Images use placeholder URLs for now

## Mock Data
[... PM includes sample recipe data ...]
```

### Implement in Lovable

Copy prompt to Lovable → Build → Test → Pin version ✅

## Phase 3: Feature Development

### Feature 1: Recipe Creation

```bash
lpm prompt
```

> "Implement recipe creation flow - multi-step form where users can add title, description, ingredients, instructions, and upload image"

PM Agent generates detailed prompt with:
- Multi-step wizard UI
- Form validation
- Image upload placeholder
- Save as draft feature

Implement → Test → Pin ✅

### Feature 2: User Authentication

```bash
lpm chat
```

> **You**: "Ready to add authentication. What's the best approach?"

> **PM Agent**: "For TastyShare, I recommend Supabase Auth with Google and Email signin. Here's why:
>
> **Google Auth**: Your users (Emma, Marcus) likely prefer quick social login
> **Email/Password**: Backup for users who prefer privacy
>
> Authentication should gate:
> - Creating recipes
> - Saving favorites
> - Rating/commenting
>
> But keep browsing public - SEO matters for recipe discovery.
>
> Should I generate the Supabase Auth prompt?"

```bash
lpm prompt
```

> "Add Supabase authentication with Google and email signin"

Implement → Test → Pin ✅

### Feature 3: Favorites System

```bash
lpm prompt
```

> "Add ability to save favorite recipes - heart icon on cards, saved recipes page"

Implement → Test → Pin ✅

Continue for remaining features...

## Phase 4: Integration

### Supabase Setup

```bash
lpm chat
```

> **You**: "Front-end is stable. Ready to integrate Supabase."

> **PM Agent**: "Perfect! Here's your Supabase integration plan:
>
> **Database Schema**:
> 1. `profiles` table (extends auth.users)
> 2. `recipes` table (main recipe data)
> 3. `ingredients` table (linked to recipes)
> 4. `steps` table (linked to recipes)
> 5. `favorites` table (user → recipe mapping)
> 6. `ratings` table (user ratings)
> 7. `comments` table (recipe comments)
>
> **RLS Policies**:
> - Recipes: Public read, authenticated create, owner update/delete
> - Favorites: User can only see/modify their own
> - Ratings: One rating per user per recipe
>
> I'll generate a Supabase setup prompt with schema and RLS policies. Ready?"

```bash
lpm prompt
```

> "Integrate Supabase - set up schema for recipes, connect all features to database"

**PM generates comprehensive prompt with**:
- SQL schema
- RLS policies
- Migration from mock data to Supabase
- Error handling

Implement → Test thoroughly → Pin ✅

### Stripe Integration (Premium Features)

```bash
lpm prompt
```

> "Add Stripe subscription for premium features: ad-free, unlimited recipes, advanced search"

Implement → Test → Pin ✅

## Phase 5: Refinement

### Testing Checklist

```bash
lpm next
```

PM Agent provides:
- Mobile testing checklist
- Performance optimization suggestions
- Accessibility improvements
- Edge cases to test

### Refactoring

```bash
lpm prompt
```

> "Refactor RecipeCard component - it's gotten complex with favorites, ratings, and premium badges"

Implement → Test → Pin ✅

### Final Polish

- Image optimization
- Loading states
- Error boundaries
- SEO meta tags

```bash
lpm complete-task
# Complete all refinement tasks
```

## 🎉 Launch Ready!

```bash
lpm status
```

**Output**:
```
📊 Project Status

Project: TastyShare
Description: A social recipe sharing platform for home cooks
Created: [date]

Current Phase: Refinement & Testing (completed)

Tasks:
  ✓ Test on all breakpoints
  ✓ Refactor complex components
  ✓ Optimize performance
  ✓ Final documentation update

Progress: 4/4 (100%)

Integrations:
  ✓ supabase
  ✓ stripe
  ○ github

✓ No pending decisions

🎉 All phases completed!
```

## Lessons Learned

Throughout development, the PM Agent:

1. **Kept us focused** - One feature at a time, always mobile-first
2. **Prevented mistakes** - Warned against integrating Supabase too early
3. **Structured prompts** - Generated consistently excellent Lovable prompts
4. **Made decisions easier** - Helped choose between options
5. **Tracked progress** - Always knew what to do next

## Final Project Structure

```
TastyShare/
├── Home Page (Recipe Grid)
├── Recipe Detail Page
├── Create/Edit Recipe
├── User Profile
├── Saved Recipes
├── Search & Filters
└── Premium Subscription

Integrations:
✓ Supabase (Auth, Database)
✓ Stripe (Subscriptions)
✓ GitHub (Version Control)
```

## Time Spent

- Planning: 2 hours
- Foundation: 4 hours
- Feature Development: 12 hours
- Integration: 6 hours
- Refinement: 4 hours

**Total: ~28 hours** for a production-ready app

Without PM Agent guidance: Estimated 40-50 hours with more mistakes and rework.

---

**Your turn!** What will you build? 🚀

```bash
lpm init
```
