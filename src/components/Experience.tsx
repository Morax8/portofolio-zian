import { getExperiences } from "@/lib/experiences";
import ExperienceTimeline from "./ExperienceTimeline";

export default function Experience() {
  const experiences = getExperiences();
  return (
    <section
      id="experience"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-border"
    >
      <ExperienceTimeline experiences={experiences} />
    </section>
  );
}
