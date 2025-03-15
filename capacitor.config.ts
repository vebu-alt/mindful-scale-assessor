
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3814059c84cf4f308dc48b298320a156',
  appName: 'mindful-scale-assessor',
  webDir: 'dist',
  server: {
    url: 'https://3814059c-84cf-4f30-8dc4-8b298320a156.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash"
    }
  }
};

export default config;
