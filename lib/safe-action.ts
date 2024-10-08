import { createSafeActionClient } from 'next-safe-action';

import { createClient } from '@/lib/supabase/server';

export const actionClient = createSafeActionClient({
  middleware: async () => {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user) {
      throw new Error("You're not authorized.");
    }

    return {
      userId: user?.user.id
    };
  }
});
