import { ContactForm } from "./contact-form";
import { HeroSection } from "./contact-hero";
import { ReachOut } from "./reach-out";

export const metadata = {
  title: "Contact Us | SkillBridge",
  description:
    "SkillBridge helps early-career talents build in-demand skills, prove their capabilities through verified performance, and connect with opportunities. Contact us to learn more about our programs and how we can help you achieve your career goals.",
};

export default function ContactPage() {
  return (
    <div>
      <HeroSection />
      <ContactForm />
      <ReachOut />
    </div>
  );
}
