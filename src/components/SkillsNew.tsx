import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// My Expertise section inspired by the "Integrations" mock.
// Uses 6 PNG icons from public/skills and draws connector lines to a center tile.

const leftIcons = [
  { src: '/skills/python.png', alt: 'Python' },
  { src: '/skills/pytorch.png', alt: 'PyTorch' },
  { src: '/skills/numpy.png', alt: 'NumPy' },
];
const rightIcons = [
  { src: '/skills/matlab.png', alt: 'MATLAB' },
  { src: '/skills/tensorflow.png', alt: 'TensorFlow' },
  { src: '/skills/pandas.png', alt: 'Pandas' },
];

export default function SkillsNew() {
  return (
    <section>
      <div className="bg-muted dark:bg-background py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          {/* Icon constellation */}
          <div className="relative mx-auto flex max-w-sm items-center justify-between">
            {/* Left column */}
            <div className="space-y-4 md:space-y-6">
              <IntegrationCard position="left-top">
                <IconImg {...leftIcons[0]} />
              </IntegrationCard>
              <IntegrationCard position="left-middle">
                <IconImg {...leftIcons[1]} />
              </IntegrationCard>
              <IntegrationCard position="left-bottom">
                <IconImg {...leftIcons[2]} />
              </IntegrationCard>
            </div>

            {/* Center tile */}
            <div className="mx-auto my-2 flex w-fit justify-center gap-2">
              <div className="relative z-20 rounded-2xl shadow-xl shadow-black/10 dark:shadow-white/10">
                <IntegrationCard className="size-20 dark:bg-background" isCenter>
                  <CenterMark />
                </IntegrationCard>
              </div>
            </div>

            {/* Dotted radial overlay */}
            <div
              role="presentation"
              className="absolute inset-1/3 opacity-50 [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]"
            />

            {/* Right column */}
            <div className="space-y-4 md:space-y-6">
              <IntegrationCard position="right-top">
                <IconImg {...rightIcons[0]} />
              </IntegrationCard>
              <IntegrationCard position="right-middle">
                <IconImg {...rightIcons[1]} />
              </IntegrationCard>
              <IntegrationCard position="right-bottom">
                <IconImg {...rightIcons[2]} />
              </IntegrationCard>
            </div>
          </div>

          {/* Heading + CTA */}
          <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">My Expertise</h2>
            <p className="text-muted-foreground">A focused toolkit for research and engineering — now displayed with connected tiles like the reference.</p>
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
      className="size-10 sm:size-12 md:size-12"
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        if (el.src !== window.location.origin + '/placeholder.svg') {
          el.src = '/placeholder.svg';
        }
      }}
    />
  );
}

function CenterMark() {
  return (
    <div className="grid place-items-center size-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
      AR
    </div>
  );
}

type Pos = 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom';

const IntegrationCard = ({ children, className, position, isCenter = false }: { children: React.ReactNode; className?: string; position?: Pos; isCenter?: boolean }) => {
  return (
    <div className={cn('bg-background relative flex size-16 rounded-xl border border-border dark:bg-transparent', className)}>
      <div className={cn('relative z-20 m-auto size-fit *:size-12', isCenter && '*:size-[56px]')}>{children}</div>
      {position && !isCenter && (
        <div
          className={cn(
            'absolute z-10 h-px bg-gradient-to-r from-transparent to-muted-foreground/30',
            position === 'left-top' && 'left-full top-1/2 w-[130px] origin-left rotate-[25deg]',
            position === 'left-middle' && 'left-full top-1/2 w-[120px] origin-left',
            position === 'left-bottom' && 'left-full top-1/2 w-[130px] origin-left -rotate-[25deg]',
            position === 'right-top' && 'right-full top-1/2 w-[130px] origin-right -rotate-[25deg] bg-gradient-to-l',
            position === 'right-middle' && 'right-full top-1/2 w-[120px] origin-right bg-gradient-to-l',
            position === 'right-bottom' && 'right-full top-1/2 w-[130px] origin-right rotate-[25deg] bg-gradient-to-l'
          )}
        />
      )}
    </div>
  );
};
