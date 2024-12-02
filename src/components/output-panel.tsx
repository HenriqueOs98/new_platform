import { ScrollArea } from "./ui/scroll-area"

interface OutputPanelProps {
  className?: string
  output: string
}

export default function OutputPanel({ className, output }: OutputPanelProps) {
  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="p-4 border-b flex-shrink-0">
        <h2 className="text-2xl font-bold">Output</h2>
      </div>
      <div className="flex-1 p-4">
        <ScrollArea className="h-full">
          <pre className="bg-muted p-4 rounded-md w-full min-h-[140px]">
            <code>{output}</code>
          </pre>
        </ScrollArea>
      </div>
    </div>
  )
}