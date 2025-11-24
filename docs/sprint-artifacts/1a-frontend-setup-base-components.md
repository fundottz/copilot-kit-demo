# Story 1A: Frontend Setup & Base Components

Status: drafted

## Story

As a **Frontend Developer**,
I want to **set up the React TypeScript project with all necessary dependencies and create the foundational component architecture**,
so that **other developers can work in parallel on specific features without integration conflicts**.

## Acceptance Criteria

1. **Project Initialization:** React 18.2+ TypeScript project created with Vite build system
2. **Dependencies Installed:** All frontend dependencies from tech-spec are correctly installed and configured
3. **Base Architecture:** Core folder structure and barrel exports are established
4. **Styling Setup:** Tailwind CSS configured with base design system
5. **Development Environment:** Hot reload and development server working
6. **Testing Framework:** Jest + React Testing Library configured with example test
7. **Code Quality:** ESLint + Prettier configured with pre-commit hooks
8. **TypeScript Configuration:** Strict mode enabled with proper path mapping

## Tasks / Subtasks

- [ ] **Project Setup & Dependencies** (AC: 1,2)
  - [ ] Create React TypeScript project with Vite
  - [ ] Install AG-UI protocol dependencies (@ag-ui/protocol)
  - [ ] Install CopilotKit dependencies (@copilotkit/react-core, @copilotkit/react-ui)
  - [ ] Install Tailwind CSS and configure

- [ ] **Base Component Architecture** (AC: 3)
  - [ ] Create src/ folder structure (components/, services/, types/, hooks/, utils/)
  - [ ] Set up barrel exports (index.ts files)
  - [ ] Create base App.tsx with routing structure
  - [ ] Create Layout components for future use

- [ ] **Development Tools** (AC: 5,7,8)
  - [ ] Configure Vite dev server with proxy settings
  - [ ] Set up ESLint + Prettier with TypeScript rules
  - [ ] Configure pre-commit hooks
  - [ ] Set up TypeScript strict mode with path mapping

- [ ] **Testing Infrastructure** (AC: 6)
  - [ ] Configure Jest with React Testing Library
  - [ ] Create test utilities and setup files
  - [ ] Write example test for App component
  - [ ] Set up test coverage reporting

## Dev Notes

### Architecture Patterns
- **Component-First Design:** Feature-based folder structure for scalability
- **Barrel Exports:** Clean imports and easy refactoring
- **TypeScript Strict Mode:** Type safety for team collaboration
- **Utility-First CSS:** Tailwind for consistent design system

### Source Tree Components
```
src/
├── components/           # Shared UI components (Dev C will add specific ones)
│   └── layout/          # Layout components
├── services/            # API and business logic services (Dev A foundation)
├── types/               # TypeScript type definitions (shared by all devs)
├── hooks/               # Custom React hooks (Dev A creates base)
├── utils/               # Utility functions
└── App.tsx              # Main app entry point
```

### Testing Standards
- **Unit Tests:** For utility functions and hooks
- **Component Tests:** RTL for user interactions
- **Integration Tests:** MSW for API mocking
- **Coverage Targets:** 90%+ functions, 85%+ lines

### Project Structure Notes

**Alignment Strategy:**
- Create shared type definitions that Devs B and C can extend
- Establish service layer interfaces for backend integration
- Set up component plugin architecture for dynamic UI

**Parallel Development Enablers:**
- Dev B can work on backend independently (different port)
- Dev C can create components using established interfaces
- Shared types prevent integration conflicts

### References

- [Tech Spec: Implementation Stack] `docs/sprint-artifacts/tech-spec-epic-1.md#implementation-stack`
- [Tech Spec: Frontend Dependencies] `docs/sprint-artifacts/tech-spec-epic-1.md#dependencies-and-integrations`
- [Tech Spec: Source Tree Changes] `docs/tech-spec.md#source-tree-changes`
- [Tech Spec: Development Setup] `docs/tech-spec.md#development-setup`

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Sonnet 4 (Scrum Master Agent)

### Debug Log References

### Completion Notes List

### File List