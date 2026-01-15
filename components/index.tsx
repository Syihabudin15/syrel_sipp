"use client";

import dynamic from "next/dynamic";

export const ILayout = dynamic(() => import("@/components/ILayout"), {
  ssr: false,
});
