# copilot-kit-demo - Technical Specification

**Author:** \]
**Date:** 2025-11-23
**Project Level:** Quick Flow
**Change Type:** New Feature - Adaptive UI System
**Development Context:** Greenfield AI Contact Center Copilot

---

## Context

### Available Documents

✅ **Техническое исследование:** research-technical-2025-11-23.md - полный анализ AG-UI протокола и лучших практик для AI-копилотов контакт-центров

### Project Stack

**Обнаружен:** Greenfield проект (новая кодовая база)
**Статус:** Чистый проект без existing dependencies
**Workflow трек:** quick-flow-greenfield - быстрая техническая реализация

### Existing Codebase Structure

Greenfield проект - новая кодовая база. Никаких existing patterns для следования. Устанавливаем modern best practices согласно исследованию.

---

## The Change

### Problem Statement

**Текущая ситуация в контакт-центрах:**
- Операторы тратят время на выяснение типа проблемы клиента через открытые вопросы
- Нет стандартизированного процесса сбора информации о проблемах
- Клиенты часто неточно описывают техническую проблему
- Операторы вынуждены задавать множество уточняющих вопросов

**Конкретная проблема:**
При обращении клиента с техническими проблемами интернета оператору нужно быстро категоризировать тип проблемы для правильной эскалации в техподдержку.

### Proposed Solution

**AI-копилот с adaptive UI для быстрой категоризации проблем:**

1. **Анализ сообщения клиента** - AI распознает intent "проблемы с интернетом"
2. **Генерация UI компонентов** - автоматически предлагает операту набор кнопок с типичными проблемами  
3. **One-click категоризация** - оператор одним кликом фиксирует тип проблемы
4. **Подтверждение и передача** - система подтверждает выбор и передает структурированные данные

**Первый сценарий:**
```
Клиент: "у меня проблемы с интернетом"
AI → Оператору: [3 кнопки] "Уточните тип проблемы: [Нет связи] [Медленный интернет] [Пропадает связь]"
Оператор кликает → [Подтверждение] "✅ Зафиксировано: Медленный интернет"
```

### Scope

**В рамках этой истории:**

- ✅ AI анализ сообщения для распознавания "интернет проблем"
- ✅ Генерация компонента кнопок с 3 предопределенными типами проблем
- ✅ Обработка клика оператора по кнопке
- ✅ Отображение подтверждения выбранной категории
- ✅ AG-UI интеграция для real-time коммуникации
- ✅ Extensible архитектура для добавления других типов компонентов
- ✅ Mock API для симуляции AI анализа
- ✅ React компоненты с TypeScript типизацией

**Вне рамок этой истории:**

- ❌ Интеграция с реальными CRM/ticketing системами
- ❌ Сложные диалоговые flows с множественными шагами  
- ❌ Персонализация на основе истории клиента
- ❌ Автоматическое создание tickets
- ❌ Интеграция с телефонией
- ❌ Реальные AI API (используем mock)
- ❌ Production deployment и monitoring

---

## Implementation Details

### Source Tree Changes

**Frontend структура:**
```
src/
├── components/
│   ├── ChatInterface.tsx          - CREATE - Основной чат интерфейс
│   ├── AdaptiveUIPanel.tsx        - CREATE - Панель для динамических компонентов
│   └── ui/
│       ├── ProblemButtons.tsx     - CREATE - Компонент кнопок выбора проблем
│       └── ConfirmationMessage.tsx - CREATE - Подтверждение выбора
├── services/
│   ├── AgUiClient.ts              - CREATE - AG-UI клиент для коммуникации
│   ├── MockAIService.ts           - CREATE - Mock AI анализ сообщений
│   └── UIComponentRegistry.ts      - CREATE - Реестр UI компонентов
├── types/
│   ├── agui.ts                    - CREATE - TypeScript типы AG-UI
│   ├── components.ts              - CREATE - Типы UI компонентов
│   └── api.ts                     - CREATE - API response типы
├── hooks/
│   └── useAdaptiveUI.ts           - CREATE - React hook для управления компонентами
├── utils/
│   └── messageAnalyzer.ts         - CREATE - Утилиты анализа сообщений
└── App.tsx                        - MODIFY - Интеграция CopilotKit

backend/
├── server.ts                      - CREATE - Express сервер с AG-UI middleware
├── services/
│   ├── aiAnalyzer.ts              - CREATE - Mock AI service
│   └── componentGenerator.ts     - CREATE - Генератор UI компонентов
├── types/
│   └── events.ts                  - CREATE - AG-UI event типы
└── routes/
    └── agui.ts                    - CREATE - AG-UI endpoint
```

