import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LeadState {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  website: string;
  budget: string;
  message: string;
  
  updateField: (field: keyof Omit<LeadState, 'updateField' | 'resetForm'>, value: string) => void;
  resetForm: () => void;
}

const initialState = {
  name: '',
  email: '',
  phone: '',
  businessType: '',
  website: '',
  budget: '',
  message: '',
};

export const useLeadStore = create<LeadState>()(
  persist(
    (set) => ({
      ...initialState,
      updateField: (field, value) => set({ [field]: value }),
      resetForm: () => set(initialState),
    }),
    {
      name: 'pixen-lead-storage',
    }
  )
);
