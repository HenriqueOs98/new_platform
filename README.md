# CodeCraft: Browser-based Coding Platform

CodeCraft is a modern, interactive coding platform built with Next.js, designed to provide an engaging learning experience for developers of all skill levels.

## Features

- **Interactive Code Editor**: Write and execute JavaScript code directly in your browser.
- **Real-time Output**: See the results of your code execution instantly.
- **Tutorial System**: Learn through structured, markdown-based tutorials with progress tracking.
- **AI Chat Assistant**: Get help and answers to your coding questions (mock implementation).
- **Dark/Light Mode**: Choose your preferred theme for comfortable coding.
- **Responsive Design**: Enjoy a seamless experience on desktop and mobile devices.
- **User Authentication**: Secure user accounts with preferences and social features (mock implementation).

## Tech Stack

- **Frontend Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (required for all UI components)
- **Code Editor**: Code Mirror (mocked in current implementation)
- **State Management**: React Hooks
- **Authentication**: Browser storage (prepared for Supabase integration)
- **Content Management**: GitHub-based tutorial system

## Development Guidelines

### UI Components
- All UI components must use shadcn/ui library components
- Custom components should extend shadcn/ui base components
- Maintain consistent styling using Tailwind CSS classes

### Component Structure
- Use TypeScript for all components
- Implement proper type definitions
- Follow the established project structure

### Layout Requirements
- All panels must implement proper overflow handling
- Navigation elements (navbar, bottom nav) must remain fixed
- Use ResizablePanelGroup for adjustable layouts
- Implement scrollable content areas within fixed containers
- Code editor layout pattern:
  - Use flex-col with h-full for container
  - Header with flex-shrink-0 to prevent compression
  - Content area with flex-1 and h-full
  - Textarea with flex-1 and min-h-[400px]
  - Button container with flex-shrink-0

### Component Sizing Guidelines
- Use flexible layouts with flex-1 for main content
- Set minimum heights only where necessary (e.g., code editor min-h-[400px])
- Avoid nested percentage heights
- Use flex-shrink-0 for fixed-size elements
- Maintain proper padding and spacing with p-4

## Project Structure

src/
├── components/
│ ├── ui/ # shadcn/ui components
│ ├── layout/ # Layout components
│ └── features/ # Feature-specific components
├── services/ # API and external services
├── types/ # TypeScript definitions
├── lib/ # Utility functions
└── styles/ # Global styles

## Component Guidelines

### Required Props
- All components should accept `className` prop for style overrides
- Use proper TypeScript interfaces for props
- Document required and optional props

### Styling
- Use Tailwind CSS classes
- Follow shadcn/ui theming system
- Implement responsive design patterns

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Access at http://localhost:3000

## Contributing

1. Follow the established component guidelines
2. Use shadcn/ui components for UI elements
3. Maintain TypeScript types
4. Test responsive layouts
5. Document component usage

## Future Enhancements

- Supabase integration
- Real Code Mirror implementation
- AI service integration
- Extended tutorial system
- Real-time collaboration
- Advanced code execution environment

## Important Notes

- Always use shadcn/ui components for consistency
- Implement proper scroll handling in panels
- Maintain fixed navigation elements
- Follow TypeScript best practices
- Document component changes# new_platform
