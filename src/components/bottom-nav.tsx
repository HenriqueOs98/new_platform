import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

export default function BottomNav() {
  return (
    <div className="border-t p-4 flex justify-between items-center bg-background sticky bottom-0 z-10 w-full">
      <div>
        <Button variant="outline" size="sm" className="mr-2">Previous Tutorial</Button>
        <Button variant="outline" size="sm">Next Tutorial</Button>
      </div>
      <Button variant="outline" size="sm">
        <MessageCircle className="mr-2 h-4 w-4" />
        AI Chat
      </Button>
    </div>
  )
}

