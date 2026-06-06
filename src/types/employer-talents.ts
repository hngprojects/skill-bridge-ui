import { DISCOVERY_MIN_SCORE } from "@/types/api/employer-discovery";

export type EmployerFilterOption = {
  value: string;
  label: string;
};

export interface TalentFilters {
  roleTrack: string[];
  experience: string[];
  availability: string[];
  region: string[];
  scoreMin: number;
}

export const DEFAULT_FILTERS: TalentFilters = {
  roleTrack: [],
  experience: [],
  availability: [],
  region: [],
  scoreMin: DISCOVERY_MIN_SCORE,
};

export interface EmployerFilterOptions {
  experience: EmployerFilterOption[];
  roleTrack: EmployerFilterOption[];
  availability: EmployerFilterOption[];
  region: EmployerFilterOption[];
}

export type TalentSortOption = "score-desc" | "score-asc" | "name-asc";

export type TalentsViewToggleProps = {
  view: TalentViewMode;
  onChange: (view: TalentViewMode) => void;
};

export type TalentsFilterChipsProps = {
  chips: {
    key: keyof Pick<
      TalentFilters,
      "roleTrack" | "experience" | "availability" | "region"
    >;
    val: string;
    label: string;
  }[];
  onRemove: (
    key: keyof Pick<
      TalentFilters,
      "roleTrack" | "experience" | "availability" | "region"
    >,
    val: string,
  ) => void;
  onClear: () => void;
};

export type TalentViewMode = "list" | "grid";

export type TalentsFilterSidebarProps = {
  filters: TalentFilters;
  search: string;
  onSearchChange: (value: string) => void;
  onChange: (filters: TalentFilters) => void;
  onApply: () => void;
  onClear: () => void;
};

export type FilterSectionProps = {
  title: string;
  options: readonly EmployerFilterOption[];
  selected: string[];
  onToggle: (val: string) => void;
  searchable?: boolean;
};

export type ScoreSliderProps = {
  value: number;
  onChange: (value: number) => void;
};
