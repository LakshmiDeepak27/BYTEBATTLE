-- Database indexes for ByteBattle Contest
-- Run these in your Supabase SQL editor for optimal performance

-- Index for unique code lookups (critical for high traffic)
CREATE INDEX IF NOT EXISTS idx_registrations_code ON registrations(code);

-- Index for duplicate checking (email and USN)
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_usn ON registrations(usn);

-- Index for admin queries (ordering by creation date)
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Index for payment status queries
CREATE INDEX IF NOT EXISTS idx_registrations_paid ON registrations(paid);

-- Composite index for admin dashboard queries
CREATE INDEX IF NOT EXISTS idx_registrations_admin ON registrations(created_at DESC, paid, branch);

-- Ensure unique constraints (if not already set)
ALTER TABLE registrations ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE registrations ADD CONSTRAINT unique_usn UNIQUE (usn);
ALTER TABLE registrations ADD CONSTRAINT unique_code UNIQUE (code);

-- Add check constraints for data validation
ALTER TABLE registrations ADD CONSTRAINT check_code_range CHECK (code >= 1000 AND code <= 9999);
ALTER TABLE registrations ADD CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add comments for documentation
COMMENT ON TABLE registrations IS 'ByteBattle Contest Registration Data';
COMMENT ON COLUMN registrations.code IS 'Unique 4-digit registration code (1000-9999)';
COMMENT ON COLUMN registrations.paid IS 'Payment status - true if payment screenshot uploaded';
COMMENT ON COLUMN registrations.payment_screenshot_url IS 'URL to uploaded payment screenshot';
