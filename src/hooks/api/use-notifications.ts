"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "@/actions/notifications";
import type {
  NotificationsListResponseData,
  UnreadCountResponseData,
} from "@/types/api/notifications";

import { notificationsKeys } from "./keys";

export function useNotifications() {
  return useQuery({
    queryKey: notificationsKeys.list(),
    queryFn: () => getNotifications(),
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: notificationsKeys.unreadCount(),
    queryFn: () => getUnreadCount(),
  });
}

export function useMarkAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: notificationsKeys.list() });
      await qc.cancelQueries({ queryKey: notificationsKeys.unreadCount() });

      const previousNotifications =
        qc.getQueryData<NotificationsListResponseData>(
          notificationsKeys.list(),
        );
      const previousUnreadCount = qc.getQueryData<UnreadCountResponseData>(
        notificationsKeys.unreadCount(),
      );

      qc.setQueryData<NotificationsListResponseData>(
        notificationsKeys.list(),
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
        notificationsKeys.unreadCount(),
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
          notificationsKeys.list(),
          context.previousNotifications,
        );
      }
      if (context?.previousUnreadCount) {
        qc.setQueryData(
          notificationsKeys.unreadCount(),
          context.previousUnreadCount,
        );
      }
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: notificationsKeys.list() });
      void qc.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });
}

export function useMarkAllAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => markAllAsRead(),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: notificationsKeys.list() });
      await qc.cancelQueries({ queryKey: notificationsKeys.unreadCount() });

      const previousNotifications =
        qc.getQueryData<NotificationsListResponseData>(
          notificationsKeys.list(),
        );
      const previousUnreadCount = qc.getQueryData<UnreadCountResponseData>(
        notificationsKeys.unreadCount(),
      );

      qc.setQueryData<NotificationsListResponseData>(
        notificationsKeys.list(),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.map((n) => ({ ...n, isRead: true })),
          };
        },
      );

      qc.setQueryData<UnreadCountResponseData>(
        notificationsKeys.unreadCount(),
        () => ({ count: 0 }),
      );

      return { previousNotifications, previousUnreadCount };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousNotifications) {
        qc.setQueryData(
          notificationsKeys.list(),
          context.previousNotifications,
        );
      }
      if (context?.previousUnreadCount) {
        qc.setQueryData(
          notificationsKeys.unreadCount(),
          context.previousUnreadCount,
        );
      }
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: notificationsKeys.list() });
      void qc.invalidateQueries({ queryKey: notificationsKeys.unreadCount() });
    },
  });
}
