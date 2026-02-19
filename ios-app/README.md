# WhereUAt - iOS Mobile Application

## Project Overview
WhereUAt is a social location-sharing mobile application built with React Native, designed to help users connect and discover where their friends are.

## Features
- 🔐 Secure Authentication
- 🗺️ Real-time Location Tracking
- 👥 Social Networking
- 📍 Venue Check-ins
- 🌐 Friend Discovery

## Technology Stack
- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- Expo Location
- Axios for API Interactions

## Prerequisites
- Node.js (v14+)
- npm or Yarn
- Xcode (for iOS development)
- React Native CLI
- Expo CLI (optional)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/bobclaw26/whereat-multiagent.git
cd whereat-multiagent/ios-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment
Create a `.env` file in the root directory:
```
API_BASE_URL=https://api.whereat.com
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Run the Application
```bash
# For iOS
npx react-native run-ios

# Or with Expo
expo start
```

## Development Roadmap
- [x] Authentication Flow
- [x] Basic Navigation
- [x] Location Services
- [x] Friends System
- [ ] Enhanced Privacy Controls
- [ ] Detailed User Profiles
- [ ] Advanced Venue Interactions

## Testing
```bash
npm test
# or
yarn test
```

## Deployment
- App Store Connect Configuration
- Testflight Beta Testing
- Production Build Preparation

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License

## Contact
Tyler Hughes - tyler@whereat.com