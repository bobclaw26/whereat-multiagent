# WhereUAt Multi-Agent Development Workflow

## Project Structure

```
whereat-multiagent/
├── README.md
├── docker-compose.yml
├── .env.example
├── whereat-agents-config.json
├── agents/
│   ├── pm/
│   │   ├── Dockerfile
│   │   ├── agent.js
│   │   └── package.json
│   ├── dev/
│   │   ├── Dockerfile
│   │   ├── agent.js
│   │   └── package.json
│   ├── security/
│   │   ├── Dockerfile
│   │   ├── agent.js
│   │   └── package.json
│   └── qa/
│       ├── Dockerfile
│       ├── agent.js
│       └── package.json
├── scripts/
│   ├── init.sh
│   ├── start-workflow.sh
│   ├── stop-workflow.sh
│   └── check-status.sh
├── .github/
│   └── workflows/
│       ├── agent-ci.yml
│       ├── security-scan.yml
│       └── auto-merge.yml
├── tests/
│   └── integration/
│       └── workflow.test.js
└── docs/
    ├── ARCHITECTURE.md
    ├── AGENTS.md
    └── WORKFLOW.md
```

## Agent Responsibilities

### PM Agent (Project Manager)
- **Language:** OpenClaw orchestration
- **Tasks:**
  - Initialize sprint using GitHub Projects
  - Create task issues for feature development
  - Track progress via GitHub issue/PR counts
  - Generate weekly reports
  - Coordinate handoffs between teams

### Dev Agents (2x Development)
- **Language:** JavaScript/Python (implementation)
- **Dev-1 (Backend):**
  - Build API endpoints
  - Database schema design
  - Authentication flows
  - Push to `feature/backend-*` branches
- **Dev-2 (Frontend):**
  - React/Vue components
  - UI state management
  - Client integrations
  - Push to `feature/frontend-*` branches

### Security Agent
- **Language:** Python (security scanning)
- **Tasks:**
  - Scan code with SAST tools
  - Check dependencies (npm audit, Snyk)
  - Flag security issues
  - Create security labels on GitHub
  - Document compliance posture

### QA Agent
- **Language:** JavaScript (test automation)
- **Tasks:**
  - Run integration tests
  - Performance benchmarking
  - Regression testing
  - Create test reports as GitHub releases
  - Post summary to PR comments

## Workflow Timeline

```
Day 1:
  09:00 - PM: Initialize sprint (create issues, project board)
  09:30 - Dev-1 & Dev-2 start parallel development (depends_on PM)
  10:00 - Security: Begin background scanning
  
Day 2-4:
  Dev agents commit daily to feature branches
  Security agent runs continuous scanning
  QA agent prepares test suite
  
Day 5:
  09:00 - Dev agents finalize & create PRs
  10:00 - QA: Run full integration tests
  11:00 - Security: Final vulnerability scan
  14:00 - PM: Review, merge, and generate report
  15:00 - All: Push main branch, tag release
```

## GitHub Integration

### Automation Points
1. **Issue Creation:** PM agent creates issues from sprint plan
2. **Branch Naming:** Dev agents follow `feature/{type}/{desc}` convention
3. **PR Workflow:** 
   - Dev agents open PRs to `main`
   - Security agent auto-comments security findings
   - QA agent auto-comments test results
4. **Merge Strategy:** Squash merge with release notes auto-generation

### GitHub Actions Workflows
- **agent-ci.yml** — Runs on PR: linting, unit tests, build
- **security-scan.yml** — Runs on PR: SAST, dependency scan, CVE check
- **auto-merge.yml** — Auto-merges PRs with 2+ approvals

## Environment Setup

### Required
- Docker & Docker Compose
- GitHub token (with `repo`, `workflow`, `projects` scopes)
- GitHub repo created and accessible

### Configuration (.env)
```env
GITHUB_TOKEN=<your-token>
GITHUB_OWNER=<your-username>
GITHUB_REPO=whereat-multiagent
GITHUB_BRANCH=main
OPENCLAW_TOKEN=<your-openclaw-token>
```

## Running the Workflow

```bash
# Start all agents
docker-compose up -d

# Monitor logs
docker-compose logs -f

# Check status
./scripts/check-status.sh

# Stop all agents
docker-compose down
```

## Expected Outputs

- ✅ GitHub project board populated with tasks
- ✅ Feature branches with code commits
- ✅ PRs with security scan results
- ✅ Test reports and coverage metrics
- ✅ Release notes and version tags
- ✅ Agent activity logs in workspace

## Success Metrics

- **Velocity:** Issues closed per sprint
- **Quality:** Test coverage & bug count
- **Security:** CVEs caught before merge
- **Efficiency:** Time from task → merge (auto-tracked via GitHub API)

---

This is the automation backbone for WhereUAt. Each agent is autonomous yet coordinated through GitHub APIs and webhooks.
