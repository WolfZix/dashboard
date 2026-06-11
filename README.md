# Dashboard App
A modern dashboard application built with React, TypeScript and TailwindCSS.

---

![Dashboard Preview](./screenshots/analytics-preview-1.png)

---

## Live Demo
[Open Dashboard App](https://wolfzix.github.io/dashboard)

---

## Project Description
Dashboard App is a frontend-focused project designed to simulate a modern administration panel. Users can manage accounts, customize profiles, explore analytics, and personalize the application through a rich settings system.
The project focuses on frontend architecture, state management, reusable components, and user experience.

---

## Features
- User authentication
- User management (CRUD)
- Role-based permissions
- User profiles
- Appearance settings
- Account settings
- Profile data export (JSON)
- Dark / Light theme
- Compact / Comfortable mode
- Analytics dashboard
- User activity history
- LocalStorage persistence

---

## Tech Stack
### Frontend
- React
- TypeScript
- React Router
- TailwindCSS
- Context API

### Data Storage
- LocalStorage

---

### Charts
- Recharts

---

### Deployment
- GitHub Pages

---

## Architecture
The application uses:
- Context API for global state management
- Service layer for data access
- Reusable UI components
- Custom hooks for business logic

---

### Data Flow:
Components → Contexts → Services → LocalStorage

---

## Pages

### Overview
Dashboard summary, statistics and daily news.
![Overview Preview](./screenshots/overview-preview.png)

### Users
User management with search, sorting and pagination.
![Users Preview](./screenshots/users-preview.png)

### Analytics - Charts
User Growth and Most Used Colors charts
![Analytics Preview pt1](./screenshots/analytics-preview-1.png)
### Analytics - User Statistics
Top Users, Roles Overview and User Status Distribution
![Analytics Preview pt2](./screenshots/analytics-preview-2.png)

### Profile
User profile customization and activity tracking.
![Profile Preview](./screenshots/profile-preview.png)

### Settings - Appearance (Profile Customization)
Avatar and Banner customization.
![Appearance Settings Preview pt1](./screenshots/settings-preview-1.png)
### Settings - Appearance (Theme & UI)
Accent color, Theme, UI Density and Animations.
![Appearance Settings Preview pt2](./screenshots/settings-preview-2.png)
### Settings - Account (Profile Information)
Username, Email, Bio and Password.
![Account Settings Preview pt1](./screenshots/settings-preview-3.png)
### Settings - Account (Security & Statistics)
User Statistics, Data Export, Account Deletion.
![Account Settings Preview pt2](./screenshots/settings-preview-4.png)

---

## Installation
```bash
git clone https://github.com/WolfZix/dashboard.git
cd dashboard
npm install
npm run dev
```

---

## Future Improvements
- Express.js backend
- PostgreSQL database
- REST API
- JWT authentication
- Real notifications, statistics, users and daily news
- Notification and privacy settings
- Activity heatmap based on real user data

---

## What I Learned
During this project, I improved my skills in:
- React state management
- TypeScript
- Context API
- Component architecture
- CRUD operations
- UI/UX design
- Refactoring large codebases
- Working with reusable components
