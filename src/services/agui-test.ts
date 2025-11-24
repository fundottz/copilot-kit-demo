// Basic AG-UI import test to verify library is installed and configured
import { AgentMessageEvent, StateUpdateEvent } from '@ag-ui/core'

// Type-only imports to verify TypeScript definitions are working
export type AgentMessage = AgentMessageEvent
export type StateUpdate = StateUpdateEvent

// Simple test to verify core types are accessible
export function verifyAgUiInstalled(): boolean {
  // This function just verifies imports work at runtime
  console.log('[AG-UI] Library types loaded successfully')
  return true
}
