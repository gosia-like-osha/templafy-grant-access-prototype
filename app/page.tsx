"use client";

import Image from "next/image";
import { useState } from "react";
import { GrantAccessModal } from "@/components/grant-access-modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f4f4]">
      <Image
        src="/images/background.png"
        alt="Templafy modules dashboard"
        fill
        priority
        className="object-cover object-left-top"
      />
      <div className="absolute inset-0 bg-[rgba(30,30,30,0.2)]" />

      {isOpen ? (
        <div className="relative z-10 flex min-h-screen items-start justify-center px-6 pt-20">
          <GrantAccessModal onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-[10px] bg-[#272727] px-5 py-3 text-[15px] font-medium text-white hover:opacity-90"
          >
            Open Grant access dialog
          </button>
        </div>
      )}
    </div>
  );
}
