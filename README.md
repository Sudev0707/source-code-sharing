# SourceShare

An open platform for sharing source code files and code snippets. Create, edit, and share code files with a beautiful VSCode-like editor. Support for 5+ languages with syntax highlighting and real-time collaboration.

## Features

- **VSCode-like Editor**: Full-featured code editor with syntax highlighting, auto-completion, and multiple themes powered by Monaco Editor.
- **Instant Sharing**: Share code files and snippets with a single link. Control visibility with public or private access.
- **Download & Export**: Download your code files in any format. Export entire projects as ZIP archives.
- **Beautiful Previews**: Render HTML, Markdown, and more with live previews. Perfect for documentation.
- **Secure Storage**: Your code is encrypted and stored securely. Control who can view and edit your files.
- **Multi-Language Support**: Support for JavaScript, TypeScript, Python, Java, HTML, CSS, and so on.

## Tech Stack

- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: TanStack Query (React Query)
- **Code Editor**: Monaco Editor (@monaco-editor/react)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd code-harmony-hub-main
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Landing Page**: Visit the home page to learn about the platform.
- **Editor**: Navigate to `/editor` to create and edit code snippets.
- **Dashboard**: View your shared code snippets at `/dashboard`.
- **View Code**: Access shared code via `/view/:id`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
