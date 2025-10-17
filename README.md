# AI Paint App

A beautiful, modern drawing application built with React, TypeScript, and Tailwind CSS. Features include SVG-based drawing, theme switching, and smooth animations.

## Features

- 🎨 **SVG-based Drawing**: Smooth, scalable vector drawing
- 🌗 **Theme Support**: Light and dark mode with automatic color switching
- 🎯 **Color Palette**: Ink, red, blue, and green colors that adapt to theme
- 📏 **Adjustable Pen Size**: Slider control from 1-20px
- ↩️ **Undo Functionality**: Remove last stroke
- 🗑️ **Clear Canvas**: Reset entire drawing
- 💾 **Persistence**: Automatically saves drawings to localStorage
- ✨ **Smooth Animations**: Bubbly button effects with Framer Motion
- 📱 **Touch Support**: Works on mobile devices

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── BubbleButton.tsx    # Animated button component
│   ├── PaintArea.tsx       # Main drawing canvas
│   ├── PenSizeSlider.tsx   # Pen size control
│   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   └── Toolbar.tsx         # Main toolbar with all controls
├── utils/
│   └── colorMap.ts         # Color mapping for themes
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles with Tailwind
```

## Architecture

- **State Management**: React hooks (useState, useEffect, useRef)
- **Drawing Surface**: SVG with polyline elements for strokes
- **Theme System**: Tailwind dark/light classes + JS color mapping
- **Persistence**: localStorage for automatic saving
- **Animations**: Framer Motion for smooth interactions

## Usage

1. **Drawing**: Click and drag to draw on the canvas
2. **Color Selection**: Click any color button in the toolbar
3. **Pen Size**: Use the slider to adjust stroke thickness
4. **Theme Toggle**: Switch between light and dark modes
5. **Undo**: Remove the last stroke
6. **Clear**: Reset the entire canvas

## Browser Support

- Modern browsers with SVG support
- Touch devices for mobile drawing
- Responsive design for all screen sizes

## Development

The app uses:
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Classnames** for conditional styling
