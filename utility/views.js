export const isInMobileView = () => {
  return window.innerWidth < 1020;
};

export const isInTabletView = () => {
  return window.innerWidth < 1320 && window.innerWidth >= 1020;
};

export const isInDesktopView = () => {
  return window.innerWidth >= 1320;
};
