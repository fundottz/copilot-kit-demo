import React, { useEffect } from 'react'
import { CopilotKit } from '@copilotkit/react-core'
import Layout from './components/Layout'
import { verifyAgUiInstalled } from './services/agui-test'

function App() {
  useEffect(() => {
    // Verify AG-UI is installed and working
    verifyAgUiInstalled()
  }, [])
  return (
    <CopilotKit runtimeUrl="/api/copilot">
      <Layout>
        <div className="flex h-screen">
          {/* Main Chat Interface */}
          <div className="flex-1 flex flex-col">
            <header className="bg-white border-b border-gray-200 px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-900">
                AI Contact Center Copilot
              </h1>
              <p className="text-sm text-gray-600">
                Adaptive UI for intelligent problem categorization
              </p>
            </header>

            <main className="flex-1 p-6">
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Chat Interface Placeholder
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  CopilotKit integration will be added in Story 2A
                </p>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm">
                    👋 Hello! This is where the AI chat interface will appear.
                  </p>
                </div>
              </div>
            </main>
          </div>

          {/* Adaptive UI Panel - будет создан в следующих stories */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Adaptive Controls
            </h2>
            <div className="bg-white p-3 rounded border border-dashed border-gray-300">
              <p className="text-sm text-gray-500">
                Dynamic UI components will appear here based on AI analysis
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </CopilotKit>
  )
}

export default App