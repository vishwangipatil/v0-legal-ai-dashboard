"use client"

import { useState } from "react"
import {
  MessageSquare,
  FolderOpen,
  GitBranch,
  History,
  BookOpen,
  Compass,
  Settings,
  HelpCircle,
  Search,
  Copy,
  Plus,
  ChevronDown,
  ChevronRight,
  X,
  PanelLeftClose,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const mainNavItems = [
  { icon: MessageSquare, label: "Assistant", active: true },
  { icon: FolderOpen, label: "Vault", hasAdd: true, subItems: ["Supply Agreements", "Employment Contracts", "NDAs"] },
  { icon: GitBranch, label: "Workflows", subItems: ["Workflow Builder", "Templates"] },
  { icon: History, label: "History" },
  { icon: BookOpen, label: "Library" },
  { icon: Compass, label: "Guidance" },
]

const footerItems = [
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
]

export function AppSidebar() {
  const [openItems, setOpenItems] = useState<string[]>(["Vault"])
  const [showNotification, setShowNotification] = useState(true)
  const [activeTab, setActiveTab] = useState("navigation")
  const { toggleSidebar } = useSidebar()

  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl tracking-wide text-sidebar-foreground">LEXI</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Duplicate</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={toggleSidebar}
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Close Sidebar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="px-2 pb-2">
          <Button variant="outline" className="w-full justify-start gap-2 h-9 bg-transparent">
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-2 pt-2">
            <TabsList className="w-full grid grid-cols-2 h-9">
              <TabsTrigger value="navigation" className="text-xs">Navigation</TabsTrigger>
              <TabsTrigger value="recent" className="text-xs">Recent</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="navigation" className="mt-0">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      {item.subItems ? (
                        <Collapsible
                          open={openItems.includes(item.label)}
                          onOpenChange={() => toggleItem(item.label)}
                        >
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton isActive={item.active}>
                              <item.icon className="h-4 w-4" />
                              <span className="flex-1">{item.label}</span>
                              {item.hasAdd && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 ml-auto"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Add New</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              {openItems.includes(item.label) ? (
                                <ChevronDown className="h-4 w-4 transition-transform" />
                              ) : (
                                <ChevronRight className="h-4 w-4 transition-transform" />
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.subItems.map((subItem) => (
                                <SidebarMenuSubItem key={subItem}>
                                  <SidebarMenuSubButton>
                                    <span>{subItem}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <SidebarMenuButton isActive={item.active}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <SidebarGroup>
              <SidebarGroupContent>
                <div className="px-2 py-4 space-y-2">
                  <Card className="bg-card">
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-xs font-medium">Contract Review - ABC Corp</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card">
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-xs font-medium">NDA Draft - XYZ Ltd</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card">
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-xs font-medium">Legal Notice - Tenant</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </CardContent>
                  </Card>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </TabsContent>
        </Tabs>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar">
        {showNotification && (
          <Card className="mx-2 mb-2 bg-card">
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium">Edit and verify documents</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 -mt-1 -mr-1"
                  onClick={() => setShowNotification(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You can now edit documents and track verification progress in Vault.
              </p>
              <Button variant="link" className="h-auto p-0 text-xs mt-2">
                Learn more
              </Button>
            </CardContent>
          </Card>
        )}
        <SidebarSeparator />
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton>
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
