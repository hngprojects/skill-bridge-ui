const NOTIFICATIONS_DUMMY_DATA: Record<NotificationTab, Notification[]> = {
  All: [
    {
      boldText: "Your upcoming assessment is now available.",
      normalText:
        "Prepare by revisiting key concepts and practice exercises tailored to your skill growth.",
      time: "2 hours",
    },
    {
      boldText: "Great progress!",
      normalText:
        "Your latest assessment results have been recorded. Keep up the momentum to unlock new opportunities ahead.",
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
  ],
  Unread: [
    {
      boldText: "New learning path recommended for you.",
      normalText:
        "Based on your recent activity, we've curated a learning path to help you sharpen your strengths and close skill gaps.",
      time: "30 minutes",
    },
    {
      boldText: "Mentor session reminder",
      normalText:
        "Your scheduled mentor session starts soon. Review your notes and prepare your questions to make the most of it.",
      time: "1 hour",
    },
    {
      boldText: "Profile update required",
      normalText:
        "Complete your profile to receive better job recommendations and unlock personalized career insights.",
      time: "4 hours",
    },
  ],

  Read: [],
};

const notificationTabs = ["All", "Unread", "Read"] as const;
type NotificationTab = (typeof notificationTabs)[number];

type Notification = {
  boldText: string;
  normalText: string;
  time: string;
};

export { NOTIFICATIONS_DUMMY_DATA, notificationTabs };
export type { Notification, NotificationTab };
