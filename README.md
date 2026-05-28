# AIRA Dashboard

AIRA is a modern, responsive operations dashboard built with Next.js. It features a high fidelity layout, rich status cards, and an interactive right sidebar with snapshot metrics and trend visualization.

## Features

- Responsive dashboard layout with sticky header and adaptive sidebar.
- Interactive filter tabs and status sections for blocked, slowing, and stable signals.
- Trend area chart and snapshot widgets in the right sidebar.
- Polished UI styling with Tailwind CSS and Lucide icons.

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Recharts
- Lucide Icons

## Project Structure

- `app/` App Router pages and global styles.
- `components/` Layout, header, signal cards, and sidebar.
- `components/ui/` UI primitives (buttons, badges, cards, inputs).
- `lib/` Utilities.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open http://localhost:3000 to view the dashboard.

## Scripts

- `npm run dev` Start the development server.
- `npm run build` Build for production.
- `npm run start` Start the production server.
- `npm run lint` Run ESLint.

## Customization

- Update content and layout in `components/`.
- Adjust global styles in `app/globals.css`.
- Modify data sets and UI labels directly in component files.
