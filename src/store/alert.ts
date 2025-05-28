// import { devtools, persist } from "zustand/middleware";
// import { create } from "zustand";
// import { AlertI } from "@/models/components/AlertI";
//
// interface AlertState {
//   data: AlertI;
//   show: (data: AlertI) => void;
//   hide: () => void;
// }
//
// export const useAlert = create<AlertState>()(
//   devtools(
//     persist(
//       (set) => ({
//         data: null,
//         show: (data) => set(() => ({ data })),
//         hide: () => set(() => ({ data: null })),
//       }),
//       {
//         name: "alert-storage",
//       }
//     )
//   )
// );
