import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext<any>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [profiles, setProfiles] = useState<any[]>([]);

  return (
    <ProfileContext.Provider value={{ selectedProfile, setSelectedProfile, profiles, setProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);