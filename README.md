# WhereUAt Multi-Agent Development System

Autonomous multi-agent workflow for WhereUAt development using Docker containers and GitHub integration.

## Overview

This system coordinates 5 specialized agents working in parallel:

- **PM Agent** — Sprint planning & task management
- **Dev Agent 1** — Backend development
- **Dev Agent 2** — Frontend development
- **Security Agent** — Code & dependency scanning
- **QA Agent** — Testing & quality assurance

All agents communicate via GitHub (issues, PRs, comments) and push progress automatically.

## Quick Start

### 1. Prerequisites
```bash
# Check Docker
docker --version
docker-compose --version

# Check GitHub CLI (for local testing)
gh --version
```

### 2. Setup Environment
```bash
# Copy env template
cp .env.example .env

# Edit with your values
GITHUB_TOKEN=<your-token>
GITHUB_OWNER=<your-username>
GITHUB_REPO=whereat-multiagent
```

### 3. Start Workflow
```bash
# Build and start all agents
docker-compose up -d

# Monitor progress
docker-compose logs -f

# Check individual agent logs
docker-compose logs pm-agent
docker-compose logs dev-agent-1
```

### 4. Monitor GitHub
- Visit your GitHub repo
- Check **Projects** tab for sprint board
- View **Issues** for task tracking
- Review **PRs** for code changes

## Architecture

```
Sprint Initialization (PM)
        ↓
    (branches to)
        ↓
[Dev-1] [Dev-2] [Security] (parallel)
        ↓
    Feature PRs created
        ↓
    QA Testing
        ↓
    Merge & Release
        ↓
    Report Generation (PM)
```

## Files

- **docker-compose.yml** — Container orchestration
- **whereat-agents-config.json** — Agent configuration
- **agents/** — Individual agent implementations
- **scripts/** — Utility scripts for management
- **.github/workflows/** — CI/CD automation

## Configuration

See `whereat-agents-config.json` for agent definitions, roles, and GitHub permissions.

## Development

To extend agents, edit `agents/{agent}/agent.js`:

```javascript
// Example: PM Agent creating a GitHub issue
const github = require('@octokit/rest');
const octokit = new github.Octokit({ auth: process.env.GITHUB_TOKEN });

await octokit.issues.create({
  owner: process.env.GITHUB_OWNER,
  repo: process.env.GITHUB_REPO,
  title: 'Feature: Location Service',
  labels: ['feature']
});
```

## Troubleshooting

**Agent won't start:**
```bash
docker-compose logs <agent-name>
docker-compose logs pm-agent
```

**GitHub token issues:**
- Verify token has `repo`, `workflow`, `projects` scopes
- Check token isn't expired

**Network issues:**
```bash
docker network ls
docker network inspect whereat-net
```

## Next Steps

1. ✅ Clone/fork this repo
2. ✅ Set up `.env` with your tokens
3. ✅ Run `docker-compose up`
4. ✅ Watch agents work on GitHub

---

**Status:** Ready for deployment  
**Last Updated:** 2026-02-18  
**Contributors:** Tyler + Bob
