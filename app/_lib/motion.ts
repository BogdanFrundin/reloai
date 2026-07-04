export const pressScale =
  "transition-transform duration-150 ease-out active:scale-[0.97] motion-reduce:active:scale-100";

export const hoverLift =
  "transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 motion-reduce:transition-none";

export const cardHover =
  "transition-[transform,box-shadow,border-color,background-color] duration-200 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/40 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_8px_30px_-8px_rgba(33,85,212,0.35)] motion-reduce:transition-none";
