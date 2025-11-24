# Copilot Kit Demo - AI Contact Center with Adaptive UI

AI-powered contact center copilot that uses adaptive UI components for rapid problem categorization. Built with AG-UI protocol for real-time communication between AI analysis and dynamic user interfaces.

## 🎯 Project Overview

When customers contact support with technical issues, operators need to quickly categorize the problem type for proper escalation. This system:

1. **Analyzes customer messages** using AI to recognize problem types
2. **Generates adaptive UI components** (buttons) for operators  
3. **Enables one-click categorization** with structured data output
4. **Provides real-time confirmation** and handoff to technical support

**First Use Case:** Internet connectivity problems with 3 predefined categories.

## 🏗️ Architecture

- **Frontend:** React 18.2+ with TypeScript, Vite, Tailwind CSS
- **Backend:** Express.js with WebSocket support for AG-UI protocol
- **AI Service:** Mock implementation with easy swap to real AI (DeepSeek/Claude)
- **Communication:** AG-UI protocol for event-driven architecture
- **UI Framework:** CopilotKit integration with adaptive component system

## 📁 Project Structure

```
├── docs/
│   ├── bmm-workflow-status.yaml          # Project workflow tracking
│   ├── research-technical-2025-11-23.md  # Technical research
│   ├── tech-spec.md                      # Main technical specification
│   └── sprint-artifacts/
│       ├── sprint-status.yaml            # Sprint planning & story tracking
│       ├── tech-spec-epic-1.md           # Epic technical context
│       └── 1a-frontend-setup-base-components.md  # Story drafts
└── .bmad/                                 # BMM workflow configuration
```

## 🎯 Current Status

**Epic 1: AI Contact Center Copilot с Adaptive UI** - `contexted`

### Development Tracks (Parallel)

**Track A: Frontend Infrastructure**
- ✅ Story 1A: Frontend Setup & Base Components - `drafted`
- ⏳ Story 2A: Chat Interface & CopilotKit Integration
- ⏳ Story 3A: Adaptive UI Panel & Dynamic Rendering

**Track B: Backend Infrastructure**  
- ⏳ Story 1B: Backend Setup & Express Server
- ⏳ Story 2B: Mock AI Service & Analysis Logic
- ⏳ Story 3B: WebSocket & AG-UI Event Handling

**Track C: UI Components**
- ⏳ Story 1C: Problem Buttons Component
- ⏳ Story 2C: Confirmation Messages & Feedback
- ⏳ Story 3C: Error Boundaries & Fallback UI

**Integration**
- ⏳ Story 4: End-to-End Integration & Testing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS version)
- npm 9+ or yarn 1.22+
- Git 2.30+

### Development Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd copilot-kit-demo

# 2. Install dependencies (when package.json is ready)
npm install

# 3. Start development servers
npm run dev          # Frontend on port 3000
npm run dev:backend  # Backend on port 5001

# 4. Run tests
npm test

# 5. Build for production
npm run build
```

## 🔧 BMM Workflow Commands

This project uses BMM (Business-Model-Methodology) for structured development:

```bash
# Check project status
/bmad:bmm:agents:sm
*workflow-status

# Create stories for parallel development
*create-story

# Ready story for development
*create-story-context
*story-ready-for-dev

# Development workflow
*dev-story  # Start implementation
*code-review  # Review completed work
*story-done  # Mark story complete
```

## 📚 Documentation

- **[Technical Specification](docs/tech-spec.md)** - Complete implementation details
- **[Epic Technical Context](docs/sprint-artifacts/tech-spec-epic-1.md)** - Detailed epic breakdown
- **[Sprint Status](docs/sprint-artifacts/sprint-status.yaml)** - Current development progress
- **[Research](docs/research-technical-2025-11-23.md)** - AG-UI protocol analysis

## 🎮 Demo Scenario

```
Customer: "у меня проблемы с интернетом"
AI → Operator UI: [3 buttons] "Уточните тип проблемы: 
                   [Нет связи] [Медленный интернет] [Пропадает связь]"
Operator clicks → [Confirmation] "✅ Зафиксировано: Медленный интернет"
System → Handoff to technical support with structured data
```

## 🔧 Tech Stack

**Frontend:**
- React 18.2+, TypeScript 5.1+, Vite 5.0+
- Tailwind CSS 3.3+, CopilotKit
- AG-UI Protocol, Jest + RTL

**Backend:**
- Express 4.18+, TypeScript 5.1+
- WebSocket (ws 8.14+), AG-UI Middleware
- Mock AI Service (easily swappable)

## 🤝 Contributing

1. Check current sprint status: `docs/sprint-artifacts/sprint-status.yaml`
2. Pick a story from your assigned track (A/B/C)
3. Use BMM workflow commands for structured development
4. Follow parallel development guidelines in story descriptions

## 📄 License

This project is a demo/prototype for AI-powered contact center systems.

---

**🤖 Generated with [Claude Code](https://claude.ai/code)**

**Co-Authored-By:** Claude <noreply@anthropic.com>