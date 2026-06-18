import type { SVGProps } from "react";

const OpenCode = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 24H2V0h20z" fill="currentColor" />
    <path d="M17 4.8H7v14.4h10z" fill="var(--background, #fff)" />
  </svg>
);

export { OpenCode };
