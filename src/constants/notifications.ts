const NOTIFICATIONS_DUMMY_DATA: Notification[] = [
  {
    boldText: "Your upcoming assessment is now available.",
    normalText:
      "Prepare by revisiting key concepts and practice excercises tailored to your skill growth.",
    time: "2 hours",
  },
  {
    boldText: "Great progress!",
    normalText:
      "Your latest assessment results have been recorded. Keep up the momentum to unlock new oppurtunities ahead.",
    time: "6 hours",
  },
  {
    boldText: "Congratulations on finishing your assessment",
    normalText:
      "Review your results and tips to improve before moving on to the next challenge in your career path.",
    time: "8 hours",
  },
  {
    boldText: "You've unlocked your next assessment!",
    normalText:
      "You can proceed to completing your Skill/career based assessment. This unlocks your next assessment on your job assessment roadmap.",
    time: "12 hours",
  },
];

const notificationTabs = ["All", "Unread"] as const;
type NotificationTab = (typeof notificationTabs)[number];

type Notification = {
  boldText: string;
  normalText: string;
  time: string;
};

export { NOTIFICATIONS_DUMMY_DATA, notificationTabs };
export type { Notification, NotificationTab };
