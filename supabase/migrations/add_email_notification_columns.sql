-- Add email notification preference columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email_newsletter boolean DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email_reminders boolean DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email_updates boolean DEFAULT false;
