
  # Dayslide

Dayslide is a personal development application designed to help you break down your goals into actionable steps. Our onboarding wizard guides you through a process of self-discovery, transforming your ambitions into a clear, manageable plan. Track your progress, build habits, and turn your dreams into reality, one day at a time.

## Live Demo

[Link to the live demo]()

## Features

- **Onboarding Wizard:** A step-by-step guide to help you define your goals and preferences.
- **Goal Hierarchy:** Visualize your goals in a structured, hierarchical view.
- **Dashboard:** Track your progress, daily actions, and achievements.
- **Authentication:** Secure user authentication with email and password.
- **Responsive Design:** A seamless experience across all devices.

## Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (using [Radix UI](https://www.radix-ui.com/))
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/dayslide.git
   ```
2. Navigate to the project directory:
   ```sh
   cd dayslide
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the development server, run the following command:

```sh
npm run dev
```

This will start the application in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload if you make edits.

## Project Structure

```
/
├── public/
│   └── ... # Static assets
├── src/
│   ├── components/ # React components
│   │   ├── ui/ # UI components from shadcn/ui
│   │   └── ... # Other components
│   ├── styles/ # Global styles
│   ├── types/ # TypeScript types
│   ├── App.tsx # Main application component
│   └── main.tsx # Application entry point
├── .gitignore
├── index.html
├── package.json
└── vite.config.ts
```

## Attribution

This project was built using the excellent `shadcn/ui` component library, which is built on top of Radix UI.
  