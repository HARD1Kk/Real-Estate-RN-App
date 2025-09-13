# ReState-Networks  - Mobile Application

A feature-rich real estate mobile app built with React Native and Expo, featuring property listings, advanced search, and user authentication.

![App Preview](./assets/images/splash.png)

## Features
- Property listing with rich details (price, location, amenities)
- Advanced search filters (price range, property type, amenities)
- User authentication system (Google sign-in)
- Favorite properties tracking
- Interactive map integration
- Profile management
- Responsive UI with NativeWind (Tailwind CSS for React Native)

## Technology Stack
- ⚛️ React Native 0.73
- 🚀 Expo SDK 49
- 🎨 NativeWind (Tailwind CSS)
- 📱 TypeScript
- 🗺️ React Navigation 6.x
- 📊 Reanimated (for animations)

## Project Structure
```
native_restate/
├── app/                 # Main application code
│   ├── (root)/          # Root navigation stack
│   ├── sign-in.tsx      # Authentication screen
│   └── global.css       # Global styles
├── assets/              # Media assets
│   ├── fonts/           # Custom font files
│   ├── icons/           # App icons
│   └── images/          # App images
├── constants/           # Reusable constants
│   ├── data.ts          # Sample property data
│   └── icons.ts         # Icon mappings
└── components/          # Shared UI components

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Expo CLI (install globally via `npm install -g expo-cli`)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

Scan the QR code with:
- **Expo Go** (iOS/Android)
- **Physical device** (via Expo Dev Client)
- **Simulator** (Android Studio/Xcode)

## Configuration
Create `.env` file with your API keys:
```env
GOOGLE_WEB_CLIENT_ID=your_client_id
MAPS_API_KEY=your_maps_key
```

## Scripts
- `npm start`: Start development server
- `npm run android`: Run on Android emulator
- `npm run ios`: Run on iOS simulator
- `npm run web`: Run web version

## Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License
MIT License - see [LICENSE](LICENSE) for details
