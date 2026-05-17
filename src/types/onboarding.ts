import type { ReactNode } from "react";

import type {
  GoalOptionId,
  OnboardingStepId,
  TrackOptionId,
} from "@/constants/talent-onboarding";
export type TalentOnboardingState = {
  currentStepId: OnboardingStepId;
  selectedGoalId: GoalOptionId | null;
  selectedTrackIds: TrackOptionId[];
  goalSaved: boolean;
  tracksSaved: boolean;
  profileRegion: string;
  profileEducation: string;
  profileLinkedin: string;
  profileSaved: boolean;
  setCurrentStepId: (id: OnboardingStepId) => void;
  setSelectedGoalId: (id: GoalOptionId | undefined) => void;
  setSelectedTrackIds: (ids: TrackOptionId[]) => void;
  setGoalSaved: (saved: boolean) => void;
  setTracksSaved: (saved: boolean) => void;
  setProfileRegion: (region: string) => void;
  setProfileEducation: (education: string) => void;
  setProfileLinkedin: (linkedin: string) => void;
  setProfileSaved: (saved: boolean) => void;
};

export type OnboardingIntroHeaderProps = {
  resolvedTitle: ReactNode | null | undefined;
  description: ReactNode | undefined;
  fallbackTitle: string;
  hasIntro: boolean;
  centered?: boolean;
};

export type OnboardingShellProps = {
  currentStepId: OnboardingStepId;
  onNext: () => void;
  onBack: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};
