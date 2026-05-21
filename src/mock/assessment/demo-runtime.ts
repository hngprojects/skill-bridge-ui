/** Set by AssessmentDemoShell on mount — no env var required. */
let assessmentDemoEnabled = true;

export function setAssessmentDemoEnabled(enabled: boolean): void {
  assessmentDemoEnabled = enabled;
}

export function isAssessmentDemoMode(): boolean {
  return assessmentDemoEnabled;
}
