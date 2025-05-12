import { useUserStore } from "@/store/user";

export function useCurrentUser() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  return { user, setUser, clearUser };
}
