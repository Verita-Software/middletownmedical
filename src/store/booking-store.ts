"use client";

import { create } from "zustand";
import type { Provider } from "@/lib/mock-data";

export type BookingStep = "questions" | "schedule" | "details" | "done";

export interface ScheduleEntry {
  id: string;
  start: string;
  end: string;
}

export interface SlotEntry {
  id: string;
  start: string;
  end: string;
  reference: string;
}

export interface PatientDetails {
  firstName: string;
  lastName: string;
  legalSex: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  aptSuite?: string;
  city: string;
  state: string;
  zip: string;
  insurance: string;
}

export interface BookingAnswers {
  seenInThreeYears?: "yes" | "no";
  visitType?: string;
}

interface BookingState {
  provider: Provider | null;
  patientAge: string;
  insurance: string;
  answers: BookingAnswers;
  step: BookingStep;
  scheduleEntries: ScheduleEntry[];
  slotEntries: SlotEntry[];
  selectedDate: ScheduleEntry | null;
  selectedSlot: SlotEntry | null;
  patientDetails: Partial<PatientDetails>;
  loading: boolean;
  error: string | null;
  bookSuccess: boolean;
}

interface BookingActions {
  setProvider: (provider: Provider | null) => void;
  setAgeAndInsurance: (age: string, insurance: string) => void;
  setAnswers: (answers: BookingAnswers) => void;
  setStep: (step: BookingStep) => void;
  setScheduleEntries: (entries: ScheduleEntry[]) => void;
  setSlotEntries: (entries: SlotEntry[]) => void;
  setSelectedDate: (entry: ScheduleEntry | null) => void;
  setSelectedSlot: (entry: SlotEntry | null) => void;
  setPatientDetails: (details: Partial<PatientDetails>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setBookSuccess: (success: boolean) => void;
  reset: () => void;
}

const initialState: BookingState = {
  provider: null,
  patientAge: "",
  insurance: "",
  answers: {},
  step: "questions",
  scheduleEntries: [],
  slotEntries: [],
  selectedDate: null,
  selectedSlot: null,
  patientDetails: {},
  loading: false,
  error: null,
  bookSuccess: false,
};

export const useBookingStore = create<BookingState & BookingActions>((set) => ({
  ...initialState,
  setProvider: (provider) => set({ provider }),
  setAgeAndInsurance: (patientAge, insurance) => set({ patientAge, insurance }),
  setAnswers: (answers) => set({ answers }),
  setStep: (step) => set({ step }),
  setScheduleEntries: (scheduleEntries) => set({ scheduleEntries }),
  setSlotEntries: (slotEntries) => set({ slotEntries }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
  setPatientDetails: (patientDetails) =>
    set((s) => ({ patientDetails: { ...s.patientDetails, ...patientDetails } })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setBookSuccess: (bookSuccess) => set({ bookSuccess }),
  reset: () => set(initialState),
}));
