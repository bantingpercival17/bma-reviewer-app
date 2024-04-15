import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'student.bma.edu.ph',
  appName: 'BMA - REVIEWER',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;
