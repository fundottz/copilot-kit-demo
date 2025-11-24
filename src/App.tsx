import React from 'react'
import { CopilotKit } from '@copilotkit/react-core'
import { CopilotChat } from '@copilotkit/react-ui'
import '@copilotkit/react-ui/styles.css'
import Layout from './components/Layout'

function App() {
  return (
    <CopilotKit url="http://localhost:5001/api/agui">
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
              <CopilotChat
                instructions="You are an AI assistant for contact center operators. Help categorize customer problems and generate adaptive UI components for quick problem resolution."
                labels={{
                  title: "Customer Support Assistant",
                  initial: "How can I help you with customer inquiries today?"
                }}
              />
            </main>
          </div>
          
          {/* Adaptive UI Panel - будет создан в следующих stories */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Adaptive Controls
            </h2>
            <div className="text-sm text-gray-500">
              Dynamic UI components will appear here based on AI analysis
            </div>
          </div>
        </div>
      </Layout>
    </CopilotKit>
  )
}

export default App