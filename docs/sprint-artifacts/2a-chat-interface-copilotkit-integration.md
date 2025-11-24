# Story 2.a: Chat Interface с CopilotKit Integration

Status: drafted

## Story

As a **Frontend Developer**,
I want to **integrate CopilotKit chat interface with AG-UI WebSocket connection and create the adaptive UI panel layout**,
so that **operators can communicate with AI and see dynamically generated UI components in real-time**.

## Acceptance Criteria

1. **CopilotKit Integration:** CopilotKit provider настроен с подключением к backend AG-UI endpoint (http://localhost:5001/api/agui)
2. **Chat Interface:** CopilotChat component отображается и позволяет ввод/отправку сообщений
3. **Adaptive UI Panel:** AdaptiveUIPanel component создан и отображается рядом с chat интерфейсом
4. **Layout Structure:** Responsive layout с chat слева и adaptive panel справа (flexbox)
5. **WebSocket Connection:** AG-UI WebSocket соединение устанавливается при загрузке приложения
6. **Basic State Management:** useAdaptiveUI hook создан для управления состоянием dynamic компонентов
7. **Error Boundaries:** React error boundary обрабатывает сбои компонентов без крушения всего UI
8. **TypeScript Types:** Все AG-UI event types и component types определены в src/types/

## Tasks / Subtasks

- [ ] **CopilotKit Setup & Configuration** (AC: 1,2)
  - [ ] Обернуть App.tsx в CopilotKit provider с URL backend
  - [ ] Настроить CopilotChat component с базовыми props
  - [ ] Проверить WebSocket connection в DevTools
  - [ ] Добавить error handling для connection failures

- [ ] **Adaptive UI Panel Component** (AC: 3,4)
  - [ ] Создать AdaptiveUIPanel.tsx с базовой разметкой
  - [ ] Реализовать flexbox layout для chat + panel
  - [ ] Сделать responsive design (работает на mobile/desktop)
  - [ ] Добавить placeholder content для пустого состояния

- [ ] **AG-UI Hook & State Management** (AC: 5,6)
  - [ ] Создать useAdaptiveUI.ts hook с useState для components array
  - [ ] Настроить AgUiClient service для WebSocket соединения
  - [ ] Добавить event listeners для AG-UI events (TOOL_CALL_START, STATE_DELTA)
  - [ ] Реализовать updateComponent функцию для динамического добавления компонентов

- [ ] **TypeScript Type Definitions** (AC: 8)
  - [ ] Создать src/types/agui.ts с AG-UI event types (AGUIEvent, ToolCallStart, StateDelta)
  - [ ] Создать src/types/components.ts с UI component types (UIComponent, ComponentPlugin)
  - [ ] Создать src/types/api.ts с API response types (ComponentIntent)
  - [ ] Экспортировать все типы через barrel export (src/types/index.ts)

- [ ] **Error Handling & Boundaries** (AC: 7)
  - [ ] Создать ErrorBoundary component для graceful degradation
  - [ ] Обернуть AdaptiveUIPanel в error boundary
  - [ ] Добавить fallback UI для error states
  - [ ] Логировать errors в console для debugging

- [ ] **Testing & Validation**
  - [ ] Написать unit test для useAdaptiveUI hook
  - [ ] Создать component test для AdaptiveUIPanel rendering
  - [ ] Проверить WebSocket connection manually
  - [ ] Тестировать responsive layout на разных размерах экрана
  - [ ] Проверить error boundary behavior при симуляции ошибок

## Dev Notes

### Architecture Patterns

**Component Structure:**
- **CopilotKit Provider:** Root level provider для AG-UI коммуникации
- **Hook-Based State:** useAdaptiveUI centralized state для dynamic UI
- **Plugin Architecture:** Extensible system для новых UI компонентов в future stories
- **Error Boundaries:** Graceful degradation при component failures

**AG-UI Event Flow:**
```
1. User Message → CopilotChat
2. WebSocket → Backend (Story 1b will handle)
3. AG-UI Event (TOOL_CALL_START) → Frontend
4. useAdaptiveUI updates state → AdaptiveUIPanel rerenders
5. Dynamic component appears in panel
```

### Learnings from Previous Story

**From Story 1a-frontend-setup-base-components (Status: review)**

- **Правильные Пакеты:** Использовать `@ag-ui/client` + `@ag-ui/core` v0.0.41 (НЕ @ag-ui/protocol!)
- **CopilotKit Версии:** `@copilotkit/react-core` и `@copilotkit/react-ui` v1.10.6
- **Установленные Зависимости:** Все 718 npm пакетов уже установлены, готовы к использованию
- **Dev Server:** Работает на http://localhost:3000/
- **Структура Проекта:** src/ folder structure уже создана (components/, services/, types/, hooks/, utils/)
- **Technical Debt:** ⚠️ Jest testing framework не настроен - использовать manual testing для этой истории

**Архитектурные Решения из Story 1a:**
- TypeScript strict mode включен
- ESLint + Prettier настроены
- Tailwind CSS готов к использованию
- Barrel exports установлены

**Файлы для Переиспользования:**
- frontend-dev/package.json - зависимости уже правильные
- frontend-dev/src/App.tsx - базовая структура есть, нужно добавить CopilotKit
- frontend-dev/src/types/ - создать новые типы здесь

[Source: stories/1a-frontend-setup-base-components.md#Completion-Notes-List]

### Source Tree Components

**Файлы для СОЗДАНИЯ:**
```
src/
├── components/
│   ├── ChatInterface.tsx          # Wrapper для CopilotChat с custom styling
│   ├── AdaptiveUIPanel.tsx        # Панель для dynamic компонентов
│   └── ErrorBoundary.tsx          # Error boundary component
├── services/
│   └── AgUiClient.ts              # AG-UI WebSocket client
├── hooks/
│   └── useAdaptiveUI.ts           # Hook для adaptive UI state
└── types/
    ├── agui.ts                    # AG-UI event types
    ├── components.ts              # UI component types
    ├── api.ts                     # API response types
    └── index.ts                   # Barrel export
```

**Файлы для МОДИФИКАЦИИ:**
```
src/App.tsx                        # Добавить CopilotKit provider и layout
```

### Testing Standards

**Unit Tests (для этой истории - manual, т.к. Jest не настроен):**
- Manually проверить WebSocket connection в Browser DevTools
- Проверить React state updates через React DevTools
- Тестировать error boundary через искусственные errors в console

**Component Tests (Future - когда Jest будет настроен):**
```typescript
// Пример для future implementation
describe('AdaptiveUIPanel', () => {
  it('renders empty state when no components', () => {
    render(<AdaptiveUIPanel components={[]} />);
    expect(screen.getByText('Ожидание компонентов...')).toBeInTheDocument();
  });
});
```

**Integration Testing:**
- Manual testing с dev server running
- Проверка WebSocket events через Browser Network tab
- Visual testing responsive layout

### Project Structure Notes

**Alignment Strategy:**
- Следовать folder structure установленной в Story 1a
- Использовать barrel exports для чистых imports
- TypeScript types в src/types/ для sharing с other stories
- Services layer для WebSocket logic отдельно от UI

**Parallel Development Considerations:**
- Story 1b (Backend) будет создавать AG-UI endpoint
- Story 2a (Frontend - эта история) готовит UI для приема events
- Story 3a будет добавлять dynamic rendering logic
- Интеграция произойдет в Story 4 (End-to-End Integration)

**Dependency на Story 1b:**
- Backend AG-UI endpoint пока не существует
- WebSocket connection будет fail до реализации Story 1b
- Для development: можно использовать mock WebSocket или просто отображать connection error gracefully

### References

- [Tech Spec: Chat Interface Implementation] `docs/tech-spec.md#implementation-guide` (строка 576-589)
- [Tech Spec: AG-UI Client] `docs/tech-spec.md#source-tree-changes` (строка 97)
- [Tech Spec: useAdaptiveUI Hook] `docs/tech-spec.md#implementation-guide` (строка 639-659)
- [Epic Tech Spec: AG-UI Event Types] `docs/sprint-artifacts/tech-spec-epic-1.md#data-models-and-contracts` (строка 64-93)
- [Epic Tech Spec: Services Table] `docs/sprint-artifacts/tech-spec-epic-1.md#services-and-modules` (строка 52-59)
- [Previous Story: 1a Dependencies] `docs/sprint-artifacts/1a-frontend-setup-base-components.md#completion-notes-list` (строка 111-129)

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Sonnet 4.5 (Dev Agent - Amelia)

### Debug Log References

### Completion Notes List

### File List
