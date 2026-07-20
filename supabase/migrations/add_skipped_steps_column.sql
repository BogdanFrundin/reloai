-- Track which onboarding steps the user skipped, so the questionnaire can be
-- resumed and completed later instead of being treated as fully answered.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS skipped_steps text[] DEFAULT '{}';
