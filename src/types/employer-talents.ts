export interface Talent {
  id: string;
  name: string;
  role: string;
  level: string;
  score: number;
  avatar: string;
  scoreBadge: string;
  tags: string[];
}

export interface TalentProfile {
  full_name: string;
  role: string;
  goal: string;
  about: string;
  about_tags: string[];
  ai_summary: string;
  ai_report: string;
  avatar_url: string | null;
  verified: boolean;
  status: string;
  seniority_badge: string;
  tier: string;
  tier_label: string;
  score_percentage: number;
  skills: string[];
  working_style: string[];
  share_url: string;
  qr_code_url: string;
  is_owner: boolean;
  verified_at: string;
  skill_breakdown_tabs: Array<{
    id: string;
    label: string;
    items: Array<{
      id: string;
      label: string;
      percentage: number;
      insight: string;
    }>;
  }>;
}

export interface TalentFilters {
  roleTrack: string[];
  experience: string[];
  availability: string[];
  region: string[];
  scoreMin: number;
  scoreMax: number;
}

export const DEFAULT_FILTERS: TalentFilters = {
  roleTrack: [],
  experience: [],
  availability: [],
  region: [],
  scoreMin: 0,
  scoreMax: 100,
};

export interface EmployerFilterOptions {
  experience: string[];
  roleTrack: string[];
  availability: string[];
  region: string[];
}

export type TalentSortOption = "score-desc" | "score-asc" | "name-asc";

export type TalentsPaginationProps = {
  showing: number;
  total: number;
};

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
  onChange: (filters: TalentFilters) => void;
  onApply: () => void;
  onClear: () => void;
};

export type FilterSectionProps = {
  title: string;
  options: readonly string[];
  selected: string[];
  onToggle: (val: string) => void;
  searchable?: boolean;
};

export type ScoreSliderProps = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
};
