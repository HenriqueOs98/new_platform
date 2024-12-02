'use client'

import { useState } from 'react'
import TutorialPanel from '../src/components/tutorial-panel'
import { CodeMirrorEditor } from '../src/components/code-mirror-editor'
import OutputPanel from '../src/components/output-panel'
import BottomNav from '../src/components/bottom-nav'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const [output, setOutput] = useState<string[]>([])

  const handleRunCode = (codeOutput: string[]) => {
    setOutput(codeOutput)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <ResizablePanelGroup 
          direction="horizontal" 
          className="h-full"
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <ScrollArea className="h-full">
              <TutorialPanel className="h-full" />
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} minSize={30}>
                <div className="h-full w-full">
                  <CodeMirrorEditor onRunCode={handleRunCode} />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30} minSize={20}>
                <OutputPanel output={output} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <BottomNav />
    </div>
  )
}