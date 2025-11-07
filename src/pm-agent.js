import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class PMAgent {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || ''
    });

    this.methodology = this.loadMethodology();
    this.conversationHistory = [];
  }

  loadMethodology() {
    try {
      const methodologyPath = join(__dirname, '../docs/lovable-methodology.md');
      return readFileSync(methodologyPath, 'utf-8');
    } catch (error) {
      console.error('Failed to load methodology:', error);
      return '';
    }
  }

  getSystemPrompt() {
    return `You are a Project Manager Agent specialized in guiding developers through the Lovable.dev development process.

Your role is to:
1. Guide developers through structured development phases
2. Ask strategic questions about project requirements and decisions
3. Ensure best practices from the Lovable.dev methodology are followed
4. Help break down complex features into manageable tasks
5. Prompt for key decisions at appropriate times
6. Keep development organized and on track

You have access to the complete Lovable.dev methodology:

${this.methodology}

When interacting with developers:
- Ask clarifying questions before making assumptions
- Guide them through proper project knowledge setup
- Help structure prompts for Lovable.dev
- Remind them of best practices at relevant moments
- Break down complex features into phases
- Prompt for architectural decisions when needed
- Keep them focused on one task at a time

Be conversational but professional. Focus on practical guidance and actionable next steps.`;
  }

  async chat(userMessage, projectContext = null) {
    // Add user message to history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    // Prepare messages with project context if available
    let messages = [...this.conversationHistory];

    if (projectContext) {
      messages = [
        {
          role: 'user',
          content: `[Project Context]\n${JSON.stringify(projectContext, null, 2)}`
        },
        ...messages
      ];
    }

    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: this.getSystemPrompt(),
        messages: messages
      });

      const assistantMessage = response.content[0].text;

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      return {
        message: assistantMessage,
        usage: response.usage
      };
    } catch (error) {
      throw new Error(`PM Agent error: ${error.message}`);
    }
  }

  async analyzeProject(projectData) {
    const analysisPrompt = `I need help analyzing a project for Lovable.dev development.

Project Information:
${JSON.stringify(projectData, null, 2)}

Please help me:
1. Identify what should go in the Knowledge Base
2. Suggest key decision points I should consider
3. Recommend a phased development approach
4. Highlight potential integration needs (Supabase, Stripe, etc.)

Provide a structured analysis following the Lovable.dev methodology.`;

    return await this.chat(analysisPrompt);
  }

  async generatePrompt(featureDescription, projectContext) {
    const promptRequest = `I need to create a Lovable.dev prompt for this feature:

${featureDescription}

Project Context:
${JSON.stringify(projectContext, null, 2)}

Please help me structure this into an optimal Lovable.dev prompt following best practices:
- Project Overview
- Page Structure
- Navigation Logic
- Implementation Order
- Any necessary guardrails

Also suggest what I should add to the Knowledge Base if anything is missing.`;

    return await this.chat(promptRequest, projectContext);
  }

  async getNextStep(currentPhase, projectContext) {
    const stepRequest = `I'm currently in the ${currentPhase} phase of development.

Project Context:
${JSON.stringify(projectContext, null, 2)}

What should be my next step? Please provide:
1. Specific action to take
2. What to focus on
3. What to avoid
4. Any decisions I need to make
5. Success criteria for this step`;

    return await this.chat(stepRequest, projectContext);
  }

  async reviewDecision(decision, context) {
    const reviewPrompt = `I'm considering the following decision:

${decision}

Context:
${JSON.stringify(context, null, 2)}

Please review this decision and:
1. Confirm if it aligns with Lovable.dev best practices
2. Highlight any potential issues or considerations
3. Suggest any alternatives if relevant
4. Recommend what documentation to update`;

    return await this.chat(reviewPrompt, context);
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  getHistory() {
    return this.conversationHistory;
  }
}
