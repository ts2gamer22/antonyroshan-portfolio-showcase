import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Doctoral Studies at Johns Hopkins University</h3>
          <p className="mt-2 text-sm md:text-base text-neutral-800 dark:text-neutral-200">
            Current PhD student in Chemical and Biomolecular Engineering Department.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Graduated IIT Madras</h3>
          <p className="mt-2 text-sm md:text-base text-neutral-800 dark:text-neutral-200">
            B.Tech in Chemical Engineering with Minor in Bioprocess Engineering (CGPA: 9.31/10.00).
          </p>
        </div>
      ),
    },
    {
      title: "2021-2024",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Academic Excellence at IIT Madras</h3>
          <p className="mt-2 text-sm md:text-base text-neutral-800 dark:text-neutral-200">
            Ranked #1 out of 117 students in Chemical Engineering cohort.
          </p>
        </div>
      ),
    },
    {
      title: "2023-2024",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Leadership Role</h3>
          <p className="mt-2 text-sm md:text-base text-neutral-800 dark:text-neutral-200">
            Corporate Relations Head at Entrepreneurship Cell IIT Madras, managing 25-member team.
          </p>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">IIT Madras Admission</h3>
          <p className="mt-2 text-sm md:text-base text-neutral-800 dark:text-neutral-200">
            Top 0.47% performance in JEE Advanced among 1.3 million candidates.
          </p>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">High School Excellence</h3>
          <p className="mt-2 text-sm md:text-base text-neutral-800 dark:text-neutral-200">
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

