/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sap: {
          blue: '#003366',       // Deep enterprise navy/sapphire
          dark: '#0b1d3a',       // Deep header/sidebar background
          light: '#f4f6f9',      // Clean enterprise workspace background
          surface: '#ffffff',    // Card surface
          teal: '#0070f2',       // Active accent blue
          accent: '#008fd3',     // Secondary highlight
          border: '#e2e8f0',     // Border tone
          text: '#1e293b',       // High contrast primary text
          muted: '#64748b',      // Subdued secondary text
          success: '#107e3e',    // SAP green
          warning: '#e9730c',    // SAP amber/orange
          danger: '#bb0000',     // SAP red
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'enterprise': '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08)',
        'enterprise-card': '0 2px 4px rgba(0, 34, 68, 0.06), 0 4px 12px rgba(0, 34, 68, 0.04)',
      }
    },
  },
  plugins: [],
}
