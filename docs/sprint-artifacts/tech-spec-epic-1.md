# Epic Technical Specification: AI Contact Center Copilot с Adaptive UI

Date: 2025-11-24
Author: \]
Epic ID: 1
Status: Draft

---

## Overview

AI-копилот с adaptive UI система для контакт-центров, предназначенная для быстрой категоризации проблем клиентов. Система анализирует сообщения клиентов о проблемах с интернетом и автоматически генерирует набор UI компонентов (кнопки) для операторов, обеспечивая one-click категоризацию и структурированную передачу данных в техподдержку.

Проект реализует AG-UI протокол для real-time коммуникации между AI анализом и динамическим пользовательским интерфейсом, с возможностью расширения для других типов проблем и UI компонентов.

## Objectives and Scope

**В рамках этого эпика:**
- ✅ AI анализ сообщения для распознавания "интернет проблем"
- ✅ Генерация компонента кнопок с 3 предопределенными типами проблем
- ✅ Обработка клика оператора по кнопке
- ✅ Отображение подтверждения выбранной категории
- ✅ AG-UI интеграция для real-time коммуникации
- ✅ Extensible архитектура для добавления других типов компонентов
- ✅ Mock API для симуляции AI анализа
- ✅ React компоненты с TypeScript типизацией

**Вне рамок этого эпика:**
- ❌ Интеграция с реальными CRM/ticketing системами
- ❌ Сложные диалоговые flows с множественными шагами
- ❌ Персонализация на основе истории клиента
- ❌ Автоматическое создание tickets
- ❌ Интеграция с телефонией
- ❌ Реальные AI API (используем mock)
- ❌ Production deployment и monitoring

## System Architecture Alignment

Greenfield архитектура с modern best practices:

- **Frontend:** React 18.2+ с TypeScript, Vite build system
- **Backend:** Express.js с WebSocket поддержкой для AG-UI
- **Communication:** AG-UI протокол для event-driven архитектуры
- **State Management:** React Context + AG-UI events синхронизация
- **UI Framework:** Tailwind CSS для utility-first styling
- **Testing:** Jest + React Testing Library + MSW

## Detailed Design

### Services and Modules

| Модуль | Ответственность | Входы | Выходы | Владелец |
|--------|----------------|-------|--------|---------|
| MockAIService | AI анализ сообщений | message: string | ComponentIntent \| null | Backend |
| AgUiClient | AG-UI WebSocket коммуникация | AGUIEvents | React state updates | Frontend |
| UIComponentRegistry | Реестр UI компонентов | component type | React.ComponentType | Frontend |
| ProblemButtons | UI для выбора проблем | options[], onSelect | User clicks | Frontend |
| AdaptiveUIPanel | Панель динамических компонентов | components[] | Rendered UI | Frontend |
| ComponentGenerator | Генератор UI компонентов | AI analysis result | AG-UI events | Backend |

### Data Models and Contracts

```typescript
// AG-UI Event Types
interface AGUIEvent {
  type: 'TOOL_CALL_START' | 'STATE_DELTA' | 'TOOL_CALL_END' | 'TEXT_MESSAGE_CONTENT';
  data: any;
  timestamp: string;
}

// Component Intent
interface ComponentIntent {
  type: 'problem-buttons' | 'none';
  data?: {
    options: string[];
    prompt: string;
  };
}

// UI Component Plugin
interface UIComponentPlugin {
  type: string;
  trigger: (message: string) => boolean;
  component: React.ComponentType<any>;
  mockData?: any;
}

// Problem Categories
const INTERNET_PROBLEMS = [
  'Нет связи',
  'Медленный интернет', 
  'Пропадает связь'
];
```

### APIs and Interfaces

**Backend REST API:**
```
POST /api/analyze
Request: { message: string }
Response: { type: string, data: ComponentIntent }
Status: 200 OK | 400 Bad Request
```

**WebSocket AG-UI Events:**
```
// Client → Server
TEXT_MESSAGE_CONTENT: { content: string }

// Server → Client  
TOOL_CALL_START: { toolName: 'generateComponent' }
STATE_DELTA: { components: UIComponent[] }
TOOL_CALL_END: { result: 'success' | 'error' }
```

**React Component Interface:**
```typescript
interface ProblemButtonsProps {
  options: string[];
  prompt: string;
  onSelect: (option: string) => void;
}
```

### Workflows and Sequencing

**Primary Flow: Problem Categorization**

1. **User Input** → Клиент пишет: "у меня проблемы с интернетом"
2. **AI Analysis** → MockAIService анализирует сообщение
3. **Component Generation** → Server генерирует AG-UI event
4. **TOOL_CALL_START** → Frontend получает event
5. **STATE_DELTA** → ProblemButtons component рендерится
6. **User Interaction** → Оператор кликает "Медленный интернет"
7. **TOOL_CALL_END** → Клик обрабатывается
8. **Confirmation** → TEXT_MESSAGE_CONTENT с подтверждением

**Error Flow:**
- WebSocket disconnect → graceful fallback to text chat
- AI analysis failure → default text response
- Component render error → error boundary catches

## Non-Functional Requirements

### Performance