**Конфигурационные файлы:**
```
package.json                       - CREATE - Dependencies и scripts
tsconfig.json                      - CREATE - TypeScript конфигурация  
vite.config.ts                     - CREATE - Vite сборщик
tailwind.config.js                 - CREATE - Tailwind CSS setup
.env                               - CREATE - Environment variables
```

### Technical Approach

**Архитектура с возможностью расширения:**

**1. Plugin-based UI система:**
```typescript
interface UIComponentPlugin {
  type: string;
  trigger: (message: string) => boolean;
  generate: (context: ComponentContext) => React.ComponentType;
  mockData?: any;
}

// Extensible registry
const UI_REGISTRY = new Map<string, UIComponentPlugin>();
```

**2. AG-UI Event Flow:**
```
1. Client Message → AG-UI WebSocket → Backend
2. AI Analyzer → Component Generator → AG-UI Event  
3. TOOL_CALL_START → Frontend receives → Component renders
4. User interaction → STATE_DELTA → Backend updates
5. TOOL_CALL_END → Confirmation → TEXT_MESSAGE_CONTENT
```

**3. Mock AI с простой заменой на реальный:**
```typescript
// Mock implementation
class MockAIService implements AIAnalyzer {
  async analyzeMessage(msg: string): Promise<ComponentIntent> {
    if (msg.includes('интернет') && msg.includes('проблем')) {
      return { type: 'problem-buttons', data: INTERNET_PROBLEMS };
    }
    return { type: 'none' };
  }
}

// Future: real AI service - same interface
class DeepSeekService implements AIAnalyzer { ... }
```

**4. React компоненты с AG-UI интеграцией:**
```typescript
const AdaptiveUIPanel: React.FC = () => {
  const { components, updateComponent } = useAdaptiveUI();
  
  return (
    <div className="adaptive-panel">
      {components.map(comp => (
        <DynamicComponent key={comp.id} config={comp} />
      ))}
    </div>
  );
};
```

### Existing Patterns to Follow

**Greenfield project - устанавливаем modern best practices:**

**React patterns:**
- Функциональные компоненты с hooks
- TypeScript strict mode
- Custom hooks для бизнес-логики
- Context API для глобального состояния

**Code style:**
- ESLint + Prettier конфигурация
- Functional programming подход
- Immutable state updates  
- Error boundaries для graceful degradation

**File organization:**
- Feature-based структура (components, services, types)
- Barrel exports (index.ts files)
- Colocation принцип (компоненты рядом с типами)

**Testing patterns:**
- React Testing Library для UI тестов
- Jest для unit тестов
- MSW для mock API тестирования

### Integration Points

**AG-UI Protocol интеграция:**
- WebSocket соединение для real-time events
- Стандартизированные event types (TOOL_CALL_*, STATE_DELTA, TEXT_MESSAGE_CONTENT)
- Event-driven архитектура между frontend и backend

**CopilotKit интеграция:**
- CopilotChat как основной чат интерфейс
- CopilotKit provider для AG-UI коммуникации
- Shared state между chat и adaptive UI панелью

**Mock AI Service интеграция:**
- Simple rule-based анализ сообщений
- JSON response format совместимый с real AI APIs
- Easy swap mechanism для DeepSeek/Claude в будущем

**State management:**
- React Context для UI component state
- AG-UI events для синхронизации с backend
- Local storage для сессии (опционально)

**External dependencies:**
- Никаких external API calls в первой версии
- Все mock данные встроены в приложение
- Готовность к подключению real APIs через environment configuration

---

## Development Context

### Relevant Existing Code

**Greenfield проект - код пишется с нуля**

