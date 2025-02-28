import { SceneKeys } from '@constants/game';
import { loadAssets } from '@functions/loadAssets';

export class Preload extends Phaser.Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  preload() {
    this.add
      .text(this.scale.width / 2, this.scale.height - 120, 'Loading...', {
        fontSize: 24,
      })
      .setOrigin(0.5, 0.5);

    loadAssets(this);

    this.load.on('complete', () => {
      this.scene.launch(SceneKeys.GAME);
    });
  }

  create() {
    this.cameras.main.fadeIn(2000, 0, 0, 0, () => this.scene.remove(SceneKeys.TUTORIAL), this);
  }
}
