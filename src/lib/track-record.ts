/** A talent's hire-outcome track record only renders once enough employers
 *  have rated them — one review swinging a public signal (good or bad, and
 *  regardless of retaliation risk) isn't a reliable enough sample. */
const MIN_RATINGS_TO_DISPLAY = 3;

export function isTrackRecordDisplayable(
  ratingCount: number | null | undefined,
): boolean {
  return (ratingCount ?? 0) >= MIN_RATINGS_TO_DISPLAY;
}
