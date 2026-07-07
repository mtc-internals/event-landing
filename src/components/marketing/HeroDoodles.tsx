/**
 * Hand-drawn-style connector squiggles around the hero collage, drawn in
 * with a stroke-dash animation on load (Meetup-style doodles). Pure SVG +
 * CSS — no client JS. Hidden below lg alongside the collage itself.
 */
export function HeroDoodles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {/* left squiggle: curls from the top-left photo down toward the bottom-left one */}
      <svg
        viewBox="0 0 160 260"
        fill="none"
        className="absolute top-[30%] left-[3%] h-56 w-36 text-brand/50"
      >
        <path
          d="M118 8 C 60 40, 130 90, 78 128 S 20 200, 52 246"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-draw-line"
        />
      </svg>

      {/* right squiggle: loops between the two right-hand photos */}
      <svg
        viewBox="0 0 160 260"
        fill="none"
        className="absolute top-[28%] right-[4%] h-56 w-36 text-brand/50"
      >
        <path
          d="M30 12 C 96 52, 10 96, 84 140 c 40 26, 56 62, 30 108"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-draw-line"
          style={{ animationDelay: "0.9s" }}
        />
      </svg>

      {/* emphasis ticks above the top-right photo */}
      <svg
        viewBox="0 0 60 40"
        fill="none"
        className="absolute top-[2%] right-[13%] h-10 w-14 text-accent-coral/70"
      >
        <path
          d="M10 34 L 18 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-draw-line"
          style={{ animationDelay: "1.3s" }}
        />
        <path
          d="M30 30 L 34 8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-draw-line"
          style={{ animationDelay: "1.45s" }}
        />
        <path
          d="M48 32 L 56 14"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-draw-line"
          style={{ animationDelay: "1.6s" }}
        />
      </svg>

      {/* musical note flourish near the bottom-left photo */}
      <svg
        viewBox="0 0 40 48"
        fill="none"
        className="absolute bottom-[4%] left-[16%] h-10 w-8 text-brand/60"
      >
        <path
          d="M14 40 a 5 5 0 1 0 0.1 0 M19 40 V 10 l 12 -4 v 26 M31 32 a 5 5 0 1 0 0.1 0"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw-line"
          style={{ animationDelay: "1.1s" }}
        />
      </svg>
    </div>
  );
}
