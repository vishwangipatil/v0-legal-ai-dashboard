"use client"

import { useState } from "react"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  Copy,
  Scissors,
  RotateCcw,
  RotateCw,
  X,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Clock,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Document } from "@/app/page"

interface DocumentPanelProps {
  document: Document
  onClose: () => void
}

export function DocumentPanel({ document, onClose }: DocumentPanelProps) {
  const [showFeedback, setShowFeedback] = useState(true)

  const renderContent = (content: string) => {
    const lines = content.split("\n")
    return lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-2xl font-bold mt-6 mb-4 first:mt-0">
            {line.replace("# ", "")}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-semibold mt-5 mb-3">
            {line.replace("## ", "")}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-semibold mt-4 mb-2">
            {line.replace("### ", "")}
          </h3>
        )
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.replace("- ", "")}
          </li>
        )
      }
      if (line.startsWith("a) ") || line.startsWith("b) ") || line.startsWith("c) ")) {
        return (
          <p key={index} className="ml-4 mb-2">
            {line}
          </p>
        )
      }
      if (line.startsWith("*") && line.endsWith("*")) {
        return (
          <p key={index} className="text-sm text-muted-foreground italic mt-4">
            {line.replace(/\*/g, "")}
          </p>
        )
      }
      if (line === "---") {
        return <hr key={index} className="my-6 border-border" />
      }
      if (line.trim() === "") {
        return <div key={index} className="h-2" />
      }
      return (
        <p key={index} className="mb-2 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="flex flex-1 flex-col bg-background min-w-[500px]">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select defaultValue="paragraph">
            <SelectTrigger className="w-[120px] h-8 text-sm">
              <SelectValue placeholder="Paragraph" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="heading1">Heading 1</SelectItem>
              <SelectItem value="heading2">Heading 2</SelectItem>
              <SelectItem value="heading3">Heading 3</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Underline className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Strikethrough className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Scissors className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2 text-sm">
            <Edit3 className="h-4 w-4" />
            Show edits
          </Button>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Version {document.version}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Feedback Banner */}
      {showFeedback && (
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium bg-foreground text-background px-2 py-0.5 rounded">
              Beta
            </span>
            <span className="text-sm text-muted-foreground">
              Your feedback helps us make this feature better. Tell us what you think.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-sm">
              Send feedback
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowFeedback(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Document Content */}
      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-3xl px-8 py-8">
          <div className="prose prose-sm max-w-none">
            {renderContent(document.content)}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Add comment
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Last edited just now</span>
        </div>
      </div>
    </div>
  )
}
