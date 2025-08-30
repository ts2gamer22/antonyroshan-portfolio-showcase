import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2025",
      content: (
        <div className="flex items-start gap-4 md:gap-6">
          <TLImage src="/timeline/anto1.png" alt="2025 Doctoral Studies" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Doctoral Studies at Johns Hopkins University</h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Current PhD student in Chemical and Biomolecular Engineering Department.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="flex items-start gap-4 md:gap-6">
          <TLImage src="/timeline/anto2.png" alt="2024 Graduation" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Graduated IIT Madras</h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              B.Tech in Chemical Engineering with Minor in Bioprocess Engineering (CGPA: 9.31/10.00).
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2021-2024",
      content: (
        <div className="flex items-start gap-4 md:gap-6">
          <TLImage src="/timeline/anto5.png" alt="2021-2024 Academic Excellence" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Academic Excellence at IIT Madras</h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Ranked #1 out of 117 students in Chemical Engineering cohort.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2023-2024",
      content: (
        <div className="flex items-start gap-4 md:gap-6">
          <TLImage src="/timeline/anto4.png" alt="2023-2024 Leadership" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Leadership Role</h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Corporate Relations Head at Entrepreneurship Cell IIT Madras, managing 25-member team.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div className="flex items-start gap-4 md:gap-6">
          <TLImage src="/timeline/anto5.png" alt="2021 IIT Admission" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">IIT Madras Admission</h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Top 0.47% performance in JEE Advanced among 1.3 million candidates.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div className="flex items-start gap-4 md:gap-6">
          <TLImage src="/timeline/anto6.png" alt="2021 High School" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">High School Excellence</h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Class XII from St. Michael's Academy, Chennai with 99.6% CGPA.
            </p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

function TLImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-28 h-28 md:w-40 md:h-40 rounded-xl object-cover border border-border"
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        if (el.src !== window.location.origin + '/placeholder.svg') {
          el.src = '/placeholder.svg';
        }
      }}
    />
  );
}

