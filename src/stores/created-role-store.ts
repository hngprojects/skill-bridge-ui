import { create } from "zustand";

import type { WorkPreferencesValues } from "@/types/create-role-schema";
import type { UploadJdValues } from "@/components/dashboard/employer/roles/create-role-wizard/step-upload-jd";

export type CreatedRoleData = {
  title: string;
  category: string;
  companyUrl: string;
  uploadJd: UploadJdValues;
  workPreferences: WorkPreferencesValues;
  selectedAssessments: string[];
};

type CreatedRoleStore = {
  role: CreatedRoleData | null;
  setRole: (role: CreatedRoleData) => void;
  clear: () => void;
};

export const useCreatedRoleStore = create<CreatedRoleStore>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clear: () => set({ role: null }),
}));
