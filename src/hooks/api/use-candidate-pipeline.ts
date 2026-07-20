import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCandidatePipeline,
  sendAssessmentToCandidate,
  type CandidatePipelineParams,
} from "@/actions/candidate-pipeline";

export const PIPELINE_QUERY_KEY = ["employer", "pipeline"];

export function useCandidatePipeline(
  roleId: string,
  params?: CandidatePipelineParams,
) {
  return useQuery({
    queryKey: [...PIPELINE_QUERY_KEY, roleId, params],
    queryFn: () => getCandidatePipeline(roleId, params),
    enabled: !!roleId,
  });
}

export function useSendAssessmentToCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      roleId,
      candidateId,
      assessmentId,
    }: {
      roleId: string;
      candidateId: string;
      assessmentId: string;
    }) => sendAssessmentToCandidate(roleId, candidateId, assessmentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...PIPELINE_QUERY_KEY, variables.roleId],
      });
    },
  });
}
