import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { EmployerSignup, TalentSignup } from "@/types/form-schema";

type SignupFlowState = {
  talentSignup: TalentSignup | null;
  employerLead: EmployerSignup | null;
  setTalentSignup: (signup: TalentSignup) => void;
  setEmployerLead: (lead: EmployerSignup) => void;
  clearTalentSignup: () => void;
  clearEmployerLead: () => void;
  reset: () => void;
};

const initialSignupFlowState = {
  talentSignup: null,
  employerLead: null,
};

export const useSignupFlowStore = create<SignupFlowState>()(
  persist(
    (set) => ({
      ...initialSignupFlowState,
      setTalentSignup: (signup) => set({ talentSignup: signup }),
      setEmployerLead: (lead) => set({ employerLead: lead }),
      clearTalentSignup: () => set({ talentSignup: null }),
      clearEmployerLead: () => set({ employerLead: null }),
      reset: () => set(initialSignupFlowState),
    }),
    {
      name: "skillbridge-signup-flow",
      partialize: (state) => ({
        talentSignup: state.talentSignup,
        employerLead: state.employerLead,
      }),
    },
  ),
);
