#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { PMAgent } from '../src/pm-agent.js';
import { ProjectManager } from '../src/project-manager.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

program
  .name('lpm')
  .description('Lovable Project Manager - AI-powered PM agent for Lovable.dev development')
  .version(pkg.version);

// Initialize a new project
program
  .command('init')
  .description('Initialize a new Lovable.dev project')
  .action(async () => {
    console.log(chalk.cyan.bold('\n🚀 Lovable Project Manager - Project Initialization\n'));

    const pm = new ProjectManager();

    if (pm.isInitialized()) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'Project already initialized. Overwrite?',
          default: false
        }
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('Initialization cancelled.'));
        return;
      }
    }

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name:',
        default: 'My Lovable Project'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: ''
      },
      {
        type: 'input',
        name: 'guidelines',
        message: 'Initial project guidelines (optional):',
        default: ''
      },
      {
        type: 'checkbox',
        name: 'integrations',
        message: 'Which integrations do you plan to use?',
        choices: [
          { name: 'Supabase (Backend/Database)', value: 'supabase' },
          { name: 'Stripe (Payments)', value: 'stripe' },
          { name: 'GitHub (Version Control)', value: 'github' }
        ]
      }
    ]);

    const spinner = ora('Initializing project...').start();

    const integrations = {
      supabase: answers.integrations.includes('supabase'),
      stripe: answers.integrations.includes('stripe'),
      github: answers.integrations.includes('github')
    };

    const projectData = {
      name: answers.name,
      description: answers.description,
      guidelines: answers.guidelines,
      integrations
    };

    pm.initializeProject(projectData);
    spinner.succeed('Project initialized successfully!');

    console.log(chalk.green('\n✓ Created configuration in .lovable-pm/'));
    console.log(chalk.cyan('\nNext steps:'));
    console.log(chalk.white('  1. Run'), chalk.yellow('lpm chat'), chalk.white('to start working with the PM agent'));
    console.log(chalk.white('  2. Run'), chalk.yellow('lpm status'), chalk.white('to see your current phase and tasks'));
    console.log(chalk.white('  3. Edit'), chalk.yellow('.lovable-pm/knowledge-base.md'), chalk.white('to add project details\n'));
  });

// Chat with PM agent
program
  .command('chat')
  .description('Start an interactive chat with the PM agent')
  .action(async () => {
    const pm = new ProjectManager();

    if (!pm.isInitialized()) {
      console.log(chalk.red('\n❌ Project not initialized. Run'), chalk.yellow('lpm init'), chalk.red('first.\n'));
      return;
    }

    const agent = new PMAgent();
    const projectContext = pm.getProjectContext();

    console.log(chalk.cyan.bold('\n💬 PM Agent Chat Session'));
    console.log(chalk.gray('Type "exit" to end the session\n'));

    let chatting = true;

    while (chatting) {
      const { message } = await inquirer.prompt([
        {
          type: 'input',
          name: 'message',
          message: 'You:',
          prefix: chalk.blue('>')
        }
      ]);

      if (message.toLowerCase() === 'exit') {
        chatting = false;
        console.log(chalk.cyan('\nGoodbye! 👋\n'));
        continue;
      }

      if (!message.trim()) {
        continue;
      }

      const spinner = ora('PM Agent is thinking...').start();

      try {
        const response = await agent.chat(message, projectContext);
        spinner.stop();
        console.log(chalk.green('\nPM Agent:'));
        console.log(chalk.white(response.message + '\n'));
      } catch (error) {
        spinner.fail('Error communicating with PM agent');
        console.error(chalk.red(error.message + '\n'));
      }
    }
  });

// Show project status
program
  .command('status')
  .description('Show current project status and phase')
  .action(() => {
    const pm = new ProjectManager();

    if (!pm.isInitialized()) {
      console.log(chalk.red('\n❌ Project not initialized. Run'), chalk.yellow('lpm init'), chalk.red('first.\n'));
      return;
    }

    const context = pm.getProjectContext();
    const config = context.config;
    const phase = context.currentPhase;

    console.log(chalk.cyan.bold('\n📊 Project Status\n'));
    console.log(chalk.white('Project:'), chalk.yellow(config.name));
    console.log(chalk.white('Description:'), config.description || chalk.gray('(none)'));
    console.log(chalk.white('Created:'), new Date(config.created).toLocaleDateString());
    console.log(chalk.white('\nCurrent Phase:'), chalk.yellow(phase.name), chalk.gray(`(${phase.status})`));

    console.log(chalk.cyan('\nTasks:'));
    phase.tasks.forEach(task => {
      const status = task.completed ? chalk.green('✓') : chalk.gray('○');
      console.log(`  ${status} ${task.description}`);
    });

    const completedTasks = phase.tasks.filter(t => t.completed).length;
    const totalTasks = phase.tasks.length;
    const progress = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : 0;

    console.log(chalk.white(`\nProgress: ${completedTasks}/${totalTasks} (${progress}%)`));

    console.log(chalk.cyan('\nIntegrations:'));
    Object.entries(config.integrations).forEach(([name, enabled]) => {
      const icon = enabled ? chalk.green('✓') : chalk.gray('○');
      console.log(`  ${icon} ${name}`);
    });

    const pendingDecisions = context.decisions?.pendingDecisions || [];
    if (pendingDecisions.length > 0) {
      console.log(chalk.yellow(`\n⚠️  ${pendingDecisions.length} pending decision(s)`));
      console.log(chalk.gray('Run'), chalk.yellow('lpm decisions'), chalk.gray('to review\n'));
    } else {
      console.log(chalk.green('\n✓ No pending decisions\n'));
    }
  });

