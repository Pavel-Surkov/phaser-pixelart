import { MIN_SCREEN_WIDTH } from '@constants/game';

const blocker = document.querySelector<HTMLDivElement>('#blocker');

export function checkWindowSize() {
  if (window.innerWidth < MIN_SCREEN_WIDTH) {
    blocker?.classList.remove('blocker_hidden');
  } else if (!blocker?.classList.contains('blocker_hidden')) {
    blocker?.classList.add('blocker_hidden');
  }
}
