# Cognito Company - Personal Info Form Redesign

This project is a modern, premium frontend implementation of the "Cognito Company" Personal Info form, built to replace legacy RERA interfaces with a polished, user-friendly experience.

## ✨ Features

- **Premium UI**: Custom Material UI (v6) theme with a Deep Indigo brand palette.
- **Responsive Layout**:
    - Persistent sidebar with nested menus ("Account", "Project Details").
    - collapsible sub-menus and optimized navigation structure.
    - Responsive header with profile management.
- **Dynamic "Personal Info" Form**:
    - **Dual Flows**: Dedicated views for **Individual** vs. **Other Than Individual**.
    - **Conditional Logic**:
        - "Other" Organization type adds a "Please specify" field.
        - Organization details grouped logically with questions.
        - Dynamic "GST Number" field appearing only when applicable.
        - Mandatory GST warning banner for high-turnover projects.
    - **Partners Management**: Dynamic table to Add/Edit/Remove partners or members.
    - **File Upload**: Visual placeholder and preview area for photo uploads.
- **Robust Validation**: Powered by `react-hook-form` ensuring data integrity before submission.

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State/Data**: [TanStack Query](https://tanstack.com/query/latest) (Setup for API integration)
- **Formatting**: Prettier, ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd reraAuto
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the development server with HMR:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Create a production-ready build:
```bash
npm run build
```
The output will be in the `dist` folder.

## 📂 Project Structure

```
src/
├── components/
│   ├── Layout/          # Sidebar, Header, MainLayout
│   └── ...
├── pages/
│   └── PersonalInfo/    # Main logic for Personal Info form
├── theme/               # Custom MUI theme configuration
├── App.tsx              # Routing and App entry
└── main.tsx             # Root render
```

## 🎨 Design Notes

- **Primary Color**: Deep Indigo (`#283593`)
- **Typography**: Inter / Roboto
- **Layout**: Fixed Sidebar (Left), Fixed Header (Top), Scrollable Content Area.

---
© 2026 Cognito Company
