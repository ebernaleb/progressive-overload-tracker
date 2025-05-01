# Progressive Overload Tracker

A comprehensive workout tracking application built with Next.js and Supabase, designed to help fitness enthusiasts track their progress and achieve consistent gains through the principle of progressive overload.

## 🏋️‍♂️ Features

- **User Authentication**: Secure login and registration with Supabase Auth
- **Exercise Library**: Create and manage your personal exercise database
- **Workout Tracking**: Log workouts with exercises, sets, reps, and weights
- **Progress Visualization**: Interactive charts to visualize your fitness journey
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **Real-time Database**: Powered by Supabase for reliable data storage and retrieval

## 🚀 Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Context API, React Query
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL via Supabase
- **UI Components**: Radix UI, Lucide React icons
- **Styling**: Tailwind CSS, Framer Motion for animations
- **Form Handling**: React Hook Form, Zod validation

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Supabase account

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/progressive-overload-tracker.git
   cd progressive-overload-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Visit `http://localhost:3000` to see the application.

## 💾 Database Setup

The application requires a Supabase project with the following tables:
- `exercises`: Store exercise information
- `workouts`: Track workout sessions
- `workout_exercises`: Junction table for exercises in workouts
- `progress_data`: Store progress metrics over time

Refer to `database-schema.sql` for the complete database schema.

## 🧪 Testing

Run tests using Jest and React Testing Library:

```bash
npm test
# or
yarn test
```

## 📱 Usage

1. Register an account or login
2. Add exercises to your personal library
3. Create workouts and add exercises with sets, reps, and weights
4. Mark workouts as complete when finished
5. Track your progress over time with the visualization tools

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