**Базовые референсы из исследования:**
- Архитектурные паттерны AG-UI из research-technical-2025-11-23.md
- TypeScript интеграция примеры из исследования
- Event-driven архитектура patterns
- CopilotKit интеграция examples

**Ключевые концепции для реализации:**
- AG-UI protocol event types: TOOL_CALL_START, STATE_DELTA, TOOL_CALL_END
- Plugin-based UI component система  
- Mock-first подход для быстрого прототипирования

### Dependencies

**Framework/Libraries:**

**Frontend:**
```json
{
  "@ag-ui/protocol": "^1.0.0",
  "@copilotkit/react-core": "latest", 
  "@copilotkit/react-ui": "latest",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@types/react": "^18.2.0",
  "typescript": "^5.1.0",
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "@tailwindcss/forms": "^0.5.0"
}
```

**Backend:**
```json
{
  "express": "^4.18.2",
  "@ag-ui/middleware": "^1.0.0", 
  "ws": "^8.14.0",
  "cors": "^2.8.5",
  "@types/express": "^4.17.0",
  "@types/ws": "^8.5.0",
  "nodemon": "^3.0.0",
  "ts-node": "^10.9.0"
}
```

**Development:**
```json
{
  "eslint": "^8.45.0",
  "prettier": "^3.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "jest": "^29.6.0",
  "@testing-library/react": "^13.4.0",
  "msw": "^1.2.0"
}
```

**Internal Modules:**

**Plugin система:**
- `services/UIComponentRegistry` - реестр UI компонентов
- `hooks/useAdaptiveUI` - React hook для управления dynamic UI
- `utils/messageAnalyzer` - утилиты анализа сообщений

**AG-UI интеграция:**
- `services/AgUiClient` - клиент для AG-UI коммуникации
- `types/agui` - TypeScript типы для AG-UI events
- `types/components` - типы UI компонентов и их состояний

**Mock сервисы:**
- `services/MockAIService` - симуляция AI анализа
- `backend/services/aiAnalyzer` - backend AI service
- `backend/services/componentGenerator` - генератор UI компонентов

### Configuration Changes

**Новые конфигурационные файлы:**

**.env файл:**
```bash
# AG-UI Configuration  
AGUI_WEBSOCKET_URL=ws://localhost:5001
AGUI_API_URL=http://localhost:5001

# Mock AI Configuration
MOCK_AI_ENABLED=true
MOCK_RESPONSE_DELAY=100

# Development
DEV_PORT=3000
API_PORT=5001
```

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "dev:backend": "nodemon backend/server.ts",
    "build": "vite build",
    "test": "jest",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write ."
  }
}
```

**vite.config.ts:**
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/agui': 'http://localhost:5001'
    }
  }
});
```

### Existing Conventions (Brownfield)

**N/A - Greenfield проект**

Устанавливаем новые conventions согласно modern best practices:
- TypeScript strict mode
- Functional React components  
- ESLint + Prettier автоформатирование
- Barrel exports для чистых imports
- Feature-based file organization

### Test Framework & Standards

**Testing Stack:**
- **Jest** - основной test runner
- **React Testing Library** - тестирование React компонентов  
- **MSW (Mock Service Worker)** - mock API requests
- **@testing-library/jest-dom** - дополнительные матчеры

**Test organization:**
```
src/
├── components/
│   ├── ProblemButtons.tsx
│   └── __tests__/
│       └── ProblemButtons.test.tsx
├── services/
│   ├── MockAIService.ts  
│   └── __tests__/
│       └── MockAIService.test.ts
└── __mocks__/
    └── agui-client.ts
```

**Testing patterns:**
- Unit tests: каждый service и util функция
- Component tests: user interaction scenarios
- Integration tests: AG-UI event flows  
- Mock API: MSW для симуляции backend

**Coverage targets:**
- Functions: 90%+
- Lines: 85%+  
- Branches: 80%+

---

## Implementation Stack

