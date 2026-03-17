"use client";
import { createContext, useContext, useState } from "react";
import { UserSummary } from "@/interfaces/usersummary.data";

const users: UserSummary[] = [
  { userId: 0, userName: "No one" },
  { userId: 1, userName: "Viki" },
  { userId: 2, userName: "Charles" },
  { userId: 3, userName: "Emily" },
  { userId: 4, userName: "Jack" },
];

type CurrentUserContextType = {
  user: UserSummary;
  users: UserSummary[];
  isSignedIn: boolean;
  setUser: (id: number) => void;
};

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<UserSummary>(users[0]);

  const setUser = (id: number) => {
    const found = users.find((u) => u.userId === id) ?? users[0];
    setUserState(found);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        users,
        isSignedIn: user.userId != 0,
        setUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUserContext() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used inside CurrentUserProvider",
    );
  }

  return context;
}
