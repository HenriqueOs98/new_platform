import { useEffect, useState, useRef } from 'react'
import { fetchCourseStructure } from '@/services/github'
import { Course, Tutorial } from '@/types/tutorial'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TutorialPanelProps {
  className?: string
}

export default function TutorialPanel({ className }: TutorialPanelProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [currentTutorialId, setCurrentTutorialId] = useState<string>('')
  const [currentTutorial, setCurrentTutorial] = useState<Tutorial | null>(null)
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadCourses() {
      try {
        const coursesData = await fetchCourseStructure()
        setCourses(coursesData)
        setLoading(false)
      } catch (error) {
        console.error('Error loading courses:', error)
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

  useEffect(() => {
    if (currentTutorialId) {
      const tutorial = courses
        .flatMap(course => course.chapters)
        .flatMap(chapter => chapter.tutorials)
        .find(t => t.id === currentTutorialId)
      
      if (tutorial) {
        setCurrentTutorial(tutorial)
      }
    }
  }, [currentTutorialId, courses])

  const handleScroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setShowScrollTop(scrollTop > 100)
  }

  const scrollToTop = () => {
    scrollAreaRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="p-4 border-b flex-shrink-0">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Tutorial</h2>
          <Select value={currentTutorialId} onValueChange={setCurrentTutorialId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tutorial" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectGroup key={course.id}>
                  <SelectLabel>{course.title}</SelectLabel>
                  {course.chapters.map(chapter => (
                    chapter.tutorials.map(tutorial => (
                      <SelectItem key={tutorial.id} value={tutorial.id}>
                        Chapter {chapter.order}: {tutorial.title}
                      </SelectItem>
                    ))
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>
            {currentTutorial?.content || 'Select a tutorial to begin'}
          </ReactMarkdown>
        </div>

        {showScrollTop && (
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-20 right-4 rounded-full"
            onClick={scrollToTop}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        )}
      </ScrollArea>
    </div>
  )
}