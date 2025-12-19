# 🚀 Space Odyssey

**Space Odyssey** is an immersive, interactive web experience that lets users explore space through real-time data, stunning visuals, and animated storytelling. Built with **Next.js**, **Framer Motion**, and multiple public space APIs, the project blends education with exploration.

---

## 🌌 Features

* **Animated Landing Experience**
  Smooth, modern animations using Framer Motion for an engaging cosmic journey.

* **Explore Worlds**

  * 📰 **Space News** – Live articles from the Spaceflight News API
  * 🖼 **Picture Paradise** – NASA APOD, Mars Rover photos & NASA Image Library
  * 📚 **Space Facts** – Solar system facts from the Le Système Solaire API
  * 👨‍🚀 **Who Is In Space?** – Live astronaut tracking
  * 🛰 **Track the ISS** – Real-time ISS position with an interactive map

* **Responsive & Modern UI**

  * Tailwind CSS
  * Fully responsive layouts
  * Dark, space-themed design

---

## 🛠 Tech Stack

* **Framework:** Next.js 13
* **UI & Animation:** React, Framer Motion, Tailwind CSS
* **Maps:** Leaflet & React-Leaflet
* **APIs:**

  * NASA APIs (APOD, Mars Rover, Image Library)
  * Spaceflight News API
  * Open Notify (Astronauts in Space)
  * WhereTheISS.at (ISS tracking)
  * Le Système Solaire API

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Preet-taparia/Space-website.git
cd Space-website
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser at:

```
http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key
NEXT_PUBLIC_SOLAR_API_KEY=your_solar_system_api_key
```

> ⚠️ Without these keys, **Pictures** and **Facts** pages may fail to load data.

---

## 📂 Project Structure

```txt
components/     → Reusable UI & animated sections
pages/          → Next.js routes (news, iss, facts, gallery, etc.)
constants/      → Static data & config
styles/         → Tailwind & global styles
utils/          → Animation variants & helpers
```

---

## 🚀 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run export   # Static export
```
