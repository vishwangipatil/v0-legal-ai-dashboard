"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChatPanel } from "@/components/chat-panel"
import { DocumentPanel } from "@/components/document-panel"
import { HomeState } from "@/components/home-state"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { PanelLeft } from "lucide-react"

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isGenerating?: boolean
  steps?: { title: string; description: string; completed: boolean }[]
}

export type Document = {
  id: string
  title: string
  content: string
  version: number
  createdAt: Date
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [activeDocument, setActiveDocument] = useState<Document | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentTitle, setCurrentTitle] = useState("")

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsGenerating(true)

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Working on your request...",
      timestamp: new Date(),
      isGenerating: true,
      steps: [
        { title: "Analyzing request", description: "Understanding your legal requirements", completed: false },
        { title: "Reviewing legal frameworks", description: "Checking applicable Indian laws and regulations", completed: false },
        { title: "Drafting document", description: "Creating the legal document based on your requirements", completed: false },
        { title: "Generating draft", description: "Finalizing the document", completed: false },
      ],
    }

    setMessages((prev) => [...prev, assistantMessage])
    setCurrentTitle(extractTitle(content))

    for (let i = 0; i < 4; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? {
                ...msg,
                steps: msg.steps?.map((step, idx) =>
                  idx <= i ? { ...step, completed: true } : step
                ),
              }
            : msg
        )
      )
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const newDocument: Document = {
      id: crypto.randomUUID(),
      title: extractTitle(content),
      content: generateSampleDocument(content),
      version: 1,
      createdAt: new Date(),
    }

    setActiveDocument(newDocument)
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === assistantMessage.id
          ? { ...msg, isGenerating: false, content: "I have generated the document based on your request. You can view and edit it in the document panel on the right." }
          : msg
      )
    )
    setIsGenerating(false)
  }

  const handleNewThread = () => {
    setMessages([])
    setActiveDocument(null)
    setCurrentTitle("")
    setIsGenerating(false)
  }

  const hasConversation = messages.length > 0

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="flex flex-col overflow-hidden min-h-screen relative bg-background">
        {/* Sidebar Toggle Button - Fixed Position */}
        <div className="absolute top-4 left-4 z-50">
          <SidebarTrigger className="bg-card hover:bg-accent border border-border rounded-md p-2">
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </SidebarTrigger>
        </div>

        <div className="flex flex-1 flex-row overflow-hidden">
          {!hasConversation ? (
            <HomeState onSendMessage={handleSendMessage} />
          ) : (
            <>
              <ChatPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                isGenerating={isGenerating}
                onNewThread={handleNewThread}
                documentTitle={currentTitle}
              />
              {activeDocument && (
                <DocumentPanel
                  document={activeDocument}
                  onClose={() => setActiveDocument(null)}
                />
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function extractTitle(content: string): string {
  const keywords = ["agreement", "contract", "memorandum", "notice", "affidavit", "petition", "deed", "will", "power of attorney", "lease", "rental"]
  const lowerContent = content.toLowerCase()
  
  for (const keyword of keywords) {
    if (lowerContent.includes(keyword)) {
      return `Draft ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Document`
    }
  }
  
  return "Legal Document Draft"
}

function generateSampleDocument(prompt: string): string {
  return `# Legal Document

## Introduction

This document has been prepared in accordance with the applicable laws of India, including but not limited to the Indian Contract Act, 1872, and other relevant statutes.

## Purpose

Based on your request: "${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"

This document aims to address the legal requirements and provide a comprehensive framework for the matter at hand.

## Key Provisions

### 1. Definitions

For the purposes of this document:
- "Party" refers to any individual or entity bound by this document
- "Effective Date" means the date of execution of this document
- "Applicable Law" refers to the laws of India

### 2. Terms and Conditions

The parties hereby agree to the following terms and conditions:

a) All parties shall act in good faith and in accordance with the principles of natural justice.

b) Any disputes arising from this document shall be subject to the jurisdiction of Indian courts.

c) This document shall be governed by and construed in accordance with the laws of India.

### 3. Compliance Requirements

All parties must ensure compliance with:
- The Indian Contract Act, 1872
- The Information Technology Act, 2000 (if applicable)
- Relevant industry-specific regulations
- Any applicable state laws and regulations

### 4. Representations and Warranties

Each party represents and warrants that:
- They have full power and authority to enter into this agreement
- The execution of this document does not violate any existing agreements
- All information provided is true and accurate to the best of their knowledge

## Conclusion

This document represents the complete understanding between the parties regarding the subject matter herein.

---

*This document was generated by LEXI AI Assistant. Please review with a qualified legal professional before execution.*`
}
