# Ionic Project Setup and Run in Android Studio on Windows (Using Capacitor)

This guide will walk you through setting up a fresh Windows PC for running an Ionic project on Android Studio using Capacitor. Follow the steps below carefully to ensure a successful setup.

---

## Prerequisites

1. **Node.js**: Install Node.js, which includes Node Package Manager (npm).
2. **Git**: Git is required to clone the Ionic project and manage version control.
3. **Java Development Kit (JDK)**: Required for Android Studio.
4. **Android Studio**: To build and run the Ionic app on an Android emulator or physical device.
5. **Ionic CLI**: Command-line tool for Ionic projects.
6. **Gradle**: Required by Android Studio to build the project.

---

## Steps to Setup for Ionic App

### 1. Install Node.js

- Download the latest LTS version of [Node.js](https://nodejs.org/en/download/) and install it.
- Verify installation by running the following in Command Prompt (CMD):
  
  ```bash
  node -v
  npm -v
  ```

### 2. Install Git

- Download Git from the [official Git website](https://git-scm.com/download/win) and install it.
- Verify installation:
  
  ```bash
  git --version
  ```

### 3. Install Java Development Kit (JDK)

- Download and install [JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
- Set up the environment variable:
  - Go to `System Properties -> Advanced -> Environment Variables`.
  - In the `System Variables` section, add a new entry:
    - **Variable name**: `JAVA_HOME`
    - **Variable value**: Path to your JDK installation (e.g., `C:\\Program Files\\Java\\jdk-22`).
- Add the JDK’s `bin` folder to the `Path` system variable.
  
  ```bash
  java -version
  ```

### 4. Install Android Studio

- Download and install [Android Studio](https://developer.android.com/studio).
- During installation, ensure Android SDK, Android SDK Platform, Android Virtual Device (AVD), and necessary build tools are installed.
- Open Android Studio and set up an emulator [Managing Emulator](https://developer.android.com/studio/run/managing-avds).


### 5. Install Ionic CLI and Capacitor

- Open Command Prompt and run the following to install Ionic and Capacitor globally:
  
  ```bash
  npm install -g @ionic/cli
  ```

- Verify installation:
  
  ```bash
  ionic -v
  ```

### 6. Clone Your Ionic Project

- Navigate to the directory where you want to clone the project:
  
  ```bash
  git clone https://github.com/asifmd2001/ionic-learning.git
  cd ionic-learning
  ```

### 7. Install Project Dependencies

- Inside the project folder, run the following to install dependencies:
  
  ```bash
  npm install
  ```

### 8. Add Android Platform Using Capacitor

- Add Capacitor to your Ionic project:
  
  ```bash
  npm install @capacitor/core @capacitor/cli
  ```

- Add the Android platform if you don't see android folder in root directory:

  ```bash
  ionic cap add android
  ```

### 9. Build the Ionic Project

- Build the project for production:

  ```bash
  ionic build
  ```

- Sync the built web assets with Capacitor:

  ```bash
  ionic cap sync
  ```

### 10. Open Project in Android Studio

To open your project in Android Studio directly from the command line:

  ```bash
  ionic cap open android
  ```

This will open the Android project in Android Studio so that you can run the App.

### 11. Run on Emulated Android Device using Android Studio and Capacitor

- **Note**: For the server setup, follow the instructions in the [Steps to Run the Server](#steps-to-run-the-server) section to ensure your backend is also running properly.

- To run the app with live reload (enables hot-reloading on save) on a connected Android device or emulator, use:

  ```bash
  ionic cap run android -l --external
  ```

- Choose the Emulated device and select vEthernet
- It will take few minutes to open the Emulated Device
- If it causes Error ReRun the above command once again

### 11. Run on Browser

To run the app in browser use:

  ```bash
  ionic serve
  ```

---

## Steps to Run the Server

1. **Navigate to the Server Directory**:

   Open your terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. **Install Dependencies**:

   Install the necessary Node.js packages using npm:
   ```bash
   npm install
   ```

3. **Start the Server**:

   After installing dependencies, you can start the server:
   ```bash
   npm start
   ```

4. **Verify the Server is Running**:

   Open your web browser and navigate to `http://localhost:3000/health` (or the port specified in your server configuration). You should see your application running.

## Stopping the Server

To stop the server, you can press `Ctrl + C` in the terminal where the server is running.

---

### Author
**Mohamed Asif**
