import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import img2025 from "../assets/antodark.jpeg"; // fallback until anto1 is added
import img2024 from "../assets/anto2.jpg";
import img202124 from "../assets/anto3.jpeg";
import img2023_2024 from "../assets/anto4.png";
import img2021_adm from "../assets/anto5.jpg";
import img2021_hs from "../assets/anto6.png";

export default function TimelineDemo() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-foreground">Doctoral Studies at Johns Hopkins University</h3>
          <div className="mt-3 md:mt-4">
            <TLImage src={img2025} alt="2025 Doctoral Studies" />
          </div>
          <p className="mt-3 text-sm md:mt-4 md:text-base text-muted-foreground">
            Current PhD student in Chemical and Biomolecular Engineering Department.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-foreground">Graduated IIT Madras</h3>
          <div className="mt-3 md:mt-4">
            <TLImage src={img2024} alt="2024 Graduation" />
          </div>
          <p className="mt-3 text-sm md:mt-4 md:text-base text-muted-foreground">
            B.Tech in Chemical Engineering with Minor in Bioprocess Engineering (CGPA: 9.31/10.00).
          </p>
        </div>
      ),
    },
    {
      title: "2021-2024",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-foreground">Academic Excellence at IIT Madras</h3>
          <div className="mt-3 md:mt-4">
            <TLImage src={img202124} alt="2021-2024 Academic Excellence" />
          </div>
          <p className="mt-3 text-sm md:mt-4 md:text-base text-muted-foreground">
            Ranked #1 out of 117 students in Chemical Engineering cohort.
          </p>
        </div>
      ),
    },
    {
      title: "2023-2024",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-foreground">Leadership Role</h3>
          <div className="mt-3 md:mt-4">
            <TLImage src={img2023_2024} alt="2023-2024 Leadership" />
          </div>
          <p className="mt-3 text-sm md:mt-4 md:text-base text-muted-foreground">
            Corporate Relations Head at Entrepreneurship Cell IIT Madras, managing 25-member team.
          </p>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-foreground">IIT Madras Admission</h3>
          <div className="mt-3 md:mt-4">
            <TLImage src={img2021_adm} alt="2021 IIT Admission" />
          </div>
          <p className="mt-3 text-sm md:mt-4 md:text-base text-muted-foreground">
            Top 0.47% performance in JEE Advanced among 1.3 million candidates.
          </p>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-foreground">High School Excellence</h3>
          <div className="mt-3 md:mt-4">
            <TLImage src={img2021_hs} alt="2021 High School" />
          </div>
          <p className="mt-3 text-sm md:mt-4 md:text-base text-muted-foreground">
            Class XII from St. Michael's Academy, Chennai with 99.6% CGPA.
          </p>
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
    <div className="w-full max-w-2xl">
      <AspectRatio ratio={16 / 9}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-xl object-cover border border-border"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            if (el.src !== window.location.origin + '/placeholder.svg') {
              el.src = '/placeholder.svg';
            }
          }}
        />
      </AspectRatio>
    </div>
  );
}

