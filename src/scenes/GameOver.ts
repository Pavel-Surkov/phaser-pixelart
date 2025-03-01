import { SceneKeys } from '@constants/game';

export class GameOver extends Phaser.Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  create() {
    this.cameras.main.setBackgroundColor('#000');

    this.registry.destroy();
    this.scene.stop(SceneKeys.GAME);
    this.createSceneTransition();
  }

  private createSceneTransition() {
    this.input.manager.enabled = true;
    this.input.keyboard!.once(
      'keydown-' + 'R',
      () => {
        this.scene.start(SceneKeys.GAME);
      },
      this
    );

    const clickText = this.add
      .text(this.scale.width / 2, this.scale.height / 2 + 200, 'Press "R" to restart', {
        fontSize: 24,
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(0);

    this.tweens.add({
      targets: clickText,
      alpha: 1,
      duration: 1000,
      ease: 'Linear',
    });
  }

  update() {}
}
