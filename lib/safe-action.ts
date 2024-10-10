import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';

import { createClient } from '@/lib/supabase/server';

export const action = createSafeActionClient({
  async middleware() {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user) {
      throw new Error("You're not authorized.");
    }

    return {
      userId: user?.user.id
    };
  },
  handleServerError: (e) => {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  }
});
