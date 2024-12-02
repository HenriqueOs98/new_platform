const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/HenriqueOs98/coding-platform-tutorials'
const GITHUB_API_URL = 'https://api.github.com/repos/HenriqueOs98/coding-platform-tutorials'
const BRANCH = 'main'

export async function fetchCourseStructure(): Promise<Course[]> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/contents/courses?ref=${BRANCH}`)
    const data = await response.json()
    
    const courses: Course[] = []
    
    for (const courseDir of data) {
      if (courseDir.type === 'dir') {
        const courseData = await fetchCourseData(courseDir.path)
        courses.push(courseData)
      }
    }
    
    return courses
  } catch (error) {
    console.error('Error fetching course structure:', error)
    throw error
  }
}

async function fetchCourseData(coursePath: string): Promise<Course> {
  // Fetch course.json
  const courseConfigResponse = await fetch(`${GITHUB_RAW_URL}/${BRANCH}/${coursePath}/course.json`)
  const courseConfig = await courseConfigResponse.json()
  
  // Fetch chapters
  const chaptersResponse = await fetch(`${GITHUB_API_URL}/contents/${coursePath}/chapters?ref=${BRANCH}`)
  const chaptersData = await chaptersResponse.json()
  
  const chapters: Chapter[] = []
  
  for (const chapterDir of chaptersData) {
    if (chapterDir.type === 'dir') {
      const chapter = await fetchChapterData(chapterDir.path)
      chapters.push(chapter)
    }
  }
  
  return {
    ...courseConfig,
    chapters: chapters.sort((a, b) => a.order - b.order)
  }
}

async function fetchChapterData(chapterPath: string): Promise<Chapter> {
  // Fetch chapter.json
  const chapterConfigResponse = await fetch(`${GITHUB_RAW_URL}/${BRANCH}/${chapterPath}/chapter.json`)
  const chapterConfig = await chapterConfigResponse.json()
  
  // Fetch tutorials
  const tutorialsResponse = await fetch(`${GITHUB_API_URL}/contents/${chapterPath}/tutorials?ref=${BRANCH}`)
  const tutorialsData = await tutorialsResponse.json()
  
  const tutorials: Tutorial[] = []
  
  for (const tutorialFile of tutorialsData) {
    if (tutorialFile.name.endsWith('.md')) {
      const content = await fetchTutorialContent(tutorialFile.path)
      tutorials.push({
        id: tutorialFile.sha,
        title: tutorialFile.name.replace('.md', ''),
        content,
        order: parseInt(tutorialFile.name.split('-')[0]),
        fileName: tutorialFile.name,
        path: tutorialFile.path
      })
    }
  }
  
  return {
    ...chapterConfig,
    tutorials: tutorials.sort((a, b) => a.order - b.order)
  }
}

async function fetchTutorialContent(path: string): Promise<string> {
  const response = await fetch(`${GITHUB_RAW_URL}/${BRANCH}/${path}`)
  return await response.text()
} 