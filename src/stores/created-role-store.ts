import { create } from "zustand";

import type { WorkPreferencesValues } from "@/types/create-role-schema";
import type { UploadJdValues } from "@/components/dashboard/employer/roles/create-role-wizard/step-upload-jd";

export type CreatedRoleData = {
  /** Backend-assigned id from `POST /employer/roles`. */
  id?: string;
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