- **Component Render Time:** < 200ms от AI анализа до UI отображения
- **Mock AI Response:** < 100ms для симуляции реального времени
- **WebSocket Latency:** < 50ms для event передачи
- **UI Interaction:** < 16ms для button click feedback
- **Bundle Size:** < 2MB для production build

### Security

- **Input Validation:** Sanitization всех user inputs от XSS
- **CORS Policy:** Restricted origins для API endpoints
- **WebSocket Auth:** Simple token-based authentication для demo
- **CSP Headers:** Content Security Policy для XSS защиты
- **No Sensitive Data:** Все mock данные, никаких real credentials

### Reliability/Availability

- **Error Boundaries:** React error boundaries для graceful component failures
- **Fallback Mode:** Обычный текстовый чат если adaptive UI fails
- **Auto-Reconnect:** WebSocket auto-reconnection при disconnect
- **Graceful Degradation:** Система работает без AI analysis (fallback to manual)
- **Local Development:** 99% uptime для dev environment

### Observability

**Logging:**
- Console logs для development debugging
- Error tracking для component failures
- WebSocket connection status monitoring

**Metrics:**
- Component render performance tracking
- AI analysis response times
- User interaction success rates

**Health Checks:**
- `/health` endpoint для backend status
- WebSocket connection state indicator
- Mock service availability check

## Dependencies and Integrations

**Frontend Dependencies:**
```json
{
  "@ag-ui/protocol": "^1.0.0",
  "@copilotkit/react-core": "latest",
  "@copilotkit/react-ui": "latest",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.1.0",
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.0"
}
```

**Backend Dependencies:**
```json
{
  "express": "^4.18.2",
  "@ag-ui/middleware": "^1.0.0",
  "ws": "^8.14.0",
  "cors": "^2.8.5",
  "typescript": "^5.1.0",
  "nodemon": "^3.0.0",
  "ts-node": "^10.9.0"
}
```

**External Integrations:**
- Никаких external API calls в первой версии
- Все mock данные встроены в приложение
- Готовность к подключению real APIs через environment variables

## Acceptance Criteria (Authoritative)

1. **AI Intent Recognition:** Система должна распознавать сообщения о проблемах с интернетом с точностью 95%+

2. **Dynamic Component Generation:** Компонент ProblemButtons должен автоматически появляться с 3 опциями интернет-проблем

3. **User Interaction:** Клик по любой кнопке должен обрабатываться мгновенно (<100ms)

4. **Confirmation Display:** После клика должно отображаться подтверждение: "✅ Зафиксировано: [выбранная опция]"

5. **AG-UI Protocol:** Полный event flow должен работать через WebSocket (TOOL_CALL_START → STATE_DELTA → TOOL_CALL_END)

6. **Error Handling:** Система должна graceful degradation при сбоях (fallback к обычному чату)

7. **Extensibility:** Архитектура должна позволять легкое добавление новых UI компонентов

## Traceability Mapping

| Acceptance Criteria | Spec Section | Component/API | Test Idea |
|---------------------|--------------|---------------|----------|
| AC1: AI Recognition | MockAIService | analyzeMessage() | Unit test: message patterns |
| AC2: Component Generation | ComponentGenerator | generateProblemButtons() | Integration: event flow |
| AC3: User Interaction | ProblemButtons | onSelect handler | Component test: click events |
| AC4: Confirmation | ConfirmationMessage | display logic | UI test: message rendering |
| AC5: AG-UI Protocol | AgUiClient | WebSocket events | Integration: full flow |
| AC6: Error Handling | Error Boundaries | fallback UI | Error simulation tests |
| AC7: Extensibility | UIComponentRegistry | plugin system | Architecture test |

## Risks, Assumptions, Open Questions

**Risks:**
- Risk: AG-UI protocol compatibility issues with CopilotKit
  - Mitigation: Early prototype and testing
- Risk: Performance degradation with complex UI components
  - Mitigation: Performance budgets and monitoring
- Risk: WebSocket connection instability in development
  - Mitigation: Auto-reconnect and fallback mechanisms

**Assumptions:**
- Assumption: Simple rule-based AI analysis sufficient for demo
- Assumption: Three problem categories cover majority of internet issues
- Assumption: Operators prefer button interface over text input
- Assumption: Single epic can be implemented in one development cycle

**Open Questions:**
- Question: Should we persist conversation state between sessions?
  - Next step: Decision needed for v2 scope
- Question: How to handle multiple simultaneous problem categories?
  - Next step: UX research for complex scenarios

## Test Strategy Summary

**Unit Tests (Jest):**
- MockAIService message analysis logic
- UIComponentRegistry plugin system
- ProblemButtons component behavior
- Message analyzer utility functions

**Component Tests (React Testing Library):**
- User interaction scenarios (click, keyboard)
- Component rendering with different props
- Error state handling and recovery
- Accessibility compliance (ARIA, keyboard navigation)

**Integration Tests (MSW + WebSocket mocks):**
- Full AG-UI event flow (message → component → confirmation)
- WebSocket connection handling
- Error boundary behavior
- Component lifecycle management

**Coverage Targets:**
- Functions: 95%+
- Lines: 90%+
- Branches: 85%+
- Statements: 90%+

**Test Execution:**
- Pre-commit hooks run unit tests
- CI/CD runs full test suite
- Manual testing for UX flows