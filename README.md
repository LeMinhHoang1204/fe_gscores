# G-Scores - Frontend Website

(Test Project)

## 📋 Description

This repository contains the frontend source code for **G-Scores**, a web-based platform for viewing and analyzing scores from the 2024 National High School Exam (Vietnam).  
The application is built with **ReactJS** using **TailAdmin** for UI components and layout. It provides responsive score lookup, top student listings, and detailed data visualization using interactive charts.

## 🌐 Product: [https://gscores.vercel.app](https://gscores.vercel.app)

## ✨ Features

### ✅ Must Have

- **Score Lookup**: Users can search for scores using their registration number.
- **Chart Visualization**: 
   - View score distribution across 4 levels

  - Statistics the number of students by subject 
  - Stacked bar charts using ApexCharts
- **Top 10 by Group**: Displays the top 10 students of group A00 based on total scores.

### ✅✅  Additional Improvements

- Group Total Scores: Lookup results include total scores for all exam groups (A00, A01, B00...) based on the user's subject grades.

- Display statistics of the number of students by exam groups, and show subject-level score distribution within each group (e.g., click A00 to view scores for Math, Physics, Chemistry).
- Extended top 10 students feature to support multiple exam groups (A01, B00, D01...).

### 🌟 Nice to Have

- Fully responsive UI (desktop, tablet, mobile)

- Deployed to **Vercel**


## 🛠️ Tech Stack

| Layer          | Stack                            |
|----------------|----------------------------------|
| **Framework**  | ReactJS                          |
| **Template**   | TailAdmin (Tailwind CSS)         |
| **Charts**     | ApexCharts                       |
| **Routing**    | React Router DOM                 |
| **Deployment** | Vercel                           |


##  Installation Guide

### Prerequisites

- Install [Node.js](https://nodejs.org/)

### Steps

1. **Clone the repository**:

   ```bash
   https://github.com/LeMinhHoang1204/fe_gscores.git
   cd fe_gscores
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:

   ```bash
   npm run build
   ```

5. **Deploy to Vercel**:

- Push the repository to GitHub.

- Connect your repository to Vercel.

- Vercel will automatically build and deploy your app.

## 💌 Contact Information

Owner: Le Minh Hoang  
Email: leminhhoang.working@gmail.com

