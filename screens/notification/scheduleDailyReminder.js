import PushNotification from "react-native-push-notification";

// Configure PushNotification
PushNotification.configure({
  onNotification: function (notification) {
    console.log("Notification received: ", notification);
  },
  // Permissions to request
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

// Create a channel (required for Android)
PushNotification.createChannel(
  {
    channelId: "daily-reminder", // (required)
    channelName: "Daily Reminders", // (required)
    channelDescription: "A channel for daily reminder notifications",
    soundName: "default",
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

export const scheduleDailyReminder = () => {
  PushNotification.localNotificationSchedule({
    channelId: "daily-reminder",
    message: "Don't forget to check in today!",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Schedule for next day
    repeatType: "day",
  });
};