// Complete a task
program
  .command('complete-task')
  .description('Mark a task as completed')
  .action(async () => {
    const pm = new ProjectManager();

    if (!pm.isInitialized()) {
      console.log(chalk.red('\n❌ Project not initialized.\n'));
      return;
    }

    const phase = pm.getCurrentPhase();
    const incompleteTasks = phase.tasks.filter(t => !t.completed);

    if (incompleteTasks.length === 0) {
      console.log(chalk.green('\n✓ All tasks in this phase are completed!'));

      const { moveNext } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'moveNext',
          message: 'Move to the next phase?',
          default: true
        }
      ]);

      if (moveNext) {
        const nextPhase = pm.moveToNextPhase();
        if (nextPhase) {
          console.log(chalk.green(`\n✓ Moved to phase: ${nextPhase.name}\n`));
        } else {
          console.log(chalk.cyan('\n🎉 All phases completed!\n'));
        }
      }
      return;
    }

    const { taskId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'taskId',
        message: 'Which task did you complete?',
        choices: incompleteTasks.map(t => ({
          name: t.description,
          value: t.id
        }))
      }
    ]);

    pm.completeTask(phase.id, taskId);
    console.log(chalk.green('\n✓ Task marked as completed!\n'));
  });

// Generate a Lovable prompt
program
  .command('prompt')
  .description('Generate an optimized Lovable.dev prompt')
  .action(async () => {
    const pm = new ProjectManager();

    if (!pm.isInitialized()) {
      console.log(chalk.red('\n❌ Project not initialized.\n'));
      return;
    }

    console.log(chalk.cyan.bold('\n✨ Lovable Prompt Generator\n'));

    const { feature } = await inquirer.prompt([
      {
        type: 'input',
        name: 'feature',
        message: 'Describe the feature you want to implement:',
        validate: input => input.trim() ? true : 'Please provide a feature description'
      }
    ]);

    const spinner = ora('Generating optimized prompt...').start();

    try {
      const agent = new PMAgent();
      const projectContext = pm.getProjectContext();
      const response = await agent.generatePrompt(feature, projectContext);

      spinner.succeed('Prompt generated!');
      console.log(chalk.green('\n📝 Optimized Lovable Prompt:\n'));
      console.log(chalk.white(response.message + '\n'));
    } catch (error) {
      spinner.fail('Error generating prompt');
      console.error(chalk.red(error.message + '\n'));
    }
  });

// Get next step guidance
program
  .command('next')
  .description('Get guidance on the next step')
  .action(async () => {
    const pm = new ProjectManager();

    if (!pm.isInitialized()) {
      console.log(chalk.red('\n❌ Project not initialized.\n'));
      return;
    }

    const spinner = ora('Analyzing project...').start();

    try {
      const agent = new PMAgent();
      const projectContext = pm.getProjectContext();
      const phase = projectContext.currentPhase;

      const response = await agent.getNextStep(phase.name, projectContext);

      spinner.succeed('Analysis complete!');
      console.log(chalk.cyan.bold('\n🎯 Next Step Guidance:\n'));
      console.log(chalk.white(response.message + '\n'));
    } catch (error) {
      spinner.fail('Error getting next step');
      console.error(chalk.red(error.message + '\n'));
    }
  });

// View decisions
program
  .command('decisions')
  .description('View and manage project decisions')
  .action(() => {
    const pm = new ProjectManager();

    if (!pm.isInitialized()) {
      console.log(chalk.red('\n❌ Project not initialized.\n'));
      return;
    }

    const decisions = pm.loadDecisions();

    console.log(chalk.cyan.bold('\n📋 Project Decisions\n'));

    if (decisions.pendingDecisions.length > 0) {
      console.log(chalk.yellow('Pending Decisions:'));
      decisions.pendingDecisions.forEach(d => {
        console.log(chalk.white(`\n  ${d.id}. ${d.title}`));
        console.log(chalk.gray(`     ${d.description}`));
      });
    }

    if (decisions.decisions.length > 0) {
      console.log(chalk.green('\n\nCompleted Decisions:'));
      decisions.decisions.forEach(d => {
        console.log(chalk.white(`\n  ${d.id}. ${d.title}`));
        console.log(chalk.gray(`     Decision: ${d.decision}`));
        console.log(chalk.gray(`     Date: ${new Date(d.timestamp).toLocaleDateString()}`));
      });
    }

    if (decisions.pendingDecisions.length === 0 && decisions.decisions.length === 0) {
      console.log(chalk.gray('No decisions recorded yet.'));
    }

    console.log('\n');
  });

// View knowledge base
program
  .command('knowledge')
  .description('View the project knowledge base')
  .action(() => {
    const pm = new ProjectManager();

    if (!pm.isInitialized()) {
      console.log(chalk.red('\n❌ Project not initialized.\n'));
      return;
    }

    const kb = pm.loadKnowledgeBase();
    console.log(chalk.cyan.bold('\n📚 Knowledge Base\n'));
    console.log(kb);
    console.log(chalk.gray(`\nEdit at: ${pm.knowledgeBaseFile}\n`));
  });

program.parse();
