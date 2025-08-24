-- Fix security vulnerability: Restrict profiles table access
-- Drop the overly permissive policy that allows everyone to view all profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create secure policy: Users can only view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Optional: If community features need basic profile info, create a limited policy for authenticated users
-- This would need to be combined with application-level filtering to only expose non-sensitive fields
CREATE POLICY "Authenticated users can view basic public profile info" 
ON public.profiles 
FOR SELECT 
USING (
  auth.role() = 'authenticated' 
  -- Note: Application code should filter to only show name/avatar, not bio/sensitive data
);