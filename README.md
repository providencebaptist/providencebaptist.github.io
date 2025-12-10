# Providence Baptist Church Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Providence Baptist Church Website is a modern, mobile-friendly React experience for sharing sermons, livestreams, and ministry information with members and guests. Built with Vite, TypeScript, Tailwind CSS, and shadcn/ui, it focuses on fast page loads, clear navigation, and rich SEO to help visitors connect online or in person.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Setup](#setup)
  - [Simple Mode Setup](#simple-mode-setup)
  - [Advanced Mode Setup](#advanced-mode-setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Features

- SEO-ready pages with structured data, dynamic breadcrumbs, and per-route metadata for better discoverability. 
- Sermon library with category filters, full-text search, pagination, and audio/video links sourced from `public/sermons-data.json`.
- Livestream hub with modal player launch, schedule highlights, and quick links to external platforms.
- Giving, beliefs, history, and purpose pages to communicate doctrine, mission, and ways to support the ministry.
- Contact form powered by Formspree plus location and email cards to simplify visitor outreach.
- Accessible, responsive UI built with shadcn/ui components, Tailwind CSS, and lucide-react icons.
- Client-side routing with React Router, page transition effects, and scroll restoration for polished navigation.

## Demo

Coming soon. Deploy locally or to Vercel to preview the experience.

## Setup

You can start quickly in **Simple Mode** or configure extra tooling and data in **Advanced Mode**. Node.js 18+ and npm are required.

### Simple Mode Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/providence-digital-revival.git
   cd providence-digital-revival
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**

   Copy the sample environment file to create local settings (add keys as needed for your deployment).

   ```bash
   cp .env.example .env.local
   ```

   Suggested variables:

   - `APP_MODE=simple` – default frontend-only mode
   - `VITE_SITE_URL=` – canonical site URL for SEO tags
   - `FORM_ID=` – override Formspree form ID if you do not want to use the built-in value

4. **Run the App**

   ```bash
   npm run dev
   ```

   The dev server will print a local URL (typically http://localhost:5173).

### Advanced Mode Setup

Advanced Mode is for teams that want production-grade optimizations, automated data refreshes, and stricter checks.

1. **Enable linting and tests**
   ```bash
   npm run lint
   npm test
   ```

2. **Prepare production builds**
   ```bash
   npm run build
   ```

3. **Data refresh (sermons and metadata)**
   - Replace `public/sermons-data.json` with updated exports from your media provider (SermonAudio format is supported out of the box).
   - Update `public/church-data.json` if location, schedule, or contact details change.

4. **SEO and sitemap**
   - Run `node scripts/generate-sitemap.js` after adding routes so `public/sitemap.xml` stays current.
   - Confirm canonical URLs, titles, and descriptions in `src/components/SEO.tsx` and page components.

5. **Configure hosting-specific environment**
   - Set `VITE_SITE_URL` to your live domain.
   - Provide any analytics or form provider keys your host requires.

## Usage

- Browse core pages from the top navigation to learn about history, beliefs, leadership, and ways to give.
- Visit **Sermons** to search, filter by category, and open detail pages with audio/video options.
- Use **Livestream** to join services; open the stream modal or jump to external platforms with one click.
- Submit questions or prayer requests through **Contact**, which posts to Formspree and surfaces a success modal.
- Scroll any page to see smooth transitions, tooltips, and responsive layouts optimized for desktop and mobile.

## Deployment

Deploy to Vercel for zero-config hosting or serve the static `dist/` output on any CDN.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/providence-digital-revival)

1. Build the site locally or in CI:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to Vercel, Netlify, GitHub Pages, or your preferred host.

3. Set environment variables (e.g., `VITE_SITE_URL`, `FORM_ID`) in your hosting dashboard for consistent SEO and form routing.

## Contributing

Contributions are welcome! To propose a change:

1. Fork the repository and create a feature branch.
2. Install dependencies and run `npm run lint` and `npm test` to validate changes.
3. Submit a pull request with a clear summary and screenshots when appropriate.

## FAQ

**Can I use a different form provider?**  Yes. Swap the Formspree configuration in `src/pages/Contact.tsx` for your provider and expose any keys as env variables.

**How do I update sermon content?**  Replace `public/sermons-data.json` with fresh exports from your sermon host; the UI will read it at runtime.

**Does the site support SEO best practices?**  Yes. Each page sets titles and descriptions via `src/components/SEO.tsx`, plus schema definitions such as `BreadcrumbSchema` for structured data.

**Is server-side rendering required?**  No. The site runs as a client-rendered SPA; static hosting is sufficient.

## License

This project is licensed under the MIT license.

## Acknowledgements

- [Vite](https://vitejs.dev/) for fast builds and dev server.
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) for robust UI development.
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) for styling and accessible components.
- [React Router](https://reactrouter.com/) for client-side navigation.
- [Formspree](https://formspree.io/) for serverless form handling.
- [lucide-react](https://lucide.dev/) for iconography.

## Contact

For questions or support, email Pastor@pbcatx.org or open an issue in this repository.
