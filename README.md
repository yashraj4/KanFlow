# 🚀 Jira Clone

A modern, full-stack project management application built with **Next.js 15**, **Prisma**, and **SQLite**. This application mimics the core functionality of Jira, featuring a drag-and-drop Kanban board, backlog management, and team collaboration tools.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- **Kanban Board**: Interactive drag-and-drop interface powered by `@dnd-kit` for managing tickets across statuses (To Do, In Progress, Done, etc.).
- **Optimistic UI**: Instant user feedback for all board actions with background server synchronization.
- **Task Management**: Create, edit, and update priority/status of tasks.
- **Backlog View**: Comprehensive list view for searching and filtering tickets.
- **Reporting Dashboard**: Visual insights into project velocity and task distribution.
- **Team Management**: Manage team members and roles.
- **Premium UI**: Polished, responsive design using **Tailwind CSS** and **Radix UI** components.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [SQLite](https://www.sqlite.org/index.html) (via [Prisma ORM](https://www.prisma.io/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State/Drag & Drop**: [@dnd-kit/core](https://dndkit.com/), React Hooks (`useOptimistic`)
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚡ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/jira-clone.git
   cd <ur-folder-name>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   The project uses SQLite, so no complex DB setup is required. The `DATABASE_URL` is configured in `.env` (default is `file:./dev.db`).

4. **Initialize Database**
   Run the Prisma migration to create the local SQLite database and generate the client.
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
├── 📁 prisma           # Database schema and migrations
├── 📁 src
│   ├── 📁 actions      # Server Actions for DB mutations
│   ├── 📁 app          # Next.js App Router pages
│   │   ├── 📁 backlog  # Backlog page
│   │   ├── 📁 reports  # Reports dashboard
│   │   └── page.tsx    # Main Kanban Board
│   ├── 📁 components   # React components
│   │   ├── 📁 Board    # Board-specific components (Column, TaskCard)
│   │   └── 📁 ui       # Reusable UI components (Dialog, etc.)
│   └── 📁 lib          # Utilities (Prisma client instance)
└── tailwind.config.ts  # Tailwind configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
