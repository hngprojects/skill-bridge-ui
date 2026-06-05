import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EmployerRoleStatus = "active" | "closed";

export type EmployerRoleItem = {
  id: string;
  title: string;
  status: EmployerRoleStatus;
  offersSent: number;
  requirements: string;
  createdAt: string;
};

type EmployerRolesState = {
  rolesByUser: Record<string, EmployerRoleItem[]>;
  addRole: (userId: string, role: EmployerRoleItem) => void;
  setRoles: (userId: string, roles: EmployerRoleItem[]) => void;
  clearRoles: (userId: string) => void;
  reset: () => void;
};

const initialEmployerRolesState = {
  rolesByUser: {},
};

export const useEmployerRolesStore = create<EmployerRolesState>()(
  persist(
    (set) => ({
      ...initialEmployerRolesState,
      addRole: (userId, role) =>
        set((state) => ({
          rolesByUser: {
            ...state.rolesByUser,
            [userId]: [role, ...(state.rolesByUser[userId] ?? [])],
          },
        })),
      setRoles: (userId, roles) =>
        set((state) => ({
          rolesByUser: {
            ...state.rolesByUser,
            [userId]: roles,
          },
        })),
      clearRoles: (userId) =>
        set((state) => ({
          rolesByUser: {
            ...state.rolesByUser,
            [userId]: [],
          },
        })),
      reset: () => set(initialEmployerRolesState),
    }),
    {
      name: "skillbridge-employer-roles",
      partialize: (state) => ({
        rolesByUser: state.rolesByUser,
      }),
    },
  ),
);
