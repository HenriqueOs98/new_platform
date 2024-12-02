import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  role: 'user' | 'ai'
  content: string
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessages = [
        ...messages,
        { role: 'user', content: input },
        { role: 'ai', content: 'This is a mock AI response.' },
      ]
      setMessages(newMessages)
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'ai' ? 'text-blue-500' : 'text-green-500'}`}>
            <strong>{message.role === 'ai' ? 'AI: ' : 'You: '}</strong>
            {message.content}
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}

