export const isDesktop = () => {
  const desktopBreakpoint = 1000;
  return window.innerWidth >= desktopBreakpoint;
}