const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const PM_CONFIG = {
  owner: process.env.GITHUB_OWNER || 'tyler',
  repo: process.env.GITHUB_REPO || 'whereat-multiagent',
  agentId: 'pm-agent'
};

/**
 * PM Agent - Project Manager
 * Responsibilities:
 * - Initialize sprint
 * - Create task issues
 * - Track progress
 * - Generate reports
 */

async function initializeSprint() {
  console.log('🎯 PM Agent: Initializing sprint...');
  
  try {
    // Create GitHub project for sprint
    const project = await octokit.projects.createForRepo({
      owner: PM_CONFIG.owner,
      repo: PM_CONFIG.repo,
      name: `Sprint ${new Date().toISOString().split('T')[0]}`,
      body: 'WhereUAt development sprint'
    });
    
    console.log(`✅ Project created: ${project.data.html_url}`);
    
    // Create initial issues
    const issues = [
      'Feature: Location Service API',
      'Feature: User Authentication',
      'Feature: Dashboard UI',
      'Task: Database Schema',
      'Bug: Performance optimization'
    ];
    
    for (const issue of issues) {
      const created = await octokit.issues.create({
        owner: PM_CONFIG.owner,
        repo: PM_CONFIG.repo,
        title: issue,
        labels: issue.includes('Bug') ? ['bug'] : ['feature'],
        milestone: undefined
      });
      console.log(`✅ Issue created: ${created.data.html_url}`);
    }
    
    // Post summary comment
    const latestRelease = await octokit.repos.getLatestRelease({
      owner: PM_CONFIG.owner,
      repo: PM_CONFIG.repo
    }).catch(() => null);
    
    console.log('✅ Sprint initialized successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Error initializing sprint:', error.message);
    return false;
  }
}

async function trackProgress() {
  console.log('📊 PM Agent: Tracking progress...');
  
  try {
    const issues = await octokit.issues.listForRepo({
      owner: PM_CONFIG.owner,
      repo: PM_CONFIG.repo,
      state: 'all'
    });
    
    const openCount = issues.data.filter(i => i.state === 'open').length;
    const closedCount = issues.data.filter(i => i.state === 'closed').length;
    
    console.log(`📈 Progress: ${closedCount} closed, ${openCount} open`);
    
    return { open: openCount, closed: closedCount };
  } catch (error) {
    console.error('❌ Error tracking progress:', error.message);
    return null;
  }
}

// Health check endpoint stub
function startServer() {
  console.log(`🚀 PM Agent running on port 3000`);
  console.log(`📍 GitHub: ${PM_CONFIG.owner}/${PM_CONFIG.repo}`);
}

// Main execution
(async () => {
  try {
    await initializeSprint();
    await trackProgress();
    startServer();
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
})();
