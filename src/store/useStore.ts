import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Doctor, Patient, Appointment, InventoryItem } from '../types';
import initialData from '../data/initialData.json';

interface AppState {
  currentUser: User | null;
  users: User[];
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  inventory: InventoryItem[];
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  addDoctor: (doctor: Doctor) => void;
  addPatient: (patient: Patient) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  updateInventory: (id: string, updates: Partial<InventoryItem>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      users: initialData.users,
      doctors: initialData.doctors,
      patients: initialData.patients,
      appointments: initialData.appointments,
      inventory: initialData.inventory,
      
      setCurrentUser: (user) => set({ currentUser: user }),
      
      addUser: (user) =>
        set((state) => ({ users: [...state.users, user] })),
      
      addDoctor: (doctor) =>
        set((state) => ({ doctors: [...state.doctors, doctor] })),
      
      addPatient: (patient) =>
        set((state) => ({ patients: [...state.patients, patient] })),
      
      addAppointment: (appointment) =>
        set((state) => ({ appointments: [...state.appointments, appointment] })),
      
      updateAppointment: (id, updates) =>
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, ...updates } : apt
          ),
        })),
      
      updateInventory: (id, updates) =>
        set((state) => ({
          inventory: state.inventory.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
    }),
    {
      name: 'hospital-storage',
    }
  )
);