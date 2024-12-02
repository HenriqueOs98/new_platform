import { useEffect, useRef, useState } from "react"
import { EditorState, Compartment } from "@codemirror/state"
import { EditorView, keymap } from "@codemirror/view"
import { javascript } from "@codemirror/lang-javascript"
import { basicSetup } from "codemirror"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface CodeMirrorEditorProps {
  onRunCode: (output: string[]) => void
}

const keyAction = new Compartment()

export function CodeMirrorEditor({ onRunCode }: CodeMirrorEditorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView>()
  const [code, setCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (ref.current && !viewRef.current) {
      const startState = EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          javascript(),
          EditorView.lineWrapping,
          EditorView.contentAttributes.of({ contenteditable: "true" }),
          EditorView.editable.of(true),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newCode = update.state.doc.toString()
              setCode(newCode)
            }
          }),
          EditorView.theme({
            "&": { height: "100%" },
            ".cm-scroller": { overflow: "auto" },
            ".cm-content": { 
              fontFamily: "monospace",
              minHeight: "400px"
            },
            "&.cm-focused": { outline: "none" },
            ".cm-line": { padding: "0 4px" }
          })
        ]
      })

      viewRef.current = new EditorView({
        state: startState,
        parent: ref.current
      })
    }

    return () => {
      viewRef.current?.destroy()
    }
  }, [])

  const handleRunCode = () => {
    if (isRunning || !viewRef.current) return
    setIsRunning(true)

    try {
      const output: string[] = []
      const mockConsole = {
        log: (...args: any[]) => {
          output.push(args.map(arg => String(arg)).join(' '))
        }
      }
      new Function('console', code)(mockConsole)
      onRunCode(output)
    } catch (error) {
      onRunCode([`Error: ${error.message}`])
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex-shrink-0">
        <h2 className="text-2xl font-bold">Code Editor</h2>
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <ScrollArea className="flex-1">
          <div ref={ref} className="h-full min-h-[400px] rounded-md border" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <div className="mt-4 flex justify-between">
          <Button 
            onClick={handleRunCode} 
            disabled={isRunning}
          >
            {isRunning ? 'Running...' : 'Run'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              viewRef.current?.dispatch({
                changes: { from: 0, to: code.length, insert: "" }
              })
            }}
            disabled={isRunning}
          >
            Reset
          </Button>
          <Button variant="outline">Save</Button>
          <Button variant="outline">Share</Button>
        </div>
      </div>
    </div>
  )
}