"use client";
import { createContext, useContext, useState } from "react";
import { UserSummary } from "@/interfaces/usersummary.data";

const users: UserSummary[] = [
  { id: 0, name: "No one" },
  { id: 1, name: "Viki" },
  { id: 2, name: "Charles" },
  { id: 3, name: "Emily" },
  { id: 4, name: "Jack" },
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
    const found = users.find((u) => u.id === id) ?? users[0];
    setUserState(found);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        users,
        isSignedIn: user.id != 0,
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
