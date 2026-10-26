# Adetech Barbershop & Luxury Grooming Lounge

A modern, responsive, full-featured web application for **Adetech Barbershop**, offering an elite grooming salon experience with online appointment bookings, haircut style galleries, barber portfolios, client dashboards, and a dedicated admin portal.

---

## ✨ Features

- **Luxury Modern UI**: Curated gold-accented dark theme tailored for high-end barbershops and salons.
- **Client Authentication Gate**: Secure patron login and sign-up with personalized dashboard access.
- **Interactive Booking Flow**: Select services, master barbers, dates, and timeslots with dynamic pricing and summary calculations.
- **Barber Showcase & Team Profiles**: View barber specialties, experience ratings, working schedules, and bios.
- **Style Inspiration Gallery**: Filterable visual showcase with direct "Book this Style" integration.
- **Client Portal**: Track past and upcoming haircut appointments, manage profile information, and review booking statuses.
- **Admin Management Portal**: Real-time business overview with stats, revenue summaries, booking status filters (confirmed, pending, cancelled), and patron management.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 6
- **Icons**: Lucide React
- **Styling**: Modern Vanilla CSS with responsive design system & CSS variables
- **Deployment**: Vercel & GitHub

---

## 🚀 Quick Start (Local Development)

1. Clone or download the repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd barber-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel

### Option 1: Via Vercel CLI (Terminal)
Run in the project directory:
```bash
npx vercel
```
Follow the interactive prompts to link your project and deploy.

### Option 2: Continuous Deployment via GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/barber-website.git
   git push -u origin main
   ```
3. Visit [vercel.com/new](https://vercel.com/new) and import the repository for automated CI/CD deployments.
