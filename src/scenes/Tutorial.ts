import { KEYBOARD_SPRITE_KEY, SceneKeys } from '@constants/game';
import { GlobalInputManager } from '@managers/GlobalInputManager';

export class Tutorial extends Phaser.Scene {
  private w: Phaser.GameObjects.Sprite;
  private a: Phaser.GameObjects.Sprite;
  private s: Phaser.GameObjects.Sprite;
  private d: Phaser.GameObjects.Sprite;

  private j: Phaser.GameObjects.Sprite;
  private f: Phaser.GameObjects.Sprite;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  init() {
    if (GlobalInputManager.hasInstance()) {
      GlobalInputManager.getInstance().removeListeners();
    }
  }

  preload() {
    const { load } = this;
    load.setPath('assets');

    load.spritesheet(KEYBOARD_SPRITE_KEY, '/keyboard/Keyboard_Letters.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  private createKeyAnimations() {
    this.w = this.add.sprite(this.scale.width / 2 - 150, this.scale.height / 2 - 40, KEYBOARD_SPRITE_KEY).setScale(4);
    this.a = this.add.sprite(this.scale.width / 2 - 150 - 48, this.scale.height / 2, KEYBOARD_SPRITE_KEY).setScale(4);
    this.s = this.add.sprite(this.scale.width / 2 - 150, this.scale.height / 2, KEYBOARD_SPRITE_KEY).setScale(4);
    this.d = this.add.sprite(this.scale.width / 2 - 150 + 48, this.scale.height / 2, KEYBOARD_SPRITE_KEY).setScale(4);
    this.j = this.add.sprite(this.scale.width / 2 + 150, this.scale.height / 2 + 50, KEYBOARD_SPRITE_KEY).setScale(4);
    this.f = this.add.sprite(this.scale.width / 2 + 150, this.scale.height / 2 - 50, KEYBOARD_SPRITE_KEY).setScale(4);

    this.w.anims.create({
      key: 'w_key',
      frames: this.anims.generateFrameNumbers(KEYBOARD_SPRITE_KEY, {
        frames: [38, 94],
      }),
      frameRate: 1,
      repeat: -1,
    });
    this.a.anims.create({
      key: 'a_key',
      frames: this.anims.generateFrameNumbers(KEYBOARD_SPRITE_KEY, {
        frames: [16, 72],
      }),
      frameRate: 1,
      repeat: -1,
    });
    this.s.anims.create({
      key: 's_key',
      frames: this.anims.generateFrameNumbers(KEYBOARD_SPRITE_KEY, {
        frames: [34, 90],
      }),
      frameRate: 1,
      repeat: -1,
    });
    this.d.anims.create({
      key: 'd_key',
      frames: this.anims.generateFrameNumbers(KEYBOARD_SPRITE_KEY, {
        frames: [19, 75],
      }),
      frameRate: 1,
      repeat: -1,
    });
    this.j.anims.create({
      key: 'j_key',
      frames: this.anims.generateFrameNumbers(KEYBOARD_SPRITE_KEY, {
        frames: [25, 81],
      }),
      frameRate: 1,
      repeat: -1,
    });
    this.f.anims.create({
      key: 'f_key',
      frames: this.anims.generateFrameNumbers(KEYBOARD_SPRITE_KEY, {
        frames: [21, 77],
      }),
      frameRate: 1,
      repeat: -1,
    });

    this.add
      .text(this.scale.width / 2 - 150, this.scale.height / 2 + 60, 'Movement', {
        fontSize: 24,
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(this.scale.width / 2 + 190, this.scale.height / 2 + 50, 'Attack', {
        fontSize: 24,
      })
      .setOrigin(0, 0.5);

    this.add
      .text(this.scale.width / 2 + 190, this.scale.height / 2 - 50, 'Toggle Fullscreen', {
        fontSize: 24,
      })
      .setOrigin(0, 0.5);
  }

  private keyboardCallback(event: KeyboardEvent) {
    if (event.key !== 'f') {
      this.input.keyboard!.off('keydown');
      this.scene.start(SceneKeys.PRELOAD);
    }
  }

  private createSceneTransition() {
    this.input.manager.enabled = true;
    this.input.keyboard!.on('keydown', this.keyboardCallback, this);

    this.time.delayedCall(2000, () => {
      const clickText = this.add
        .text(this.scale.width / 2, this.scale.height / 2 + 200, 'Press any button to continue', {
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
    });
  }

  create() {
    console.log(this.input.keyboard);
    this.cameras.main.setBackgroundColor('#000');
    GlobalInputManager.init();
    this.createKeyAnimations();
    this.createSceneTransition();
  }

  update() {
    this.w.anims.play('w_key', true);
    this.a.anims.play('a_key', true);
    this.s.anims.play('s_key', true);
    this.d.anims.play('d_key', true);
    this.j.anims.play('j_key', true);
    this.f.anims.play('f_key', true);
  }
}
