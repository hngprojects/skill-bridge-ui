"use client";

import { useState } from "react";
import CtaSection from "./cta-section";
import HowItWorks from "./how-it-works";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import HeroSection from "./hero-section";
import WaitlistModal from "./waitlist-modal";

const WaitListPage = () => {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const openModal = () => setIsWaitlistModalOpen(true);

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <SiteHeader onJoinClick={openModal} />
      <main className="flex-1">
        <HeroSection onJoinClick={openModal} />
        <HowItWorks />
        <CtaSection onJoinClick={openModal} />
      </main>
      <SiteFooter />
      <WaitlistModal
        open={isWaitlistModalOpen}
        onOpenChange={setIsWaitlistModalOpen}
      />
    </div>
  );
};

export default WaitListPage;
