<div align="center">

# 🎬 CineFocus

### A modern, fast, and responsive video streaming experience

A YouTube-inspired video platform built from the ground up with **React + Vite + TypeScript + Tailwind CSS**, powered by the **RapidAPI YouTube V3** service.

[🌐 Live Demo](https://ais-dev-6z7he76k6spf6acvmzksn4-412423763965.europe-west2.run.app/) · [🐛 Report Bug](https://github.com/OsamaIbrhim/Youtube-clone/issues) · [✨ Request Feature](https://github.com/OsamaIbrhim/Youtube-clone/issues)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## 📖 About

**CineFocus** is a sleek streaming web app that lets you browse, search, and watch videos across categories — complete with channel pages, related video suggestions, and HD playback. It started as a classic YouTube clone and was fully rebuilt on a modern, type-safe, performance-focused stack.

## ✨ Features

- 🎥 **HD video playback** with full player controls (via `react-player`)
- 🔎 **Debounced live search** — requests fire only after you stop typing
- 🗂️ **Category filtering** with a responsive sidebar / mobile chip row
- 📺 **Channel pages** with banner, avatar, and subscriber stats
- 🔗 **Related videos** suggestions on every video detail page
- 📱 **Fully responsive** grid (4 / 2 / 1 columns)
- 🌙 **Clean dark UI** inspired by YouTube
- 🔐 **Secure API key** handling via environment variables

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 18 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| HTTP client | Axios |
| Video player | React Player |
| Data source | RapidAPI — YouTube V3 |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A free [RapidAPI YouTube V3](https://rapidapi.com/ytdlfree/api/youtube-v31) key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/OsamaIbrhim/Youtube-clone.git
cd Youtube-clone

# 2. Install dependencies
npm install

# 3. Set up your environment variables
cp .env.example .env
# then open .env and add your key:
# VITE_RAPID_API_KEY=your_rapidapi_key_here

# 4. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser. 🎉

### Build for production

```bash
npm run build      # type-check + production build into /dist
npm run preview    # preview the production build locally
```

## 📁 Project Structure

```
src/
├─ components/
│  ├─ Navbar.tsx          # top bar + logo + search
│  ├─ SearchBar.tsx       # search input
│  ├─ Sidebar.tsx         # category selector
│  ├─ Feed.tsx            # home page (category feed)
│  ├─ SearchFeed.tsx      # search results (debounced)
│  ├─ Videos.tsx          # grid of video / channel cards
│  ├─ VideoCard.tsx       # single video card
│  ├─ ChannelCard.tsx     # single channel card
│  ├─ VideoDetail.tsx     # player + related videos
│  ├─ ChannelDetail.tsx   # channel page
│  └─ Loader.tsx          # loading spinner
├─ hooks/
│  └─ useDebounce.ts      # debounce hook for search
├─ utils/
│  ├─ fetchFromAPI.ts     # axios wrapper (reads key from env)
│  └─ constants.ts        # categories + demo fallbacks
├─ types.ts               # typed API response shapes
├─ App.tsx                # routes
└─ main.tsx               # entry point
```

## 🧭 Routes

| Path | Page |
| --- | --- |
| `/` | Home feed (filtered by category) |
| `/video/:id` | Video player + related videos |
| `/channel/:id` | Channel page |
| `/search/:searchTerm` | Search results |

## 🔐 Security Note

The API key is **never hard-coded**. It is read at runtime from `import.meta.env.VITE_RAPID_API_KEY` and the local `.env` file is git-ignored. If you fork or clone this project, use your own RapidAPI key.

## 📝 What changed in the rebuild

| Before | After (CineFocus) |
| --- | --- |
| JavaScript | **TypeScript** (typed API responses) |
| Material UI | **Tailwind CSS** |
| Create React App | **Vite** (faster dev & build) |
| Hard-coded API key ⚠️ | **Env-based key** (`.env`) |
| Plain form submit | **Debounced search** hook |

## 👤 Author

**Osama Ibrahim**

- GitHub: [@OsamaIbrhim](https://github.com/OsamaIbrhim)
- LinkedIn: [in/osamaibrhim](https://www.linkedin.com/in/osamaibrhim/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Built with ❤️ and ☕ by Osama Ibrahim
</div>
