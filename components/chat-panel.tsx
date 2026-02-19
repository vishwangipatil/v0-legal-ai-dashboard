"use client"

import {
  Copy,
  Bookmark,
  Edit3,
  Check,
  Loader2,
  ChevronDown,
  FileText,
  Clock,
  MoreHorizontal,
  PlusCircle,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { PromptInputBox } from "@/components/ui/ai-prompt-box"
import type { Message } from "@/app/page"

interface ChatPanelProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isGenerating: boolean
  onNewThread: () => void
  documentTitle: string
}

export function ChatPanel({
  messages,
  onSendMessage,
  isGenerating,
  onNewThread,
  documentTitle,
}: ChatPanelProps) {
  const handleSend = (message: string) => {
    if (message.trim() && !isGenerating) {
      onSendMessage(message.trim())
    }
  }

  return (
    <div className="flex flex-1 flex-col border-r border-border min-w-[400px] max-w-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Assistant</span>
          <span className="text-muted-foreground">/</span>
        </div>
      </div>

      {/* Document Title */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold truncate">
            {documentTitle || "New Conversation"}
          </h1>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Edit3 className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span>Assist</span>
          <span>-</span>
          <FileText className="h-3 w-3" />
          <span>Files</span>
          <span>-</span>
          <span>1 source</span>
          <span>-</span>
          <Clock className="h-3 w-3" />
          <span>Created {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4">
        <div className="py-4 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="space-y-3">
              {message.role === "user" ? (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    U
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Bookmark className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit3 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="flex h-8 shrink-0 items-center justify-center text-sm font-serif tracking-wide">
                    LEXI
                  </div>
                  <div className="flex-1 space-y-3">
                    {message.isGenerating && message.steps ? (
                      <Collapsible defaultOpen>
                        <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
                          <span>Working...</span>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-3 space-y-3">
                            {message.steps.map((step, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 rounded-lg border border-border p-3"
                              >
                                <div className="mt-0.5">
                                  {step.completed ? (
                                    <Check className="h-4 w-4 text-foreground" />
                                  ) : (
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{step.title}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}

                    {message.isGenerating && (
                      <div className="rounded-lg border border-border p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span>Generating new version...</span>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    )}

                    {!message.isGenerating && (
                      <div className="text-xs text-muted-foreground">Version 1</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input - New PromptInputBox */}
      <div className="border-t border-border p-4">
        <PromptInputBox
          onSend={handleSend}
          isLoading={isGenerating}
          placeholder="Ask LEXI..."
        />
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between border-t border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2" onClick={onNewThread}>
            <PlusCircle className="h-4 w-4" />
            New thread
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="default" size="sm">
            Export
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
