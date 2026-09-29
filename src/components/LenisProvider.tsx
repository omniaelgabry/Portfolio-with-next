"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {children as any}
    </ReactLenis>
  );
}
