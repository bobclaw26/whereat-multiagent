# WhereUAt iOS App: Detailed Implementation Roadmap

This document outlines the development plan for the WhereUAt iOS application, based on the project specifications provided.

## Phase 1: Core Infrastructure & Authentication

### 1.1 Project Setup
- [X] Initialize React Native project.
- [X] Set up directory structure (`screens`, `components`, `navigation`, `services`, `utils`).
- [ ] Configure navigation (React Navigation).
- [ ] Set up state management (e.g., Redux Toolkit, Zustand).
- [ ] Theme setup (colors, fonts, spacing).
- [ ] **TODO:** The iOS build requires `pod install` to be run in the `ios` directory. This failed due to a missing `pod` command in the environment. This must be resolved before the app can be built for iOS.

### 1.2 Authentication Flow
- [X] **Login Screen:** UI complete, needs API integration.
- [ ] **Registration Screen:**
    - UI for email, password, and username.
    - API integration with backend registration endpoint.
    - Client-side validation.
- [ ] **Password Reset Screen:**
    - UI for submitting email.
    - API integration.
- [ ] **Authentication Service:**
    - Create `authService.js` to handle API calls.
    - Securely store JWT tokens (AsyncStorage/SecureStore).
    - Implement logic for token refresh.
    - Manage authenticated state globally.
- [ ] **Protected Routes:**
    - Implement logic to restrict access to authenticated users.

## Phase 2: Main Features - Map, Social & Feed

### 2.1 Interactive Map (Main Feature 1)
- [ ] **Map Integration:**
    - Integrate `react-native-maps`.
    - Request location permissions from the user.
    - Display user's current location.
- [ ] **Venue Display:**
    - Fetch nearby bars/venues from Foursquare API via our backend.
    - Display venues as custom markers on the map.
    - Tapping a marker shows a venue detail callout.
- [ ] **Real-time Attendance:**
    - Display attendee count on venue markers.
    - Requires WebSocket integration for real-time updates.
- [ ] **"I'm Going Here" Feature:**
    - Add a button on the venue detail callout/page.
    - API call to mark user's intention.
    - Update UI to reflect the user's plan.

### 2.2 Social Network (Main Feature 2)
- [ ] **User Profile Screen:**
    - Display user's info, profile picture, and their "going out" status.
    - Edit profile functionality.
- [ ] **Friends List Screen:**
    - Fetch and display a list of the user's friends.
    - Show their current status ("going to X", "at Y").
- [ ] **Friend Management:**
    - Search for users.
    - Send friend requests.
    - View and accept/decline incoming friend requests.
- [ ] **Privacy Controls:**
    - Settings screen for Public vs. Friends-only visibility.
    - API integration to save user preference.

### 2.3 Friends Feed (Main Feature 4)
- [ ] **Feed Screen:**
    - UI for a scrollable feed.
    - Fetch and display friends' activities (photos, status updates, "going out" plans).
    - Implement pull-to-refresh.
- [ ] **Activity Components:**
    - Create components for different activity types (e.g., `PhotoPost`, `StatusUpdate`, `GoingOutPlan`).
- [ ] **Create Post Functionality:**
    - UI to create a new post (text, photo upload).
    - API integration to publish the post.

## Phase 3: Communication & Events

### 3.1 Chat Function (Main Feature 3)
- [ ] **Chat List Screen:**
    - List all active conversations.
- [ ] **Chat Screen:**
    - UI for sending and receiving messages.
    - API/WebSocket integration for real-time messaging.
- [ ] **Ephemeral Messages:**
    - Implement client-side logic to hide messages older than 24 hours.
    - Backend will handle the actual deletion.
- [ ] **Start New Chat:**
    - Ability to start a chat with a friend or a random user (if enabled).

### 3.2 Events & Tickets (Secondary Features 3 & 4)
- [ ] **Events Discovery Screen:**
    - Fetch and display events from venues.
    - Search and filter capabilities.
- [ ] **Event Detail Screen:**
    - Show event details, venue info, and ticket prices.
- [ ] **Ticketing:**
    - Integrate a payment gateway (e.g., Stripe).
    - UI for purchasing tickets.
    - **My Tickets Screen:** Display user's purchased tickets with QR codes for verification.

## Phase 4: Discovery & Gamification

### 4.1 Search & Discovery (Secondary Feature 2)
- [ ] **Global Search Screen:**
    - UI for searching nightlife locations worldwide.
    - API integration with backend search endpoint.
- [ ] **Trip Planning:**
    - Allow users to save venues/events to a "trip plan."

### 4.2 Ranking System (Secondary Feature 1)
- [ ] **"Top Spots" Component/Screen:**
    - Display a ranked list of venues based on the ML model's output.
    - Explain *why* a spot is recommended (e.g., "Popular with your friends").

## Agent Task Assignments

- **📱 Frontend Agent:** Responsible for building all UI components, screens, and navigation.
- **🔐 Security Agent:** Will work with Frontend Agent on secure token storage and client-side authentication logic.
- **🌐 Location Agent:** Will provide the API endpoints for the map, venues, and user locations. Frontend will integrate with these.
- **🧪 Testing Agent:** Will be tasked to write unit and integration tests for components and services as they are built.