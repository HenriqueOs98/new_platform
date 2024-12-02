export function executeCode(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Mock execution with timeout and line limit
    const lines = code.split('\n')
    if (lines.length > 3000) {
      reject('Error: Code exceeds 3000 lines limit')
    }

    setTimeout(() => {
      try {
        // This is a mock execution. In a real implementation, you'd use a Web Worker
        // and implement proper safety measures.
        const result = eval(code)
        resolve(String(result))
      } catch (error) {
        reject(`Error: ${error}`)
      }
    }, Math.random() * 1000) // Simulate random execution time up to 1 second
  })
}

