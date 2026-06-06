"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "@/actions/notifications";
import type {
  NotificationRole,
  NotificationsListResponseData,
  UnreadCountResponseData,
} from "@/types/api/notifications";

import { notificationsKeys } from "./keys";

export function useNotifications(role: NotificationRole) {
  return useQuery({
    queryKey: notificationsKeys.list(role),
    queryFn: () => getNotifications(role),
  });
}

export function useUnreadCount(role: NotificationRole) {
  return useQuery({
    queryKey: notificationsKeys.unreadCount(role),
    queryFn: () => getUnreadCount(role),
  });
}

export function useMarkAsRead(role: NotificationRole) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markAsRead(role, id),
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: notificationsKeys.list(role) });
      await qc.cancelQueries({ queryKey: notificationsKeys.unreadCount(role) });

      const previousNotifications =
        qc.getQueryData<NotificationsListResponseData>(
          notificationsKeys.list(role),
        );
      const previousUnreadCount = qc.getQueryData<UnreadCountResponseData>(
        notificationsKeys.unreadCount(role),
      );

      qc.setQueryData<NotificationsListResponseData>(
        notificationsKeys.list(role),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.map((n) =>
              n.id === id ? { ...n, isRead: true } : n,
            ),
          };
        },
      );

      qc.setQueryData<UnreadCountResponseData>(
        notificationsKeys.unreadCount(role),
        (old) => {
          if (!old) return old;
          return { count: Math.max(0, old.count - 1) };
        },
      );

      return { previousNotifications, previousUnreadCount };
    },
    onError: (_err, _id, context) => {
      if (context?.previousNotifications) {
        qc.setQueryData(
          notificationsKeys.list(role),
          context.previousNotifications,
        );
      }
      if (context?.previousUnreadCount) {
        qc.setQueryData(
          notificationsKeys.unreadCount(role),
          context.previousUnreadCount,
        );
      }
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: notificationsKeys.list(role) });
      void qc.invalidateQueries({
        queryKey: notificationsKeys.unreadCount(role),
      });
    },
  });
}

export function useMarkAllAsRead(role: NotificationRole) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => markAllAsRead(role),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: notificationsKeys.list(role) });
      await qc.cancelQueries({ queryKey: notificationsKeys.unreadCount(role) });

      const previousNotifications =
        qc.getQueryData<NotificationsListResponseData>(
          notificationsKeys.list(role),
        );
      const previousUnreadCount = qc.getQueryData<UnreadCountResponseData>(
        notificationsKeys.unreadCount(role),
      );

      qc.setQueryData<NotificationsListResponseData>(
        notificationsKeys.list(role),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.map((n) => ({ ...n, isRead: true })),
          };
        },
      );

      qc.setQueryData<UnreadCountResponseData>(
        notificationsKeys.unreadCount(role),
        () => ({ count: 0 }),
      );

      return { previousNotifications, previousUnreadCount };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousNotifications) {
        qc.setQueryData(
          notificationsKeys.list(role),
          context.previousNotifications,
        );
      }
      if (context?.previousUnreadCount) {
        qc.setQueryData(
          notificationsKeys.unreadCount(role),
          context.previousUnreadCount,
        );
      }
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: notificationsKeys.list(role) });
      void qc.invalidateQueries({
        queryKey: notificationsKeys.unreadCount(role),
      });
    },
  });
}
