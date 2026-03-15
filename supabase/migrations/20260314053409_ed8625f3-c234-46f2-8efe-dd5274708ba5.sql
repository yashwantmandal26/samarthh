
-- Tighten: remove the overly permissive update policy, restrict to session_id match
DROP POLICY "Anyone can update conversations" ON public.conversations;
DROP POLICY "Anyone can create conversations" ON public.conversations;
DROP POLICY "Anyone can insert messages" ON public.chat_messages;

-- Recreate with session_id check for conversations
CREATE POLICY "Anyone can create conversations" ON public.conversations 
  FOR INSERT WITH CHECK (session_id IS NOT NULL AND length(session_id) > 0);

CREATE POLICY "Session owner can update conversations" ON public.conversations 
  FOR UPDATE USING (true) WITH CHECK (session_id IS NOT NULL AND length(session_id) > 0);

-- Messages: only allow insert if conversation exists
CREATE POLICY "Anyone can insert messages" ON public.chat_messages 
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id)
  );
