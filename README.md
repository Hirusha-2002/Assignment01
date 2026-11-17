# CineTrack - Movie Tracker App

**Name:** [Hirusha Attanayake]
**Student ID:** [PE/2022/011]

## App Purpose
CineTrack is a mobile application that allows movie enthusiasts to browse a curated list of classic films, filter them by genre, and save their favorites for later viewing.

## Screens
1. **Home (Movies) Screen**: Displays a FlatList of movies. Includes a Modal to filter movies by genre.
2. **Favorites Screen**: Shows only the movies the user has saved.
3. **Details Screen**: A nested Stack screen showing the poster, rating, and description of the selected movie, with a button to toggle favorites.

## Core Components Used
- **FlatList**: Used in Home and Favorites to render lists.
- **Pressable**: Used for movie cards and buttons.
- **Image**: Used for movie posters.
- **Modal**: Used for the genre filter.
- **Context API**: Used for state management (favorites).

## Expo Router Structure
- `app/_layout.js`: Root layout containing AppProvider and AppState logic.
- `app/(tabs)/_layout.js`: Bottom tabs setup.
- `app/(tabs)/index.js`: Home screen.
- `app/(tabs)/favorites.js`: Favorites screen.
- `app/details/[id].js`: Nested stack screen for details.

## Notifications & AppState Implementation
Using `expo-notifications`, I request permissions on app launch. Using the `AppState` API in the root layout, the app listens for transitions from the background to the foreground. When the user returns to the app, an immediate local notification triggers saying "Welcome back to CineTrack!".

## Local Setup
1. `npm install`
2. `npx expo start`

## Demo Video
[Insert your Unlisted YouTube Link Here]