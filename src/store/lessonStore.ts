import { create } from 'zustand';
import {LessonI} from "@/lib/types";

interface LessonStore {
    lessons: LessonI[] | null;
    setLessons: (lessons: LessonI[]) => void;
    clearLessons: () => void;
}

export const useLessonStore = create<LessonStore>((set) => ({
    lessons: null,
    setLessons: (lessons) => set({lessons}),
    clearLessons: () => set({lessons: null})
}))