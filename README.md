# Semantix AI - Web AI Agent

An AI-powered web intelligence platform that transforms websites into searchable knowledge bases with natural language querying capabilities. Semantix enables users to scrape, process, and interactively chat with website content using semantic search and Google Gemini AI models.

## Screenshots

![Semantix Landing Page](/public/images/landing-page.png)

_Landing page showcasing the main features and value proposition_

![Chat Interface](/public/images/chat-interface.png)

_Interactive chat interface for querying processed website content_

## Table of Contents

- [About](#about)

- [Tech Stack](#tech-stack)

- [Features](#features)

- [What I Learned](#what-i-learned)

- [Usage](#usage)

- [Getting Started](#getting-started)

- [Prerequisites](#prerequisites)

- [Installation](#installation)

## About

Semanix is a full-stack AI application designed to bridge the gap between static web content and intelligent, searchable knowledge. The platform allows users to input any website URL, automatically extracts and processes the content, and creates an interactive chat interface where users can ask questions about the website's content in natural language.

The application is perfect for developers, researchers, content analysts, and anyone who needs to quickly extract insights from websites efficiently. By combining advanced web scraping techniques with AI-powered semantic search, Semantix transforms how we interact with web content.

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router

- **React 19** - UI library with latest features

- **Tailwind CSS** - Utility-first CSS framework

- **Lucide React** - Icon library

- **Radix UI** - Headless UI components

### Backend & AI

- **Google Gemini AI** - Text embeddings and language generation

- **Pinecone** - Vector database for semantic search

- **Puppeteer** - Dynamic content scraping

- **Cheerio** - Static HTML parsing

- **LangChain** - Text splitting and processing

## Features

### 🌐 **Intelligent Web Scraping**

- Hybrid scraping approach combining static and dynamic content extraction

- Handles both traditional websites and modern SPAs

- Automatic content cleaning and optimization

### 🧠 **AI-Powered Processing**

- Text chunking and embedding generation using Google Gemini

- Vector storage with Pinecone for semantic search

- Context-aware response generation

### 💬 **Natural Language Chat**

- Interactive chat interface for querying processed content

- Real-time processing feedback and status updates

- Contextual understanding of website content

### ⚡ **Performance Optimized**

- Parallel processing with rate limiting

- Content size limiting to prevent memory issues

- Batch operations for efficient database interactions

- 5-minute timeout protection for long-running processes

## What I Learned

Building Semantix taught me valuable lessons about integrating modern web technologies with AI services:

### **AI Integration**

- Working with Google Gemini API for embeddings and text generation

- Understanding vector databases and semantic search principles

- Implementing efficient text chunking strategies for large content

### **Full-Stack Architecture**

- Next.js App Router patterns for organizing API routes and pages

- Managing complex state between frontend and backend services

- Error handling and timeout management for AI operations

### **Web Scraping Techniques**

- Combining static (Cheerio) and dynamic (Puppeteer) scraping approaches

- Content extraction and cleaning strategies

- Handling different website structures and content types

### **Performance Optimization**

- Implementing rate limiting and batch processing

- Vector database optimization strategies

- Memory management for large text processing

## Usage

1.  **Enter a URL**: Input any website URL in the URL input field

2.  **Processing**: Watch as the system scrapes, processes, and embeds the content

3.  **Chat**: Once processing is complete, start asking questions about the website content

4.  **Explore**: Use natural language to explore and discover insights from the processed content

The platform automatically handles content extraction, chunking, embedding generation, and vector storage, providing a seamless experience for users to interact with web content intelligently.

## Getting Started

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)

- **npm** or **yarn** package manager

- **Google AI API key** for Gemini AI

- **Pinecone API key** and environment setup

### Installation

1.  **Clone the repository**

```bash
git clone https://github.com/asimar007/Semantix_Web-Intelligence_AI-Agent

cd Semantix_Web-Intelligence_AI-Agent
```

2.  **Install dependencies**

```bash

npm install

# or

yarn install

```

3.  **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
GOOGLE_AI_API_KEY=your_google_ai_api_key

PINECONE_API_KEY=your_pinecone_api_key
```

4.  **Run the development server**

```bash

npm run dev

# or

yarn dev
```

5.  **Open the application**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application.
6.  **Start using Semantix**

Enter a website URL in the input field and begin exploring the AI-powered web intelligence capabilities!

---
