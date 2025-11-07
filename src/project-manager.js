import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export class ProjectManager {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.configDir = join(projectRoot, '.lovable-pm');
    this.configFile = join(this.configDir, 'project.json');
    this.knowledgeBaseFile = join(this.configDir, 'knowledge-base.md');
    this.phasesFile = join(this.configDir, 'phases.json');
    this.decisionsFile = join(this.configDir, 'decisions.json');

    this.ensureConfigDir();
  }

  ensureConfigDir() {
    if (!existsSync(this.configDir)) {
      mkdirSync(this.configDir, { recursive: true });
    }
  }

  initializeProject(projectData) {
    const defaultConfig = {
      name: projectData.name || 'Lovable Project',
      description: projectData.description || '',
      created: new Date().toISOString(),
      currentPhase: 'planning',
      integrations: {
        supabase: false,
        stripe: false,
        github: false
      },
      ...projectData
    };

    this.saveConfig(defaultConfig);
    this.initializeKnowledgeBase(projectData);
    this.initializePhases();
    this.initializeDecisions();

    return defaultConfig;
  }

  initializeKnowledgeBase(projectData) {
    const template = `# ${projectData.name || 'Project'} Knowledge Base

## Project Guidelines
<!-- What to prioritize, avoid, and how decisions should be made -->

${projectData.guidelines || ''}

## User Personas
<!-- Detailed descriptions of target users and their needs -->

${projectData.personas || ''}

## Design Assets
<!-- Color palettes, typography, layout rules -->

### Color Palette
${projectData.colors || '- Primary: \n- Secondary: \n- Accent: '}

### Typography
${projectData.typography || '- Headings: \n- Body: '}

## Coding Conventions
<!-- Naming conventions, formatting rules, file structure -->

${projectData.conventions || ''}

## External References
<!-- Links to API docs, internal tools, design systems -->

${projectData.references || ''}

## Security Practices
<!-- Guidelines for secure coding and data protection -->

${projectData.security || ''}

## Compliance Requirements
<!-- Legal or regulatory requirements -->

${projectData.compliance || ''}

---
*This knowledge base is sent with every Lovable.dev prompt to maintain context.*
`;

    writeFileSync(this.knowledgeBaseFile, template, 'utf-8');
  }

  initializePhases() {
    const phases = {
      current: 'planning',
      phases: [
        {
          id: 'planning',
          name: 'Planning & Setup',
          status: 'in-progress',
          tasks: [
            { id: 1, description: 'Define project overview', completed: false },
            { id: 2, description: 'Set up knowledge base', completed: false },
            { id: 3, description: 'Identify user personas', completed: false },
            { id: 4, description: 'Plan page structure', completed: false },
            { id: 5, description: 'Determine integrations needed', completed: false }
          ],
          completedAt: null
        },
        {
          id: 'foundation',
          name: 'Foundation',
          status: 'pending',
          tasks: [
            { id: 1, description: 'Create initial project structure prompt', completed: false },
            { id: 2, description: 'Set up basic layout and navigation', completed: false },
            { id: 3, description: 'Implement design system', completed: false },
            { id: 4, description: 'Pin stable foundation version', completed: false }
          ],
          completedAt: null
        },
        {
          id: 'feature-development',
          name: 'Feature Development',
          status: 'pending',
          tasks: [],
          completedAt: null
        },
        {
          id: 'integration',
          name: 'Integration',
          status: 'pending',
          tasks: [],
          completedAt: null
        },
        {
          id: 'refinement',
          name: 'Refinement & Testing',
          status: 'pending',
          tasks: [
            { id: 1, description: 'Test on all breakpoints', completed: false },
            { id: 2, description: 'Refactor complex components', completed: false },
            { id: 3, description: 'Optimize performance', completed: false },
            { id: 4, description: 'Final documentation update', completed: false }
          ],
          completedAt: null
        }
      ]
    };

    writeFileSync(this.phasesFile, JSON.stringify(phases, null, 2), 'utf-8');
  }

  initializeDecisions() {
    const decisions = {
      decisions: [],
      pendingDecisions: []
    };

    writeFileSync(this.decisionsFile, JSON.stringify(decisions, null, 2), 'utf-8');
  }

  loadConfig() {
    if (!existsSync(this.configFile)) {
      return null;
    }
    return JSON.parse(readFileSync(this.configFile, 'utf-8'));
  }

  saveConfig(config) {
    writeFileSync(this.configFile, JSON.stringify(config, null, 2), 'utf-8');
  }

  loadKnowledgeBase() {
    if (!existsSync(this.knowledgeBaseFile)) {
      return null;
    }
    return readFileSync(this.knowledgeBaseFile, 'utf-8');
  }

  updateKnowledgeBase(content) {
    writeFileSync(this.knowledgeBaseFile, content, 'utf-8');
  }

  loadPhases() {
    if (!existsSync(this.phasesFile)) {
      return null;
    }
    return JSON.parse(readFileSync(this.phasesFile, 'utf-8'));
  }

  savePhases(phases) {
    writeFileSync(this.phasesFile, JSON.stringify(phases, null, 2), 'utf-8');
  }

  getCurrentPhase() {
    const phases = this.loadPhases();
    if (!phases) return null;

    return phases.phases.find(p => p.id === phases.current);
  }

  updatePhase(phaseId, updates) {
    const phases = this.loadPhases();
    const phaseIndex = phases.phases.findIndex(p => p.id === phaseId);

    if (phaseIndex !== -1) {
      phases.phases[phaseIndex] = { ...phases.phases[phaseIndex], ...updates };
      this.savePhases(phases);
    }
  }

  completeTask(phaseId, taskId) {
    const phases = this.loadPhases();
    const phase = phases.phases.find(p => p.id === phaseId);

    if (phase) {
      const task = phase.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = true;
        task.completedAt = new Date().toISOString();
        this.savePhases(phases);
      }
    }
  }

  moveToNextPhase() {
    const phases = this.loadPhases();
    const currentIndex = phases.phases.findIndex(p => p.id === phases.current);

    if (currentIndex !== -1 && currentIndex < phases.phases.length - 1) {
      // Mark current phase as completed
      phases.phases[currentIndex].status = 'completed';
      phases.phases[currentIndex].completedAt = new Date().toISOString();

      // Move to next phase
      phases.current = phases.phases[currentIndex + 1].id;
      phases.phases[currentIndex + 1].status = 'in-progress';

      this.savePhases(phases);
      return phases.phases[currentIndex + 1];
    }

    return null;
  }

  loadDecisions() {
    if (!existsSync(this.decisionsFile)) {
      return null;
    }
    return JSON.parse(readFileSync(this.decisionsFile, 'utf-8'));
  }

  saveDecision(decision) {
    const decisions = this.loadDecisions();
    decisions.decisions.push({
      ...decision,
      id: decisions.decisions.length + 1,
      timestamp: new Date().toISOString()
    });
    writeFileSync(this.decisionsFile, JSON.stringify(decisions, null, 2), 'utf-8');
  }

  addPendingDecision(decision) {
    const decisions = this.loadDecisions();
    decisions.pendingDecisions.push({
      ...decision,
      id: decisions.pendingDecisions.length + 1,
      timestamp: new Date().toISOString()
    });
    writeFileSync(this.decisionsFile, JSON.stringify(decisions, null, 2), 'utf-8');
  }

  isInitialized() {
    return existsSync(this.configFile);
  }

  getProjectContext() {
    return {
      config: this.loadConfig(),
      knowledgeBase: this.loadKnowledgeBase(),
      currentPhase: this.getCurrentPhase(),
      decisions: this.loadDecisions()
    };
  }
}
