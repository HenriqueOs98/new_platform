interface User {
  id: string
  name: string
  email: string
  preferences: {
    theme: 'light' | 'dark' | 'system'
  }
  social: {
    followers: number
    following: number
  }
}

export function signIn(email: string, password: string): User | null {
  // Mock sign in logic
  const user: User = {
    id: '1',
    name: 'John Doe',
    email: email,
    preferences: {
      theme: 'system',
    },
    social: {
      followers: 10,
      following: 20,
    },
  }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export function signOut() {
  localStorage.removeItem('user')
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

