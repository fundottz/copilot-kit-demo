# Story 3.a: Adaptive UI Panel Dynamic Rendering

Status: ready-for-dev

## Story

As a **Frontend Developer**,
I want to **implement dynamic component rendering logic in AdaptiveUIPanel using a component registry system**,
so that **different UI components can be rendered dynamically based on AG-UI events without hardcoding component types**.

## Acceptance Criteria

1. **Component Registry:** UIComponentRegistry service создан для регистрации и получения UI component plugins
2. **Dynamic Component Wrapper:** DynamicComponent wrapper создан для rendering любых зарегистрированных компонентов
3. **Plugin Registration:** Базовая регистрация компонента (placeholder) для демонстрации системы
4. **Event-Driven Rendering:** AdaptiveUIPanel слушает AG-UI STATE_DELTA events и рендерит компоненты
5. **Component Lifecycle:** Компоненты добавляются/удаляются из panel на основе event data
6. **Type Safety:** TypeScript интерфейсы для plugin system (ComponentPlugin, ComponentConfig)
7. **Empty State Handling:** Panel показывает полезное сообщение когда нет активных компонентов
8. **Error Resilience:** Ошибки rendering одного компонента не ломают весь panel

## Tasks / Subtasks

- [ ] **UIComponentRegistry Service** (AC: 1)
  - [ ] Создать src/services/UIComponentRegistry.ts с Map-based registry
  - [ ] Реализовать register(type, component) метод
  - [ ] Реализовать get(type) метод для получения компонента
  - [ ] Добавить TypeScript интерфейс ComponentPlugin
  - [ ] Экспортировать singleton instance через barrel export

- [ ] **DynamicComponent Wrapper** (AC: 2)
  - [ ] Создать src/components/DynamicComponent.tsx
  - [ ] Принимать config prop с { type, id, props }
  - [ ] Использовать UIComponentRegistry.get(type) для получения component
  - [ ] Render компонент с переданными props
  - [ ] Обработать случай когда component type не зарегистрирован

- [ ] **Plugin System Integration** (AC: 3,6)
  - [ ] Создать src/types/components.ts с ComponentPlugin interface
  - [ ] Создать src/types/components.ts с ComponentConfig interface
  - [ ] Зарегистрировать placeholder компонент для demo (например, SimpleCard)
  - [ ] Создать SimpleCard.tsx как первый demo plugin
  - [ ] Документировать plugin registration pattern в Dev Notes

- [ ] **Event-Driven Rendering Logic** (AC: 4,5)
  - [ ] Обновить useAdaptiveUI hook для обработки STATE_DELTA events
  - [ ] Парсить event data для извлечения component configs
  - [ ] Добавить/обновить компоненты в state array
  - [ ] Реализовать removeComponent функцию для cleanup
  - [ ] Добавить unique key generation для React list rendering

- [ ] **AdaptiveUIPanel Updates** (AC: 7,8)
  - [ ] Обновить AdaptiveUIPanel для mapping components array
  - [ ] Render DynamicComponent для каждого item в array
  - [ ] Добавить empty state UI когда components.length === 0
  - [ ] Обернуть каждый DynamicComponent в ErrorBoundary
  - [ ] Добавить Tailwind styling для component spacing

- [ ] **Testing & Validation**
  - [ ] Unit test для UIComponentRegistry (register/get methods)
  - [ ] Component test для DynamicComponent с mock plugin
  - [ ] Test useAdaptiveUI hook с mock STATE_DELTA event
  - [ ] Manual test: trigger fake event и verify component появляется
  - [ ] Test error handling когда component type не найден

## Dev Notes

### Architecture Patterns

**Plugin System Design:**
- **Component Registry:** Centralized Map<string, ComponentType> для всех UI plugins
- **Dynamic Rendering:** React.createElement pattern для runtime component creation
- **Type Safety:** TypeScript generics для plugin props typing
- **Extensibility:** Новые компоненты добавляются через simple registration

**Component Rendering Flow:**
```
1. AG-UI STATE_DELTA event → useAdaptiveUI hook
2. Hook парсит event.data → extracts component configs
3. Configs добавляются в components state array
4. AdaptiveUIPanel maps array → renders DynamicComponent для каждого
5. DynamicComponent looks up registry → renders actual component
```

**Error Isolation Strategy:**
- Каждый DynamicComponent обернут в отдельный ErrorBoundary
- Сбой одного компонента не влияет на other components
- Error boundary показывает fallback UI для failed component
- Errors логируются но не крашат приложение