**Frontend Stack:**
- **Runtime:** Node.js 18+ (LTS)
- **Build Tool:** Vite 5.0+ (fast HMR, TypeScript support)
- **Framework:** React 18.2+ (concurrent features)
- **Language:** TypeScript 5.1+ (strict mode)
- **Styling:** Tailwind CSS 3.3+ (utility-first, responsive)
- **State:** React Context + AG-UI events
- **Testing:** Jest 29+ + React Testing Library
- **Linting:** ESLint 8+ + Prettier 3+

**Backend Stack:**
- **Runtime:** Node.js 18+ (same as frontend)
- **Framework:** Express 4.18+ (minimal, fast)
- **Language:** TypeScript 5.1+ (shared types with frontend)
- **WebSocket:** ws 8.14+ (AG-UI protocol transport)
- **Development:** nodemon 3+ + ts-node 10+

**AG-UI Integration:**
- **Protocol:** @ag-ui/protocol 1.0+ (official client)
- **Chat UI:** CopilotKit latest (React components)
- **Events:** WebSocket-based real-time communication

---

## Technical Details

**1. AG-UI Event Protocol Implementation:**

```typescript
// Event flow для problem categorization
type AGUIEventFlow = {
  1: 'TEXT_MESSAGE_CONTENT',    // User message in chat
  2: 'TOOL_CALL_START',         // AI начинает анализ  
  3: 'STATE_DELTA',             // Component появляется в UI
  4: 'TOOL_CALL_END',           // User кликает кнопку
  5: 'TEXT_MESSAGE_CONTENT'     // Confirmation message
};
```

**2. Plugin-based Component Architecture:**

```typescript
// Extensible компонент система
interface UIComponentPlugin {
  type: 'problem-buttons' | 'date-picker' | 'address-input';
  trigger: MessageAnalyzer;
  component: React.ComponentType<any>;
  mockData: ComponentMockData;
}

// Mock AI analyzer с простой заменой на реальный
interface MessageAnalyzer {
  analyze(message: string): Promise<ComponentIntent | null>;
}
```

**3. Mock AI Service Architecture:**

```typescript
// Simple rule-based анализ для demo
class MockAIService implements MessageAnalyzer {
  private rules = [
    {
      pattern: /интернет.*проблем|проблем.*интернет/i,
      component: 'problem-buttons',
      data: INTERNET_PROBLEMS_MOCK
    }
  ];
  
  async analyze(message: string): Promise<ComponentIntent | null> {
    // Простая логика с возможностью расширения
  }
}
```

**4. Performance Considerations:**

- **Component Lazy Loading:** Dynamic imports для UI plugins
- **Mock Response Delay:** 100ms симуляция реального AI
- **WebSocket Optimization:** Event batching для multiple updates
- **Error Boundaries:** Graceful degradation при сбоях компонентов

**5. Security Considerations:**

- **Input Validation:** Sanitization всех user inputs
- **CORS Configuration:** Restricted origins для API
- **WebSocket Authentication:** Simple token-based auth для demo
- **XSS Protection:** React automatic escaping + CSP headers

---

## Development Setup

**Prerequisites:**
- Node.js 18+ (LTS version)
- npm 9+ или yarn 1.22+
- Git 2.30+
- VS Code (рекомендуется с TypeScript extension)

**Quick Start Commands:**
```bash
# 1. Setup проекта
npx create-react-app copilot-kit-demo --template typescript
cd copilot-kit-demo

# 2. Install dependencies
npm install @ag-ui/protocol @copilotkit/react-core @copilotkit/react-ui
npm install --save-dev tailwindcss @types/ws express ws cors

# 3. Development сервера (2 terminals)
npm run dev          # Frontend на порту 3000
npm run dev:backend  # Backend на порту 5001

# 4. Testing
npm test             # Jest test runner
npm run lint         # ESLint проверка
npm run build        # Production build
```

