/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://btsppimfdrmwilauqmoh.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c3BwaW1mZHJtd2lsYXVxbW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODM0MTYsImV4cCI6MjA2MTQ1OTQxNn0.JcbM6HDFobC9GBSJmyEVf1bbAHOA1EFOK0zd8j39k-4',
  },
};

module.exports = nextConfig; 