// AG-UI Event Types
export interface AGUIEvent {
  type: 'TOOL_CALL_START' | 'STATE_DELTA' | 'TOOL_CALL_END' | 'TEXT_MESSAGE_CONTENT'
  data: any
  timestamp: string
}

// Component Intent from AI Analysis
export interface ComponentIntent {
  type: 'problem-buttons' | 'date-picker' | 'address-input' | 'none'
  data?: {
    options?: string[]
    prompt?: string
    [key: string]: any
  }
}

// UI Component Plugin Interface
export interface UIComponentPlugin {
  type: string
  trigger: (message: string) => boolean
  component: React.ComponentType<any>
  mockData?: any
}

// Generic UI Component Configuration
export interface UIComponent {
  id: string
  type: string
  props: Record<string, any>
  timestamp: string
}

// API Response Types
export interface AnalysisResponse {
  success: boolean
  intent: ComponentIntent | null
  error?: string
}

export interface AGUIClientConfig {
  websocketUrl: string
  apiUrl: string
}

// Problem Categories for Demo
export const INTERNET_PROBLEMS = [
  'Нет связи',
  'Медленный интернет', 
  'Пропадает связь'
] as const

export type InternetProblemType = typeof INTERNET_PROBLEMS[number]

// Note: This is the main types entry point
// Future: Add more specific type files as needed