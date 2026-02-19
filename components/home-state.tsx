"use client"

import React from "react"
import {
  Plus,
  Search,
  Lightbulb,
  Globe,
  FileText,
  Scale,
  Briefcase,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PromptInputBox } from "@/components/ui/ai-prompt-box"

interface HomeStateProps {
  onSendMessage: (content: string) => void
}

const integrations = [
  { name: "Indian Kanoon", icon: Scale, color: "bg-amber-500" },
  { name: "SCC Online", icon: Briefcase, color: "bg-blue-500" },
  { name: "Web search", icon: Globe, color: "bg-emerald-500" },
  { name: "MCA Portal", icon: FileText, color: "bg-orange-500" },
]

const workflows = [
  {
    title: "Draft Legal Notice",
    description: "Create a formal legal notice under Indian law",
    icon: FileText,
    steps: 2,
    type: "Draft",
  },
  {
    title: "Contract Review",
    description: "Analyze contracts for compliance with Indian Contract Act",
    icon: Search,
    steps: 3,
    type: "Review",
  },
  {
    title: "Translate to Hindi",
    description: "Translate legal documents to Hindi or regional languages",
    icon: Globe,
    steps: 2,
    type: "Output",
  },
  {
    title: "Case Law Research",
    description: "Research relevant Indian case precedents",
    icon: Scale,
    steps: 2,
    type: "Research",
  },
]

export function HomeState({ onSendMessage }: HomeStateProps) {
  const handleSend = (message: string) => {
    if (message.trim()) {
      onSendMessage(message.trim())
    }
  }

  return (
    <div className="flex flex-1 flex-col w-full h-full">
      {/* Header */}
      <div className="flex w-full items-center justify-end gap-4 px-6 py-4">
        <Button variant="ghost" size="sm" className="gap-2 bg-card/50 backdrop-blur-sm">
          <Clock className="h-4 w-4" />
          Recents
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 bg-card/50 backdrop-blur-sm">
          <Lightbulb className="h-4 w-4" />
          Tips
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 w-full">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          {/* Logo */}
          <h1 className="font-serif text-5xl mb-12 tracking-wide text-foreground">LEXI</h1>

          {/* Client Matter Selector */}
          <div className="w-full mb-4">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              Set client matter
            </Button>
          </div>

          {/* Input Area - New PromptInputBox */}
          <div className="w-full">
            <PromptInputBox
              onSend={handleSend}
              placeholder="Ask LEXI anything..."
              className="bg-card"
            />
          </div>

          {/* Integrations */}
          <div className="flex items-center gap-3 mt-6">
            {integrations.map((integration) => (
              <Badge
                key={integration.name}
                variant="outline"
                className="gap-2 px-3 py-1.5 cursor-pointer hover:bg-accent transition-colors"
              >
                <span
                  className={`h-2 w-2 rounded-full ${integration.color}`}
                />
                {integration.name}
                <Plus className="h-3 w-3 text-muted-foreground" />
              </Badge>
            ))}
          </div>

          {/* Recommended Workflows */}
          <div className="w-full mt-16">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-muted-foreground">
                Recommended workflows
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2 text-sm">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
                <Button variant="ghost" size="sm" className="text-sm">
                  View all
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {workflows.map((workflow) => (
                <Card
                  key={workflow.title}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => onSendMessage(`Help me ${workflow.title.toLowerCase()}`)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-2">{workflow.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                      {workflow.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {React.createElement(workflow.icon, { className: "h-3 w-3" })}
                      <span>{workflow.type}</span>
                      <span>-</span>
                      <span>{workflow.steps} steps</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
