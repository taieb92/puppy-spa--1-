# Puppy Spa 🐕

A modern web application for managing puppy spa appointments and waiting lists. Built with Next.js, TypeScript, and Tailwind CSS.

## Features ✨

- 📅 Daily waiting list management
- 🐾 Add and track puppy appointments
- 🔄 Drag-and-drop reordering of appointments
- 📱 Responsive design for all devices
- 🎨 Beautiful UI with animated gradients
- 🔍 Search functionality for appointments
- 📊 View previous days' appointments
- 🎯 Status tracking (Waiting/Completed)

## Tech Stack 🛠️

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks
- **API**: RESTful API

## Prerequisites 📋

- Node.js 18.17 or later
- npm or yarn
- Git

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/puppy-spa.git
   cd puppy-spa
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_APP_NAME=Puppy Spa
   NEXT_PUBLIC_APP_DESCRIPTION=Manage your puppy spa appointments
   NEXT_PUBLIC_API_URL=http://159.89.31.47:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure 📁

```
puppy-spa/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── previous-days/     # Previous days page
│   └── search/            # Search page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── puppy-card.tsx    # Puppy card component
│   ├── puppy-list.tsx    # Puppy list component
│   └── add-puppy-form.tsx # Add puppy form
├── lib/                  # Utility functions and services
│   ├── services/         # API services
│   └── types.ts          # TypeScript types
└── public/               # Static assets
```

## API Endpoints 🌐

The application communicates with the following API endpoints:

- `GET /waiting-lists/date/:date` - Get waiting list by date
- `POST /waiting-lists` - Create new waiting list
- `GET /entries/list?listId=:id` - Get entries by list ID
- `POST /entries` - Create new entry
- `PUT /entries/:id/status` - Update entry status
- `PUT /entries/:id/rank` - Update entry rank
- `GET /waiting-lists/month/:month` - Get lists by month
- `GET /entries/list?q=:query` - Search entries

## Development Guidelines 📝

- Use TypeScript for all new code
- Follow the component structure in `components/`
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states for async operations
- Ensure accessibility (a11y) compliance
- Write clean, maintainable code

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)

## Support 💖

If you find this project helpful, please consider giving it a ⭐️ on GitHub! 