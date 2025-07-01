
/* Copyright © 2025 Kamil Maslanka */

import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'neon-green': {
					DEFAULT: '#00ff41',
					dark: '#00cc33',
					light: '#66ff80'
				},
				'cyber-dark': {
					DEFAULT: '#050505',
					lighter: '#111111',
					card: '#0a0a0a'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'],
				'rajdhani': ['Rajdhani', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow-pulse': {
					'0%, 100%': {
						textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41'
					},
					'50%': {
						textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41'
					}
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100vh)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(100vh)', opacity: '0' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'fade-in-up': {
					'0%': { transform: 'translateY(30px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-20px) rotate(120deg)' },
					'66%': { transform: 'translateY(10px) rotate(240deg)' }
				},
				'border-glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 65, 0.5)' },
					'50%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.8), 0 0 30px rgba(0, 255, 65, 0.6)' }
				},
				'text-shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' }
				},
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'matrix-rain': 'matrix-rain 4s linear infinite',
				'slide-in-left': 'slide-in-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'float': 'float 6s ease-in-out infinite',
				'border-glow': 'border-glow 2s ease-in-out infinite',
				'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
				'bounce-soft': 'bounce-soft 2s ease-in-out infinite'
			},
			backgroundImage: {
				'cyber-gradient': 'linear-gradient(135deg, #050505 0%, #111111 50%, #050505 100%)',
				'neon-gradient': 'linear-gradient(135deg, #00ff41 0%, #00cc33 50%, #66ff80 100%)',
				'matrix-bg': 'radial-gradient(ellipse at center, rgba(0, 255, 65, 0.15) 0%, transparent 70%)',
				'text-shimmer': 'linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.8), transparent)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
