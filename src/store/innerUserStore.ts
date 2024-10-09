import { create } from 'zustand';
import {InnerUserI, LessonI} from "@/lib/types";

interface InnerUserStore {
    innerUser: InnerUserI | null;
    setInnerUser: (innerUser: InnerUserI) => void;
    clearInnerUser: () => void;
}

export const useInnerUserStore = create<InnerUserStore>((set) => ({
    innerUser: null,
    setInnerUser: (innerUser) => set({innerUser}),
    clearInnerUser: () => set({innerUser: null})
}))