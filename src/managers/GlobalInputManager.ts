import { checkWindowSize } from '@functions/checkWindowSize';
import { toggleFullscreen } from '@functions/toggleFullscreen';

export class GlobalInputManager {
  private static instance: GlobalInputManager;
  private keyDownCallback: (event: KeyboardEvent) => void;

  private constructor() {
    // Check window size while loading
    checkWindowSize();

    // Set up global listeners for key events
    this.keyDownCallback = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.keyDownCallback);
    window.addEventListener('resize', checkWindowSize);
  }

  public static init() {
    if (!GlobalInputManager.instance) {
      GlobalInputManager.instance = new GlobalInputManager();
    }
  }

  public static hasInstance() {
    return !!GlobalInputManager.instance;
  }

  public static getInstance(): GlobalInputManager {
    return GlobalInputManager.instance;
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'f') {
      toggleFullscreen();
    }
  }

  public removeListeners(): void {
    // Remove event listeners when the manager is no longer needed
    document.removeEventListener('keydown', this.keyDownCallback);
    window.removeEventListener('resize', checkWindowSize);
  }
}
