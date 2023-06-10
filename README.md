# Profile

## Features

- Next.js 13 App Directory
- Radix UI Primitives
- Tailwind CSS
- Icons from [Lucide](https://lucide.dev)
- Dark mode with `next-themes`
- Tailwind CSS class sorting, merging and linting.

## Usage

```bash
npm install
npm run preview
```

## Directory Structure
```
├──src
    ├─app           // Next.js 13 app dir
    │  ├─blog       // Blog Post (not contain List blog posts now)
    │  │  └─[uri]   // Blog Details
    │  └─project    // List Projects
    │      └─[uri]  // Project Details
    ├─components    // client side components
    │  ├─blog
    │  ├─nav
    │  ├─profile
    │  ├─project
    │  ├─ui         // ui.shadcn ui components (Radix UI + Tailwind CSS)
    │  └─utils
    ├─config
    ├─lib
    │  ├─convert
    │  ├─get        // For Get Markdown Contents
    │  │  ├─blog
    │  │  └─project
    │  └─typing
    └─styles        // Tailwind CSS
```
