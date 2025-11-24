# Story 1.b: backend-setup-express-server

Status: drafted

## Story

As a contact center operator,
I want the backend server infrastructure to be established,
so that AI analysis and component generation services can be deployed.

## Acceptance Criteria

1. **Express.js Server Setup**: Backend сервер запускается на localhost с CORS поддержкой
2. **WebSocket Integration**: WebSocket сервер поддерживает AG-UI события (TOOL_CALL_START, STATE_DELTA, TOOL_CALL_END)  
3. **REST API Endpoint**: `/api/analyze` endpoint принимает POST запросы с `{message: string}`
4. **Health Check**: `/health` endpoint возвращает статус сервера
5. **Development Environment**: Hot reload работает с nodemon в dev режиме

## Tasks / Subtasks

- [ ] **Инициализация backend проекта** (AC: 1)
  - [ ] Создать package.json с зависимостями Express, WS, CORS, TypeScript
  - [ ] Настроить scripts для dev/start/test
  - [ ] Установить dev зависимости (nodemon, ts-node)

- [ ] **Express Server Setup** (AC: 1,4) 
  - [ ] Создать src/server.js с базовой конфигурацией Express
  - [ ] Добавить CORS middleware
  - [ ] Настроить статический контент serving
  - [ ] Добавить `/health` endpoint

- [ ] **WebSocket Infrastructure** (AC: 2)
  - [ ] Интегрировать WebSocket server в Express
  - [ ] Создать AG-UI event handlers структуру
  - [ ] Добавить connection/disconnect логику

- [ ] **API Route Framework** (AC: 3)
  - [ ] Создать routes/analyze.js
  - [ ] Добавить input validation middleware  
  - [ ] Настроить JSON body parser

- [ ] **Development Environment** (AC: 5)
  - [ ] Настроить nodemon с правильными файлами для watch
  - [ ] Добавить environment переменные (PORT, NODE_ENV)
  - [ ] Создать базовую test структуру

## Dev Notes

### Backend Architecture Patterns
- **Express.js** с TypeScript типизацией [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Dependencies]
- **WebSocket** интеграция для real-time AG-UI события
- **CORS Policy** для restricted origins API endpoints [Source: tech-spec-epic-1.md#Security]
- **Jest Testing** framework для unit/integration тестов

### Project Structure Notes

**Expected Backend Structure:**
```
backend/
├── src/
│   ├── services/          # MockAIService, ComponentGenerator
│   ├── routes/           # API endpoints (/api/analyze)
│   ├── middleware/       # CORS, validation, auth
│   ├── websocket/        # AG-UI event handlers  
│   └── server.js         # Main Express server
├── package.json
├── tsconfig.json
└── tests/
    ├── unit/
    └── integration/
```

**Performance Targets:**
- Mock AI Response: < 100ms [Source: tech-spec-epic-1.md#Performance]
- WebSocket Latency: < 50ms для event передачи
- Component Render Time: < 200ms от AI анализа до UI отображения

### References

- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Backend Dependencies] - Express, WS, CORS зависимости
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#APIs and Interfaces] - REST API specification  
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#WebSocket AG-UI Events] - Event schema
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Security] - CORS policy, validation requirements
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Services and Modules] - MockAIService, ComponentGenerator specs

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Sonnet 4 (claude-sonnet-4-20250514)

### Debug Log References

### Completion Notes List

### File List