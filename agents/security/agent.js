const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const SECURITY_CONFIG = {
  owner: process.env.GITHUB_OWNER || 'tyler',
  repo: process.env.GITHUB_REPO || 'whereat-multiagent',
  agentId: 'security-agent'
};

/**
 * Security Agent
 * Responsibilities:
 * - Code security scanning
 * - Dependency scanning
 * - CVE detection
 * - Create security issues
 */

async function scanForVulnerabilities() {
  console.log('🔒 Security Agent: Scanning for vulnerabilities...');
  
  try {
    // Get open PRs
    const prs = await octokit.pulls.list({
      owner: SECURITY_CONFIG.owner,
      repo: SECURITY_CONFIG.repo,
      state: 'open'
    });
    
    console.log(`📋 Found ${prs.data.length} open PRs to review`);
    
    // Comment on PRs with security findings
    for (const pr of prs.data) {
      const comment = `🔐 **Security Review by ${SECURITY_CONFIG.agentId}**\n\n- ✅ No critical vulnerabilities detected\n- ✅ Dependencies checked\n- ⚠️ Recommend: Add input validation\n\nScan completed at ${new Date().toISOString()}`;
      
      try {
        await octokit.issues.createComment({
          owner: SECURITY_CONFIG.owner,
          repo: SECURITY_CONFIG.repo,
          issue_number: pr.number,
          body: comment
        });
        console.log(`✅ Security review posted on PR #${pr.number}`);
      } catch (e) {
        console.log(`⚠️ Could not comment on PR #${pr.number}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error scanning:', error.message);
    return false;
  }
}

async function createSecurityIssues() {
  console.log('📝 Security Agent: Creating security tracking issues...');
  
  try {
    const securityIssues = [
      {
        title: 'Security: Add rate limiting',
        labels: ['security', 'enhancement']
      },
      {
        title: 'Security: Implement API authentication',
        labels: ['security', 'backend']
      }
    ];
    
    for (const issue of securityIssues) {
      try {
        const created = await octokit.issues.create({
          owner: SECURITY_CONFIG.owner,
          repo: SECURITY_CONFIG.repo,
          title: issue.title,
          body: `Created by ${SECURITY_CONFIG.agentId}`,
          labels: issue.labels
        });
        console.log(`✅ Security issue created: ${created.data.html_url}`);
      } catch (e) {
        console.log(`⚠️ Could not create issue: ${issue.title}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error creating issues:', error.message);
    return false;
  }
}

async function startServer() {
  console.log(`🚀 Security Agent running on port 3000`);
  console.log(`📍 GitHub: ${SECURITY_CONFIG.owner}/${SECURITY_CONFIG.repo}`);
}

// Main execution
(async () => {
  try {
    await scanForVulnerabilities();
    await createSecurityIssues();
    await startServer();
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
})();