**IDE Configuration:**
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true
}
```

---

## Implementation Guide

### Setup Steps

**Phase 1: Project Initialization (15 минут)**
1. ✅ Создать React TypeScript проект с Vite
2. ✅ Настроить Tailwind CSS для быстрой стилизации  
3. ✅ Установить AG-UI и CopilotKit dependencies
4. ✅ Создать базовую структуру папок (components, services, types)
5. ✅ Настроить ESLint + Prettier для code quality

**Phase 2: Backend Setup (15 минут)**
1. ✅ Создать Express сервер с TypeScript
2. ✅ Настроить WebSocket для AG-UI protocol
3. ✅ Создать mock AI service с простыми rules
4. ✅ Настроить CORS и basic error handling
5. ✅ Тестировать WebSocket соединение

**Phase 3: Environment Configuration (10 минут)**  
1. ✅ Создать .env файл с портами и URLs
2. ✅ Настроить proxy в Vite для backend calls
3. ✅ Проверить hot reload для frontend и backend
4. ✅ Настроить concurrent запуск обоих серверов

### Implementation Steps

**Step 1: Базовый Chat Interface (30 минут)**
```typescript
// App.tsx - интеграция CopilotKit
function App() {
  return (
    <CopilotKit url="http://localhost:5001/api/agui">
      <div className="flex h-screen">
        <CopilotChat />
        <AdaptiveUIPanel />
      </div>
    </CopilotKit>
  );
}
```

**Step 2: Mock AI Service (20 минут)**
```typescript
// backend/services/aiAnalyzer.ts
export class MockAIAnalyzer {
  analyze(message: string): ComponentIntent | null {
    if (/интернет.*проблем/i.test(message)) {
      return {
        type: 'problem-buttons',
        data: {
          options: ['Нет связи', 'Медленный интернет', 'Пропадает связь'],
          prompt: 'Уточните тип проблемы:'
        }
      };
    }
    return null;
  }
}
```

**Step 3: Problem Buttons Component (25 минут)**
```typescript
// src/components/ui/ProblemButtons.tsx
interface ProblemButtonsProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const ProblemButtons: React.FC<ProblemButtonsProps> = ({ options, onSelect }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Уточните тип проблемы:</p>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
```

**Step 4: AG-UI Integration (35 минут)**
```typescript
// src/hooks/useAdaptiveUI.ts
export const useAdaptiveUI = () => {
  const [components, setComponents] = useState<UIComponent[]>([]);
  
  useEffect(() => {
    // AG-UI WebSocket listeners
    const handleToolCallStart = (event: AGUIEvent) => {
      if (event.type === 'TOOL_CALL_START') {
        const newComponent = createComponent(event.data);
        setComponents(prev => [...prev, newComponent]);
      }
    };
    
    agUIClient.on('TOOL_CALL_START', handleToolCallStart);
    return () => agUIClient.off('TOOL_CALL_START', handleToolCallStart);
  }, []);
  
  return { components, updateComponent: setComponents };
};
```

**Step 5: Integration Testing (20 минут)**
1. ✅ Тест полного flow: сообщение → анализ → компонент → клик
2. ✅ Проверка WebSocket соединения
3. ✅ Mock данные корректно передаются  
4. ✅ UI компоненты рендерятся правильно
5. ✅ Error handling при сбоях

### Testing Strategy

**Unit Tests (Jest + RTL):**
```typescript
// __tests__/MockAIService.test.ts
describe('MockAIService', () => {
  it('should detect internet problem intent', () => {
    const analyzer = new MockAIAnalyzer();
    const result = analyzer.analyze('у меня проблемы с интернетом');
    expect(result?.type).toBe('problem-buttons');
  });
});

// __tests__/ProblemButtons.test.tsx  
describe('ProblemButtons', () => {
  it('should call onSelect when button clicked', () => {
    const onSelect = jest.fn();
    render(<ProblemButtons options={['Test']} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Test'));
    expect(onSelect).toHaveBeenCalledWith('Test');
  });
});
```

**Integration Tests (MSW):**
```typescript
// __tests__/integration/agui-flow.test.tsx
describe('AG-UI Integration', () => {
  it('should complete full adaptive UI flow', async () => {
    // Mock WebSocket + AG-UI events
    // Send message → verify component appears → click → verify confirmation
  });
});
```

### Acceptance Criteria

**✅ Core Functionality:**
1. ✅ AI распознает сообщения о проблемах с интернетом
2. ✅ Автоматически генерируются кнопки выбора типа проблемы
3. ✅ Оператор может кликнуть кнопку для выбора
4. ✅ Система показывает подтверждение выбранной категории
5. ✅ Полный flow работает через AG-UI WebSocket

**✅ Technical Requirements:**  
1. ✅ TypeScript типизация для всех компонентов
2. ✅ Responsive дизайн работает на desktop/mobile
3. ✅ Error boundaries предотвращают крушение UI
4. ✅ Mock AI service легко заменяется на реальный
5. ✅ Extensible архитектура для новых UI компонентов

**✅ Performance & UX:**
1. ✅ Компоненты появляются < 200ms после сообщения
2. ✅ UI обновления smooth без flickering
3. ✅ Graceful fallback если WebSocket disconnected
4. ✅ Loading states для async operations
5. ✅ Accessibility compliance (keyboard navigation, ARIA)

---

## Developer Resources

### File Paths Reference

**Frontend Files:**
```
src/
├── components/
│   ├── ChatInterface.tsx          # Основной чат интерфейс
│   ├── AdaptiveUIPanel.tsx        # Панель динамических компонентов  
│   └── ui/
│       ├── ProblemButtons.tsx     # Кнопки выбора проблем
│       └── ConfirmationMessage.tsx # Подтверждения выборов
├── services/
│   ├── AgUiClient.ts              # AG-UI WebSocket client
│   ├── MockAIService.ts           # Mock AI анализ
│   └── UIComponentRegistry.ts      # Реестр UI компонентов
├── hooks/
│   └── useAdaptiveUI.ts           # React hook для adaptive UI
├── types/
│   ├── agui.ts                    # AG-UI event типы
│   ├── components.ts              # UI component типы
│   └── api.ts                     # API response типы
├── utils/
│   └── messageAnalyzer.ts         # Message parsing utilities
└── App.tsx                        # Root приложение с CopilotKit
```

**Backend Files:**
```
backend/
├── server.ts                      # Express server + WebSocket setup
├── services/
│   ├── aiAnalyzer.ts              # Mock AI analysis service
│   └── componentGenerator.ts     # UI component generation
├── routes/
│   └── agui.ts                    # AG-UI endpoint handlers
└── types/
    └── events.ts                  # AG-UI event type definitions
```

**Configuration Files:**
```
package.json                       # Dependencies + npm scripts
tsconfig.json                      # TypeScript configuration
vite.config.ts                     # Vite build configuration
tailwind.config.js                 # Tailwind CSS setup
.env                               # Environment variables
jest.config.js                     # Jest test configuration
.eslintrc.js                       # ESLint code quality rules
```

### Key Code Locations

**Critical Components:**
- **AgUiClient** (src/services/AgUiClient.ts:15) - WebSocket connection management
- **useAdaptiveUI** (src/hooks/useAdaptiveUI.ts:20) - Core hook for component state
- **ProblemButtons** (src/components/ui/ProblemButtons.tsx:12) - Primary demo component
- **MockAIAnalyzer** (backend/services/aiAnalyzer.ts:25) - Intent detection logic

**Event Handlers:**
- **handleToolCallStart** (src/hooks/useAdaptiveUI.ts:45) - Component creation trigger
- **handleUserSelection** (src/components/ui/ProblemButtons.tsx:35) - Button click handler
- **processMessage** (backend/services/aiAnalyzer.ts:40) - Message analysis entry point

**Type Definitions:**
- **UIComponentPlugin** (src/types/components.ts:8) - Plugin interface  
- **AGUIEvent** (src/types/agui.ts:12) - AG-UI event types
- **ComponentIntent** (src/types/api.ts:18) - AI analysis result type

### Testing Locations

**Unit Tests:**
```
src/
├── components/
│   └── __tests__/
│       ├── ProblemButtons.test.tsx
│       └── ConfirmationMessage.test.tsx  
├── services/
│   └── __tests__/
│       ├── MockAIService.test.ts
│       └── UIComponentRegistry.test.ts
├── hooks/
│   └── __tests__/
│       └── useAdaptiveUI.test.ts
└── utils/
    └── __tests__/
        └── messageAnalyzer.test.ts
```

**Integration Tests:**
```
__tests__/
├── integration/
│   ├── agui-flow.test.tsx         # End-to-end AG-UI flow
│   ├── websocket.test.ts          # WebSocket connection tests  
│   └── component-lifecycle.test.tsx # Component generation lifecycle
└── e2e/
    └── chat-interaction.test.tsx   # Full chat interaction scenarios
```

**Mock Data:**
```
src/
└── __mocks__/
    ├── agui-client.ts             # Mock AG-UI client
    ├── websocket.ts               # Mock WebSocket
    └── ai-responses.ts            # Mock AI analysis data
```

### Documentation to Update

**README.md:**
- Project setup instructions
- Quick start commands  
- Architecture overview
- Contribution guidelines

**API.md:**
- AG-UI event documentation
- WebSocket API endpoints
- Mock AI service API
- Component plugin API

**ARCHITECTURE.md:**
- System design decisions
- Plugin system explanation
- Extension points for new components
- AG-UI integration patterns

**DEVELOPMENT.md:**
- Development workflow
- Testing strategy
- Code review process
- Deployment procedures

---

## UX/UI Considerations

**Core UX Principles:**

**1. Progressive Disclosure:**
- Компоненты появляются только когда нужны
- Не overwhelming оператора множественными опциями
- Clear visual hierarchy: chat → adaptive panel → confirmation

**2. Visual Design:**
- **Tailwind CSS utility classes** для consistent styling
- **Color coding:** blue для actions, green для confirmations, red для errors
- **Typography:** clear fonts, appropriate sizing для быстрого чтения
- **Spacing:** adequate whitespace между компонентами

**3. Interaction Patterns:**
- **Hover states** на всех интерактивных элементах
- **Click feedback** - immediate visual response
- **Loading states** during AI processing
- **Disabled states** для предотвращения double-clicks

**4. Responsive Design:**
- **Mobile-first approach** - chat interface работает на всех устройствах
- **Flexible layouts** - adaptive panel scales с content
- **Touch targets** minimum 44px для mobile использования

**5. Accessibility:**
- **ARIA labels** для screen readers
- **Keyboard navigation** - tab through всех интерактивных элементов
- **Color contrast** WCAG AA compliance
- **Focus indicators** clearly visible

**6. Error Handling UX:**
- **Graceful degradation** если AI service unavailable
- **Fallback UI** - обычный текстовый chat если adaptive UI fails
- **Error messages** user-friendly и actionable
- **Retry mechanisms** для temporary failures

---

## Testing Approach

**Testing Strategy Overview:**

**1. Unit Tests (Jest + React Testing Library):**
```typescript
// Component behavior tests
describe('ProblemButtons', () => {
  it('renders all options correctly', () => {
    const options = ['Option 1', 'Option 2'];
    render(<ProblemButtons options={options} onSelect={jest.fn()} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('calls onSelect when button clicked', () => {
    const mockSelect = jest.fn();
    render(<ProblemButtons options={['Test']} onSelect={mockSelect} />);
    fireEvent.click(screen.getByText('Test'));
    expect(mockSelect).toHaveBeenCalledWith('Test');
  });
});
```

**2. Service Tests:**
```typescript  
// Mock AI service logic tests
describe('MockAIAnalyzer', () => {
  it('detects internet problems correctly', () => {
    const analyzer = new MockAIAnalyzer();
    expect(analyzer.analyze('проблемы с интернетом')).toEqual({
      type: 'problem-buttons',
      data: expect.objectContaining({ options: expect.any(Array) })
    });
  });

  it('returns null for unrecognized messages', () => {
    const analyzer = new MockAIAnalyzer();
    expect(analyzer.analyze('hello world')).toBeNull();
  });
});
```

**3. Integration Tests (MSW + WebSocket Mocks):**
```typescript
// End-to-end AG-UI flow tests
describe('Adaptive UI Flow', () => {
  beforeEach(() => {
    // Setup MSW + mock WebSocket server
    server.use(
      rest.post('/api/analyze', (req, res, ctx) => 
        res(ctx.json({ type: 'problem-buttons', data: mockData }))
      )
    );
  });

  it('completes full adaptive UI workflow', async () => {
    render(<App />);
    
    // Send message
    fireEvent.change(screen.getByRole('textbox'), { 
      target: { value: 'проблемы с интернетом' }
    });
    fireEvent.click(screen.getByText('Send'));

    // Verify component appears
    await waitFor(() => {
      expect(screen.getByText('Уточните тип проблемы:')).toBeInTheDocument();
    });

    // Click option
    fireEvent.click(screen.getByText('Медленный интернет'));

    // Verify confirmation
    await waitFor(() => {
      expect(screen.getByText(/Зафиксировано: Медленный интернет/)).toBeInTheDocument();
    });
  });
});
```

**4. Performance Tests:**
```typescript
// Component render performance
describe('Performance', () => {
  it('renders components within 200ms threshold', async () => {
    const start = performance.now();
    
    render(<AdaptiveUIPanel components={mockComponents} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Component')).toBeInTheDocument();
    });

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(200);
  });
});
```

**5. Accessibility Tests:**
```typescript
// a11y compliance tests  
describe('Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ProblemButtons {...props} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**Test Coverage Targets:**
- **Statements:** 90%+
- **Branches:** 85%+  
- **Functions:** 95%+
- **Lines:** 90%+

---

## Deployment Strategy

### Deployment Steps

**Development Deployment:**
```bash
# 1. Проверка качества кода
npm run lint                       # ESLint validation
npm run format                     # Prettier formatting
npm test                          # Run full test suite
npm run build                     # Production build

# 2. Local testing  
npm run dev                       # Start development servers
npm run test:integration         # Run integration tests
npm run test:e2e                 # End-to-end tests

# 3. Environment setup
cp .env.example .env             # Configure environment
docker-compose up -d             # Start supporting services (if needed)
```

**Production Deployment (Simple):**
```bash
# Frontend - Static hosting (Vercel/Netlify)
npm run build                     # Create production bundle
vercel --prod                     # Deploy to Vercel

# Backend - Container deployment (Railway/Render)
docker build -t copilot-backend . 
docker run -p 5001:5001 copilot-backend

# Alternative: Node.js hosting
npm install --production
NODE_ENV=production npm start
```

**Environment Variables:**
```bash
# Production .env
NODE_ENV=production
AGUI_WEBSOCKET_URL=wss://api.yourdomain.com
AGUI_API_URL=https://api.yourdomain.com
CORS_ORIGINS=https://yourdomain.com
```

### Rollback Plan

**Automated Rollback:**
```bash
# Git-based rollback
git revert HEAD                   # Revert последний commit
git push origin main              # Trigger redeployment

# Container rollback  
docker run previous-tag           # Deploy предыдущий образ
```

**Manual Rollback Steps:**
1. ✅ Identify problematic deployment via monitoring
2. ✅ Stop current containers/services  
3. ✅ Deploy previous known-good version
4. ✅ Verify all services healthy
5. ✅ Update DNS/load balancer если needed
6. ✅ Communicate rollback status

**Data Rollback:** 
- No database changes in первой версии - статeless design
- Local storage может быть cleared если needed

### Monitoring

**Application Monitoring:**
```typescript
// Basic error tracking
const errorHandler = (error: Error, context: string) => {
  console.error(`Error in ${context}:`, error);
  // В production: отправка в Sentry/LogRocket
};

// Performance monitoring
const performanceTracker = {
  trackComponentRender: (componentName: string, duration: number) => {
    if (duration > 200) {
      console.warn(`Slow component: ${componentName} (${duration}ms)`);
    }
  }
};
```

**Key Metrics для Monitoring:**
- **WebSocket Connection Status:** connected/disconnected events
- **Component Render Times:** < 200ms target для adaptive UI
- **AI Analysis Response Time:** < 500ms для mock service  
- **Error Rates:** track failed component generations
- **User Interaction Success Rate:** successful button clicks → confirmations

**Health Check Endpoints:**
```typescript
// backend/routes/health.ts
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      websocket: wsServer.clients.size > 0 ? 'connected' : 'disconnected',
      aiService: 'mock' // или real service status
    }
  });
});
```

**Simple Alerting:**
- Browser console warnings для development
- Health check failures → restart services
- В production: интеграция с Slack/email для critical errors