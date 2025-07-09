
-- Create trigger to automatically update the updated_at column for portfolio_projects
CREATE OR REPLACE FUNCTION update_portfolio_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for portfolio_projects table
DROP TRIGGER IF EXISTS update_portfolio_projects_updated_at ON portfolio_projects;
CREATE TRIGGER update_portfolio_projects_updated_at
    BEFORE UPDATE ON portfolio_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_portfolio_updated_at();

-- Add RLS policy for admins to manage portfolio projects (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'portfolio_projects' 
        AND policyname = 'Admins can manage all portfolio projects'
    ) THEN
        CREATE POLICY "Admins can manage all portfolio projects"
        ON portfolio_projects FOR ALL
        TO authenticated
        USING (auth.email() = 'gowthamj0055@gmail.com');
    END IF;
END $$;
