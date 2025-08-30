import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// This component mirrors the provided "Integrations" mock, adapted for Vite/React.
// It renders 6 expertise icons you can place in public/skills as PNGs.

const ICONS = [
  { src: '/skills/python.png', alt: 'Python' },
  { src: '/skills/matlab.png', alt: 'MATLAB' },
  { src: '/skills/pytorch.png', alt: 'PyTorch' },
  { src: '/skills/tensorflow.png', alt: 'TensorFlow' },
  { src: '/skills/numpy.png', alt: 'NumPy' },
  { src: '/skills/pandas.png', alt: 'Pandas' },
];

export default function SkillsNew() {
  const rows = [
    ICONS.slice(0, 2), // Row 1: Python, MATLAB
    ICONS.slice(2, 4), // Row 2: PyTorch, TensorFlow
    ICONS.slice(4, 6), // Row 3: NumPy, Pandas
  ];

  return (
    <section>
      <div className="bg-muted dark:bg-background py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative mx-auto w-fit">
            {/* subtle radial overlay */}
            <div role="presentation" className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--muted))_75%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_75%)]" />

            {/* Icon rows */}
            <div className="mx-auto mb-2 flex w-fit justify-center gap-2">
              {rows[0].map((icon) => (
                <IntegrationCard key={icon.alt}>
                  <IconImg {...icon} />
                </IntegrationCard>
              ))}
            </div>

            <div className="mx-auto my-2 flex w-fit justify-center gap-2">
              {rows[1].map((icon) => (
                <IntegrationCard key={icon.alt}>
                  <IconImg {...icon} />
                </IntegrationCard>
              ))}
            </div>

            <div className="mx-auto flex w-fit justify-center gap-2">
              {rows[2].map((icon) => (
                <IntegrationCard key={icon.alt}>
                  <IconImg {...icon} />
                </IntegrationCard>
              ))}
            </div>
          </div>

          {/* Heading + CTA */}
          <div className="mx-auto mt-6 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">My Expertise</h2>
            <p className="text-muted-foreground">A focused toolkit for research and engineering — drop 6 PNG icons into public/skills to populate this grid.</p>

            <Button variant="outline" size="sm" asChild>
              <Link to="/projects">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconImg({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="size-8"
      onError={(e) => {
        // Fallback to a placeholder if the icon is not present yet
        const el = e.currentTarget as HTMLImageElement;
        if (el.src !== window.location.origin + '/placeholder.svg') {
          el.src = '/placeholder.svg';
        }
      }}
    />
  );
}

const IntegrationCard = ({ children, className, borderClassName }: { children: React.ReactNode; className?: string; borderClassName?: string }) => {
  return (
    <div className={cn('bg-background relative flex size-20 rounded-xl dark:bg-transparent', className)}>
      <div role="presentation" className={cn('absolute inset-0 rounded-xl border border-black/20 dark:border-white/25', borderClassName)} />
      <div className="relative z-20 m-auto size-fit *:size-8">{children}</div>
    </div>
  );
};
