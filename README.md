# Code Editor

An interactive JavaScript learning platform with tutorial support.

## Project Architecture

### Type Definitions
typescript
interface Tutorial {
id: string;
path: string;
order: number;
metadata?: {
title: string;
description: string;
difficulty: "beginner" | "intermediate" | "advanced";
initialCode: string;
solution: string;
}
}
interface EditorConfig {
timeout_duration: number;
max_output_lines: number;
max_output_length: number;
max_iterations: number;
}

code_editor/
├── public/
│ └── tutorials/
│ ├── index.json # Tutorial index
│ └── 01_basics/ # Tutorial markdown files
│ ├── 01_variables.md
│ └── 02_functions.md
├── src/
│ ├── components/ # UI Components (snake_case)
│ ├── config/
│ │ ├── constants.js # Global constants and safety patterns
│ │ ├── editor.js # CodeMirror setup (JavaScript-first)
│ │ └── theme.js # Theme configuration
│ ├── services/ # Core functionality
│ └── utils/ # Helper functions

## Core Features

1. **Tutorial System**
   - Supports multiple tutorial types (JavaScript, Web Development)
   - Markdown-based tutorial content
   - Difficulty levels and ordering

2. **Code Editor**
   - Based on CodeMirror 6
   - Supports JavaScript, HTML, and CSS
   - Multiple editor views for web development
   - Syntax highlighting
   - Dark theme support

3. **Execution Environment**
   - JavaScript code execution
   - Web preview for HTML/CSS/JS
   - Console output
   - Execution controls (run, stop, clear)

4. **Theme System**
   - Dark/Light mode support
   - Customizable UI elements
   - Persistent theme preferences

## Key Components

### Services

1. **EditorManager**

javascript:src/services/EditorManager.js
startLine: 4
endLine: 93
Manages editor instances and handles switching between JavaScript-only and web development modes.

2. **TutorialManager**

javascript:src/services/TutorialManager.js
startLine: 4
endLine: 94

Handles tutorial loading, rendering, and navigation.

### Main Application

javascript:src/main.js
startLine: 9
endLine: 29


Initializes and coordinates all services and components.

## Dependencies

- CodeMirror 6 (Editor)
- Marked (Markdown parsing)
- DOMPurify (Content sanitization)
- Auth0 (Authentication)
- Vite (Build tool)

## Getting Started

1. Install dependencies:
bash
npm install

2. Run development server:

npm run dev


3. Build for production:

npm run build


## Tutorial Structure

Tutorials are stored in Markdown format with metadata in `index.json`. Two types of tutorials are supported:

1. JavaScript-only tutorials
2. Web Development tutorials (HTML, CSS, JavaScript)

Each tutorial includes:
- Title
- Difficulty level
- Order
- Type
- Content in Markdown format

## Theme Configuration

The application supports both light and dark themes, managed by the ThemeManager service. Theme preferences are persisted in localStorage.