### Learnings from Previous Story

**From Story 2a-chat-interface-copilotkit-integration (Status: ready-for-dev)**

- **Созданные Компоненты:** AdaptiveUIPanel базовая структура, useAdaptiveUI hook, ErrorBoundary wrapper
- **TypeScript Types:** agui.ts, components.ts, api.ts types уже определены
- **AG-UI Integration:** WebSocket connection и event listeners настроены в useAdaptiveUI
- **Folder Structure:** components/, services/, types/, hooks/ структура установлена
- **Dependency Warning:** Backend Story 1b может не быть готов - STATE_DELTA events могут не приходить, нужно добавить mock testing

**Что Переиспользовать:**
- useAdaptiveUI hook (расширить для STATE_DELTA handling)
- AdaptiveUIPanel component (добавить dynamic rendering logic)
- ErrorBoundary component (wrap каждый DynamicComponent)
- TypeScript types (ComponentPlugin, ComponentConfig уже определены в Story 2a)

[Source: stories/2a-chat-interface-copilotkit-integration.md]

### Source Tree Components

**Файлы для СОЗДАНИЯ:**
```
src/
├── components/
│   ├── DynamicComponent.tsx       # Wrapper для dynamic rendering
│   └── ui/
│       └── SimpleCard.tsx         # Demo plugin component
├── services/
│   └── UIComponentRegistry.ts     # Component registry singleton
└── types/
    └── components.ts              # (UPDATE) Add ComponentPlugin, ComponentConfig
```

**Файлы для МОДИФИКАЦИИ:**
```
src/
├── components/
│   └── AdaptiveUIPanel.tsx        # Add dynamic component mapping
├── hooks/
│   └── useAdaptiveUI.ts           # Add STATE_DELTA event handling
└── types/
    └── index.ts                   # Export new types
```

### Testing Standards

**Unit Tests (Manual - Jest не настроен):**
- Browser console testing для registry operations
- React DevTools для проверки component state
- Artificial STATE_DELTA event через console для testing rendering

**Component Tests (Future automated):**
```typescript
// Пример для future implementation
describe('UIComponentRegistry', () => {
  it('registers and retrieves components', () => {
    const registry = UIComponentRegistry.getInstance();
    registry.register('test', TestComponent);
    expect(registry.get('test')).toBe(TestComponent);
  });
});

describe('DynamicComponent', () => {
  it('renders registered component with props', () => {
    render(<DynamicComponent config={{ type: 'test', id: '1', props: { text: 'Hello' } }} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

**Integration Testing:**
- Manual: Create mock STATE_DELTA event in console
- Verify component appears in AdaptiveUIPanel
- Test multiple components rendering simultaneously
- Test component removal from panel

### Project Structure Notes

**Plugin Architecture Benefits:**
- **Decoupling:** UI components не знают о AdaptiveUIPanel
- **Extensibility:** Stories 1c, 2c, 3c могут добавлять свои компоненты через registry
- **Type Safety:** TypeScript generics обеспечивают props typing
- **Testing:** Каждый plugin тестируется независимо

**Integration Points:**
- Story 2a создает базовый layout и hook
- Story 3a добавляет dynamic rendering логику
- Stories 1c/2c/3c будут регистрировать конкретные UI компоненты (ProblemButtons, etc.)
- Story 4 (Integration) соединит все вместе с real AG-UI events

### References

- [Tech Spec: Plugin-based UI System] `docs/tech-spec.md#technical-approach` (строка 133-145)
- [Tech Spec: Dynamic Component Rendering] `docs/tech-spec.md#implementation-guide` (строка 173-185)
- [Epic Tech Spec: UI Component Plugin Interface] `docs/sprint-artifacts/tech-spec-epic-1.md#data-models-and-contracts` (строка 80-86)
- [Epic Tech Spec: Component Registry Service] `docs/sprint-artifacts/tech-spec-epic-1.md#services-and-modules` (строка 56)
- [Previous Story: 2a useAdaptiveUI Hook] `docs/sprint-artifacts/2a-chat-interface-copilotkit-integration.md#tasks-subtasks` (строка 36-40)

## Dev Agent Record

### Context Reference

- [Story Context XML](3a-adaptive-ui-panel-dynamic-rendering.context.xml) - Generated 2025-11-24

### Agent Model Used

Claude Sonnet 4.5 (Dev Agent - Amelia)

### Debug Log References

### Completion Notes List

### File List
