# Agents App – Frontend

This repository contains the frontend application for the **Machine Test for MERN Stack Developer** project, built with Next.js. This application facilitates user authentication, agent management, and the distribution of tasks via CSV uploads.

---

## 🎯 Project Overview

This frontend serves as the user interface for an application designed to:
* Allow Admin User Login.
* Provide functionalities for Agent Creation & Management.
* Enable Uploading and Distributing lists (tasks) among agents.

For the backend implementation, please refer to the Backend repo  https://github.com/SIDDHARTH7729/Machine_Test_Assignment_Backend

---

## ✨ Features

* 🔐 User Sign In via Express backend (cookie-based session for authentication).
* 🚪 Secure Logout functionality.
* 🧭 Dynamic Sidebar navigation with collapse/expand capabilities.
* 👤 Dedicated 'Create Agent' page for adding new agents.
* 📤 'Upload File' page for CSV/Excel file processing and task distribution visualization.
* 🍞 User-friendly Toast-based Notifications for feedback.
* 🎨 Clean and responsive UI designed with TailwindCSS and Lucide Icons.
* 📋 **Agent Specific Page:** Displaying details and assigned works for individual agents (`/agent/[Id]`).

---

## 🧱 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **HTTP Client:** Axios
* **Styling:** TailwindCSS
* **Icons:** Lucide-react
* **Notifications:** React-hot-toast
* **UI Components:** Shadcn Components


---

## 📁 Project Structure (Important)
src/

    app/
        (protected)/ - Routes and components requiring user authentication.
            ***Here inside each route there is a _Components folder which contains components used for that route and page.tsx***
                agent/[Id] - specific Agent-related page , showing one agents works and details and components.
                createAgent/ - Page for creating a new agent.
                homepage/ - The main dashboard or landing page for authenticated users or admins.
                uploadFile/ - Page for uploading files related to agents and showcasing the distributed output .
                layout.tsx - Layout component specific to all the protected routes.

        (public)/ - Routes and components accessible without authentication.
           ***Here inside each route there is a _Components folder which contains components used for that route and page.tsx***
            signin/ - User sign-in page.
            signup/ - User sign-up page.

        api/ - API routes for backend interactions.
            createagent/ - API endpoint for creating an agent.
            getallagents/ - API endpoint for retrieving all agents.
            logout/ - API endpoint for user logout.
            sign-in/ - API endpoint for user sign-in.
            sign-up/ - API endpoint for user sign-up.
            specificAgentWorks/ - API endpoint for operations related to a specific agent.
            uploadFile/ - API endpoint for handling file uploads.


        globals.css - Global CSS styles for the application.
        layout.tsx - The root layout component for the entire application.
        page.tsx - The root page component for the application's homepage.

    components/ - Reusable UI components used across the application.
        HeroSection.tsx - Herosection of root page.tsx
        NavBar.tsx      - Navbar used across the website
        Sidebar.tsx     - Sidebar used across the side

    hooks/ - Custom React hooks for shared logic and state.

    lib/ - Utility

## 📦 Setup & Running Locally

 1. Install dependencies
       npm install
 2. Setup .env file
        .env
   Add: 
    1. EXPRESS_BACKEND_URL=          (http://localhost:5000 used here while making)
    2. JWT_SECRET_KEY=                (make sure to keep the secret key same for frontend and backend)

 3. Run the dev server
    npm run dev


