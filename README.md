# 🚀 Space Odyssey

**Space Odyssey** (branded internally as *Comsmic Odyssy*) is a premium, immersive cosmic portal and educational platform. It leverages real-time data from NASA and various space agencies to bring the wonders of the universe directly to the browser. Built with a "Metaverse-inspired" design language, the site features fluid animations, glassmorphic UI elements, and interactive 3D-like experiences.

---

## 🌌 Core Experiences

### 🖼 Picture Paradise (The Gallery)
- **NASA APOD:** Daily featured astronomical wonders.
- **Mars Rover Photos:** Real-time imagery from the Curiosity rover's cameras.
- **NASA Image Library:** A searchable, infinite-scroll database of deep-space objects.
- **Powered by:** [NASA APIs](https://api.nasa.gov/).

### 🛰 ISS Live Tracker
- **Real-time Map:** Interactive satellite view tracking the International Space Station.
- **Live Telemetry:** Viewing latitude, longitude, and current visibility status.
- **Interactive Orbit:** Visualizes the path of the ISS over the globe.
- **Powered by:** [WhereTheISS.at](https://wheretheiss.at/) and [Leaflet](https://leafletjs.com/).

### 📰 The Space Express (Insights)
- **Space News:** Live news feed with the latest rocket launches and discoveries.
- **Metaverse Insights:** Specialized content sections exploring the future of virtual space exploration.
- **Powered by:** [Spaceflight News API](https://api.spaceflightnewsapi.net/v4/docs/).

### 📚 Cosmic Encyclopedia (Space Bites)
- **Solar System Data:** Detailed physical properties (gravity, density, temperature) of planets and major moons.
- **Comparative Insights:** Dynamic calculation of user weight on different planets.
- **Powered by:** [Le Système Solaire API](https://api.le-systeme-solaire.net/).

### 👨‍🚀 Live Crew Manifest
- **Astronaut Tracking:** Real-time data on who is currently in orbit.
- **Station Grouping:** Identifies which spacecraft (ISS, Tiangong) the astronauts are currently aboard.
- **Powered by:** [Open Notify](http://open-notify.org/).

---

## 🎨 Design & Interaction

### Design System
The project uses a custom design system defined in `tailwind.config.js` and `styles/globals.css`:
- **Typography:** Uses **Eudoxus Sans** for a modern, futuristic feel.
- **Glow Effects:** Custom `gradient-01` through `gradient-04` create a glowing nebula-like background effect.
- **Glassmorphism:** Heavy use of backdrop filters and border-opacity for "glass-like" cards.

### Interaction Layer
Animations are handled by **Framer Motion**, following a staggered reveal pattern:
- **Hero Section:** Parallax-style text entry with `Comsmic MaNess` branding.
- **Scrolling Transitions:** Sections use `staggerContainer` and `fadeIn` variants to transition in as the user scrolls.
- **Typing Effects:** `TypingText` components simulate live data entry for headers.

## 🎨 Core Design System

### Color Palette
The visual identity of Space Odyssey is anchored in a deep, high-contrast cosmic palette designed to emphasize depth and "glow."

- **Primary Background:** `#1A232E` (Deep Space Blue/Black)
- **Primary Accent (Aura):** `#a509ff` (Vibrant Purple / Metaverse Glow)
- **Secondary Accent (Pulse):** `#34acc7` (Cosmic Cyan)
- **Tertiary Accent (Mist):** `#7aebfb` (Electric Blue)
- **Typography:** `#c7c7c7` (Secondary White) & `#FFFFFF` (Primary White)

### Visual Effects
- **Glassmorphism:** Components use `backdrop-filter: blur(4px)` with semi-transparent white borders to simulate frosted glass.
- **Nebula Gradients:** Custom CSS linear gradients (`gradient-01` to `gradient-04`) are used as blurred background "blobs" to create the illusion of cosmic nebulae.

---

## 🏗 Component Directory

Individual components are built to be modular and motion-aware using **Framer Motion**.

| Component | Description |
|---|---|
| **Hero** | The entry point found on the landing page, featuring large display typography and a cinematic cover image. |
| **Navbar** | Global navigation header displaying the *Space Odyssey* branding and "Presents" subtitle. |
| **About** | A concise conceptual introduction to the immersive space exploration experience. |
| **Explore** | An interactive section allowing users to choose their next destination (News, Facts, Gallery, etc.). |
| **ExploreCard** | Individual cards within the Explore section that expand on hover to reveal title and navigation links. |
| **GetStarted** | A walkthrough section explaining the initial steps to begin the cosmic journey. |
| **WhatsNew** | Focuses on the latest feature additions and "Metaverse" integrations. |
| **World** | A visually dense section illustrating the global scale of the platform's community. |
| **Insights** | A dedicated layout for news articles and cosmic deep-dives, using `InsightCard`. |
| **Feedback** | A branded section for community feedback, featuring high-contrast gradients and glass effects. |
| **CustomTexts** | Includes `TypingText` and `TitleText` for reusable, animated typography consistent with the theme. |
| **ISSMap / WhereISS** | Complex components integrating **Leaflet** for real-time satellite tracking and orbit visualization. |

---

## 🛠 Technology Stack

- **Framework:** [Next.js 13](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Mapping:** [React Leaflet](https://react-leaflet.js.org/)
- **Data Fetching:** [Axios](https://axios-http.com/)

---

## 📂 Project Structure

```bash
├── components/     # UI Components (Hero, About, Explore, etc.)
├── constants/      # Static data, nav links, and feature lists
├── pages/          # Next.js routes (iss, news, facts, gallery, etc.)
├── public/         # Static assets (planets, icons, textures)
├── styles/         # Global CSS and Tailwind theme extensions
└── utils/          # Framer Motion animation variants
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key
NEXT_PUBLIC_SOLAR_API_KEY=your_solar_system_api_key
```

### 3. Development
```bash
npm run dev
```

---

## 📝 Configuration Note
The project intentionally preserves certain spelling variants (e.g., "Comsmic Odyssy") in internal components and headers as part of its specific branding identity.
