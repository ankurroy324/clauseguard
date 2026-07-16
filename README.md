# 📄 ClauseLens AI — Intelligent Contract & Terms Risk Analyzer

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--Powered-412991?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)

### AI-powered platform that analyzes contracts and Terms & Conditions, identifies hidden risks, explains legal clauses in plain English, and generates professional risk reports.

**Built with ❤️ using AI + Modern Web Technologies**

</div>

---

# 🌟 Overview

**ClauseLens AI** is an intelligent legal document analyzer that helps users understand complex contracts, Terms & Conditions, Privacy Policies, employment agreements, rental contracts, and other legal documents within seconds.

Instead of reading hundreds of lines of legal jargon, users receive:

- 🧠 Plain English explanations
- 🚩 High-risk clause detection
- 📊 Overall contract risk score
- 📑 AI-generated summaries
- 💡 Actionable recommendations
- 📥 Professional downloadable reports

Designed with a modern SaaS architecture, ClauseLens AI combines **Large Language Models (LLMs)** with an intuitive interface to improve consumer awareness and legal transparency.

---

# ✨ Key Features

## 🤖 AI-Powered Contract Analysis

- Contract summarization
- Plain English explanations
- AI clause extraction
- Context-aware legal interpretation
- Intelligent recommendation engine

---

## 🚨 Risk Detection

Automatically detects clauses related to:

- Auto Renewal
- Liability Waivers
- Data Collection
- Third-party Data Sharing
- Privacy Risks
- Arbitration
- Refund Policy
- Cancellation Terms
- Intellectual Property
- Termination Clauses
- Warranty Disclaimers
- Indemnification
- Non-Compete Agreements
- Confidentiality
- Governing Law

Each clause is classified as:

🟢 Low Risk

🟡 Medium Risk

🔴 High Risk

---

## 📈 Smart Risk Dashboard

- Overall Contract Score
- AI Confidence Score
- Risk Distribution
- Contract Complexity
- Reading Time
- Clause Statistics
- Interactive Charts
- Severity Indicators

---

## 📄 Supported Documents

- PDF
- DOCX
- TXT
- Copy & Paste
- Multiple File Upload

---

## 💬 AI Legal Assistant

Chat with your uploaded document.

Example:

> What does this clause mean?

> Is this cancellation policy fair?

> Explain the liability section.

> Can I negotiate this?

---

## 📥 Export Reports

Generate professional reports in:

- PDF
- DOCX
- Markdown
- JSON

---

# 🏗️ System Architecture

```text
             User
               │
               ▼
       Next.js Frontend
               │
               ▼
     Authentication Layer
               │
               ▼
      FastAPI Backend API
               │
      ┌────────┴────────┐
      ▼                 ▼
 Document Parser      AI Engine
      │                 │
      ▼                 ▼
 OCR/Text Extraction  GPT Analysis
      │                 │
      └────────┬────────┘
               ▼
      Risk Classification
               ▼
       Report Generation
               ▼
        PostgreSQL DB
```

---

# ⚙️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- Framer Motion
- Lucide Icons

---

## Backend

- FastAPI
- Python
- REST API
- JWT Authentication

---

## AI

- OpenAI GPT
- Claude
- Gemini
- Groq (Optional)

---

## Database

- PostgreSQL
- Prisma ORM

---

## Authentication

- Google OAuth
- GitHub OAuth
- JWT

---

## Deployment

- Vercel
- Railway
- Render
- Docker

---

# 📂 Project Structure

```bash
ClauseLens-AI/
│
├── app/
├── components/
├── features/
├── hooks/
├── services/
├── lib/
├── prisma/
├── public/
├── backend/
├── docs/
├── tests/
├── utils/
├── styles/
├── README.md
└── .env.example
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/ClauseLens-AI.git
```

```bash
cd ClauseLens-AI
```

---

## Install Dependencies

Frontend

```bash
npm install
```

Backend

```bash
pip install -r requirements.txt
```

---

## Configure Environment

Create a `.env` file.

```env
OPENAI_API_KEY=

DATABASE_URL=

JWT_SECRET=

NEXT_PUBLIC_API_URL=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=
```

---

## Run Development Server

Frontend

```bash
npm run dev
```

Backend

```bash
uvicorn main:app --reload
```

---

# 📸 Screenshots

| Landing Page | Dashboard |
|--------------|-----------|
| Add Screenshot | Add Screenshot |

| Risk Analysis | AI Chat |
|--------------|----------|
| Add Screenshot | Add Screenshot |

---

# 📊 Example Workflow

```
Upload Contract
        │
        ▼
Extract Text
        │
        ▼
AI Analysis
        │
        ▼
Clause Detection
        │
        ▼
Risk Classification
        │
        ▼
Plain English Summary
        │
        ▼
Recommendations
        │
        ▼
Download Report
```

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Rate Limiting
- Input Sanitization
- Secure File Upload
- CORS Protection
- CSRF Protection
- Environment Variables
- API Validation

---

# 📈 Performance Optimizations

- Server Components
- Lazy Loading
- API Caching
- Streaming Responses
- Code Splitting
- Image Optimization
- Responsive UI
- Fast Rendering

---

# 🎯 Future Roadmap

- Contract Comparison
- Clause Negotiation Suggestions
- OCR for Scanned Documents
- Multi-language Support
- Browser Extension
- Enterprise Dashboard
- Team Collaboration
- Contract Version History
- Mobile Application
- Voice-Based Contract Explanation

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

# 📄 License

Distributed under the MIT License.

See **LICENSE** for more information.

---

# 👩‍💻 Author

**Isha Chakraborty**
**Ankur Roy**
B.Tech Information Technology | AI & ML Enthusiast | Full Stack Developer

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star!

**Building AI solutions that make technology more transparent, accessible, and impactful.**

</div>
