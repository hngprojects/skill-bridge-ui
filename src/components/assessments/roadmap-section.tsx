"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  AssessmentRoadmapStep,
  AssessmentRoadmapTab,
} from "@/constants/assessment-roadmap";
import { cn } from "@/lib/utils";

import { RoadmapStepCard } from "./roadmap-step-card";

type RoadmapSectionProps = {
  steps: AssessmentRoadmapStep[];
};

const TAB_LABELS: Record<AssessmentRoadmapTab, string> = {
  "in-progress": "In progress",
  completed: "Completed",
};

export function RoadmapSection({ steps }: RoadmapSectionProps) {
  const inProgressSteps = steps.filter((step) => step.tab === "in-progress");
  const completedSteps = steps.filter((step) => step.tab === "completed");

  return (
    <section className="animate-in fade-in slide-in-from-bottom-1 py-10 duration-500">
      <Tabs defaultValue="in-progress" className="gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[22px] leading-normal font-bold tracking-[0.016em] text-[#151515] sm:text-[22px] sm:leading-[1.2] sm:tracking-[-0.02em]">
            Job assessment roadmap
          </h2>

          <TabsList
            variant="line"
            className="hidden h-auto rounded-xl bg-transparent p-0 sm:inline-flex"
          >
            {(["in-progress", "completed"] as const).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "rounded-lg cursor-pointer px-4 py-2 text-base font-normal tracking-[0.016em] text-[#757575] after:hidden data-active:bg-[#EBEBEB]! data-active:font-medium data-active:text-[#151515]",
                )}
              >
                {TAB_LABELS[tab]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="in-progress" className="space-y-6 sm:space-y-4">
          {inProgressSteps.map((step) => (
            <RoadmapStepCard key={step.id} step={step} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedSteps.length ? (
            completedSteps.map((step) => (
              <RoadmapStepCard key={step.id} step={step} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#DBDBDB] bg-white px-6 py-12 text-center">
              <p className="text-base leading-6 font-semibold text-[#151515]">
                No completed assessments yet
              </p>
              <p className="mt-2 text-sm leading-6 tracking-[0.016em] text-[#757575]">
                Your finished assessment steps will appear here once you submit
                them.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
