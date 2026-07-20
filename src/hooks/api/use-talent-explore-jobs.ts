import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  expressInterest,
  getExploreJobs,
  getWeeklyCapStatus,
} from "@/actions/talent-explore-jobs";

export const EXPLORE_JOBS_QUERY_KEY = ["talent", "explore-jobs"];
export const WEEKLY_CAP_QUERY_KEY = ["talent", "explore-jobs", "weekly-cap"];

export function useExploreJobs(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: [...EXPLORE_JOBS_QUERY_KEY, params],
    queryFn: () => getExploreJobs(params),
  });
}

export function useWeeklyCapStatus() {
  return useQuery({
    queryKey: WEEKLY_CAP_QUERY_KEY,
    queryFn: getWeeklyCapStatus,
  });
}

export function useExpressInterest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expressInterest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPLORE_JOBS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: WEEKLY_CAP_QUERY_KEY });
    },
  });
}
