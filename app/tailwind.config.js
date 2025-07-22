/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        xs: 'var(--radius-sm)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        DEFAULT: 'var(--radius)'
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)'
        },
        // Builder Buddy specific colors
        builder: {
          'primary': 'hsl(var(--builder-primary))',
          'secondary': 'hsl(var(--builder-secondary))',
          'accent': 'hsl(var(--builder-accent))',
          'success': 'hsl(var(--builder-success))',
          'warning': 'hsl(var(--builder-warning))',
          'error': 'hsl(var(--builder-error))'
        },
        ai: {
          'gradient-from': 'hsl(var(--ai-gradient-from))',
          'gradient-to': 'hsl(var(--ai-gradient-to))',
          'highlight': 'hsl(var(--ai-highlight))'
        },
        code: {
          'background': 'hsl(var(--code-background))',
          'foreground': 'hsl(var(--code-foreground))',
          'comment': 'hsl(var(--code-comment))',
          'keyword': 'hsl(var(--code-keyword))',
          'string': 'hsl(var(--code-string))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'ai-thinking': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.5'
          }
        },
        'code-generation': {
          '0%': {
            transform: 'scaleX(0)'
          },
          '100%': {
            transform: 'scaleX(1)'
          }
        },
        'builder-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(139, 69, 19, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(139, 69, 19, 0.6)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ai-thinking': 'ai-thinking 1.5s ease-in-out infinite',
        'code-generation': 'code-generation 0.5s ease-out',
        'builder-glow': 'builder-glow 3s ease-in-out infinite'
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}