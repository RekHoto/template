const body = document.querySelector('body') as HTMLElement;
let top = 0;
let lock = false;

const disable = (): void => {
  if (lock) return;
  lock = true;

  top = window.pageYOffset;
  body.style.top = `-${top}px`;
  body.classList.add('no-scroll');
};

const enable = (): void => {
  if (!lock) return;
  lock = false;

  body.style.top = '';
  body.classList.remove('no-scroll');

  window.scrollTo(0, top);
};

export const scroll = { disable, enable };
