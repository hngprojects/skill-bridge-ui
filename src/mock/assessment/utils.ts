export function mockDelay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createMockSessionId(phase: string): string {
  return `demo-${phase}-${Date.now()}`;
}
