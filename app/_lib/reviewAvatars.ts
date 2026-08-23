// Maps a testimonial's index (in `t.reviews.items`, which shares the same
// order/names across all 6 languages) to a real customer's photo saved under
// public/images/reviews/. Kept out of i18n.ts since the photo assignment
// isn't translatable data — it's the same regardless of language.
//
// Only 7 real, consenting customer photos exist for 20 review entries, so
// each photo is used on exactly one index — no photo is reused across
// multiple names/quotes. The other 13 entries fall back to the initials
// avatar in Reviews.tsx. Gender-matched to the reviewer's name where the
// available photos allow it.
export const REVIEW_AVATARS: Record<number, string> = {
  0: "/images/reviews/woman-1.jpg", // Anna K.
  1: "/images/reviews/man-1.jpg", // Mikhail S.
  2: "/images/reviews/woman-2.jpg", // Olga M.
  3: "/images/reviews/man-2.jpg", // Dmitry P.
  5: "/images/reviews/man-3.jpg", // Timur A.
  7: "/images/reviews/man-4.jpg", // Artyom V.
  9: "/images/reviews/man-5.jpg", // Bogdan F.
};
