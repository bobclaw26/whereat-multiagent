const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const DEV_CONFIG = {
  owner: process.env.GITHUB_OWNER || 'tyler',
  repo: process.env.GITHUB_REPO || 'whereat-multiagent',
  agentId: process.env.AGENT_ID || 'dev-agent-1',
  role: process.env.DEV_ROLE || 'backend'
};

/**
 * Developer Agent
 * Responsibilities:
 * - Implement features
 * - Create branches
 * - Open PRs
 * - Push code to GitHub
 */

async function createFeatureBranch(featureName) {
  console.log(`🌿 Dev Agent (${DEV_CONFIG.role}): Creating feature branch...`);
  
  try {
    // Get main branch reference
    const ref = await octokit.git.getRef({
      owner: DEV_CONFIG.owner,
      repo: DEV_CONFIG.repo,
      ref: 'heads/master'
    });
    
    const branchName = `feature/${DEV_CONFIG.role}/${featureName}`;
    
    // Create new branch
    await octokit.git.createRef({
      owner: DEV_CONFIG.owner,
      repo: DEV_CONFIG.repo,
      ref: `refs/heads/${branchName}`,
      sha: ref.data.object.sha
    });
    
    console.log(`✅ Branch created: ${branchName}`);
    return branchName;
  } catch (error) {
    if (error.message.includes('Reference already exists')) {
      console.log('⚠️ Branch already exists, using existing...');
      return `feature/${DEV_CONFIG.role}/${featureName}`;
    }
    console.error('❌ Error creating branch:', error.message);
    return null;
  }
}

async function openPullRequest(branch, title, description) {
  console.log(`🔀 Dev Agent: Opening pull request...`);
  
  try {
    const pr = await octokit.pulls.create({
      owner: DEV_CONFIG.owner,
      repo: DEV_CONFIG.repo,
      title: `[${DEV_CONFIG.role.toUpperCase()}] ${title}`,
      body: `## Description\n${description}\n\n**Agent:** ${DEV_CONFIG.agentId}`,
      head: branch,
      base: 'master'
    });
    
    console.log(`✅ PR created: ${pr.data.html_url}`);
    return pr.data;
  } catch (error) {
    if (error.message.includes('No commits between')) {
      console.log('⚠️ No commits on branch yet, skipping PR');
      return null;
    }
    console.error('❌ Error opening PR:', error.message);
    return null;
  }
}

async function simulateDevelopment() {
  console.log(`💻 Dev Agent (${DEV_CONFIG.role}): Starting development...`);
  
  const features = {
    backend: [
      { name: 'location-service', desc: 'Location tracking API' },
      { name: 'auth-service', desc: 'User authentication service' }
    ],
    frontend: [
      { name: 'dashboard', desc: 'Main dashboard UI' },
      { name: 'location-map', desc: 'Map component' }
    ]
  };
  
  const tasks = features[DEV_CONFIG.role] || features.backend;
  
  for (const task of tasks) {
    const branch = await createFeatureBranch(task.name);
    if (branch) {
      await new Promise(r => setTimeout(r, 1000));
      await openPullRequest(branch, task.name, task.desc);
    }
  }
  
  return true;
}

async function startServer() {
  console.log(`🚀 Dev Agent (${DEV_CONFIG.role}) running on port 3000`);
  console.log(`📍 GitHub: ${DEV_CONFIG.owner}/${DEV_CONFIG.repo}`);
}

// Main execution
(async () => {
  try {
    await simulateDevelopment();
    await startServer();
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
})();
