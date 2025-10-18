# Dynamic Prompt Management System

A full-stack application built to solve a core challenge in AI-powered tools: managing and versioning prompts without needing developer intervention. This system allows product managers to create, manage, and activate different versions of AI prompts through a simple web interface. A separate tool, the "Banner Maker," dynamically fetches and uses the currently active prompt to generate ad copy.

---

**Live Demo:**   [\[dynamic-prompt-manager.vercel.app\]](https://dynamic-prompt-manager.vercel.app/)


---

## ✨ Core Features

- **Prompt Management UI:** A simple and intuitive interface at `/admin/prompt-manager` for full prompt lifecycle management.

- **Create & Version Prompts:** Easily create new prompts or update existing ones, which automatically creates a new version.

- **View Version History:** Click on any version to view its full text content and the dynamic variables it uses in a clean modal view.

- **Dynamic Banner Maker:** The main tool features a dynamic form that automatically generates input fields based on the variables found in the selected prompt (`{{business_name}}`, `{{goal}}`, etc.).

- **Live Prompt Switching:** The Banner Maker tool includes a dropdown to select any available prompt, and the form updates instantly.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Prompt Management:** Langfuse Cloud
- **Styling:** Tailwind CSS
- **Language:** TypeScript

---

## 🚀 Getting Started: Local Setup Guide

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

Make sure you have the following software installed:

- **Node.js** (v18 or later)
- **Git** for cloning the repository

### 2. Clone the Repository

Open your terminal and run the following command to clone the project:

```bash
git clone https://github.com/snikdhendu/dynamic-prompt-manager.git

```

### 3. Set Up Environment Variables

This project requires API keys from Langfuse to function.

#### A. Get Langfuse Credentials:

1. Go to [Langfuse Cloud](https://cloud.langfuse.com) and sign up for a free account.
2. Create a new project.
3. In your project's **Settings > API Keys**, you will find your **Public Key**, **Secret Key**, and **Host URL**. The Host URL should be `https://cloud.langfuse.com`.

#### B. Create the `.env.local` file:

In the root of your project folder, create a new file named `.env.local`. Copy the content of `.env.example` (if present) or the block below and paste your secret keys into it.

```bash
# .env.local

# Langfuse Credentials
NEXT_PUBLIC_LANGFUSE_PUBLIC_KEY="pk-lf-..."
LANGFUSE_SECRET_KEY="sk-lf-..."
LANGFUSE_HOST="https://cloud.langfuse.com"
```



### 4. Install Dependencies

In your terminal, run the following command to install all the necessary packages:

```bash
npm install
```

### 5. Run the Application

You're all set! Start the development server with this command:

```bash
npm run dev
```

Your application should now be running at `http://localhost:3000`.

---

## 📖 How to Use the Application

### Create Prompts:

1. Navigate to the **Prompt Manager** at `http://localhost:3000/admin/prompt-manager`.
2. Use the form to create a few different prompts (e.g., `banner-ad-copy`, `social-media-post`). Use dynamic variables like `{{business_name}}`.
3. Create a few versions of one prompt by using the same name in the form but changing the content.

### Generate a Banner:

1. Go to the **Banner Maker** at `http://localhost:3000`.
2. The dropdown will be populated with the prompts you created. Select one.
3. The form below the dropdown will dynamically update with input fields for the variables in that prompt.
4. Fill out the form and click **"Generate Banner"**.
5. The tool will show the generated text content based on the active version of the prompt you selected.

---
**Video Walkthrough:** 