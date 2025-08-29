import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SimulationState, Language } from '@/types/education';

interface AppContextType {
  simulationState: SimulationState;
  updateSimulation: (key: string, value: any) => void;
  resetSimulation: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialSimulationState: SimulationState = {
  isPlaying: true,
  voltage: 0,
  frequency: 50,
  currentScale: 3,
};

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [simulationState, setSimulationState] = useState<SimulationState>(initialSimulationState);

  const updateSimulation = (key: string, value: any) => {
    setSimulationState(prev => ({ ...prev, [key]: value }));
  };

  const resetSimulation = () => {
    setSimulationState(initialSimulationState);
  };

  return (
    <AppContext.Provider value={{ simulationState, updateSimulation, resetSimulation }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
