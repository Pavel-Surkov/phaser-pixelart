import { Scene } from 'phaser';
import { Player, PlayerSprites } from '@sprites/Player';
import { Background } from '@groups/background';
import { Foreground } from '@groups/foreground';
import { InvisibleFloor } from '@sprites/InvisibleFloor';

// TODO: Add HUD with a witch gif

export enum BgLayers {
  ZERO = 'background_0',
  ONE = 'background_1',
  TWO = 'background_2',
  THREE = 'background_3',
  FOUR = 'background_4',
  FIVE = 'background_5',
  SIX = 'background_6',
  SEVEN = 'background_7',
  EIGHT = 'background_8',
  NINE = 'background_9',
  LIGHT_ONE = 'background_lights_1',
  LIGHT_TWO = 'background_lights_2',
}

export type CustomCursorKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
};

export class Game extends Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  private cursor: CustomCursorKeys;

  private background: Background;
  private foreground: Foreground;

  public player: Player;
  public gameOver = false;

  loadBackgroundAssets() {
    const { load } = this;

    load.image(BgLayers.ZERO, '/background/Layer_0011_0.png');
    load.image(BgLayers.ONE, '/background/Layer_0010_1.png');
    load.image(BgLayers.TWO, '/background/Layer_0009_2.png');
    load.image(BgLayers.THREE, '/background/Layer_0008_3.png');
    load.image(BgLayers.LIGHT_ONE, '/background/Layer_0007_Lights.png');
    load.image(BgLayers.FOUR, '/background/Layer_0006_4.png');
    load.image(BgLayers.FIVE, '/background/Layer_0005_5.png');
    load.image(BgLayers.LIGHT_TWO, '/background/Layer_0004_Lights.png');
    load.image(BgLayers.SIX, '/background/Layer_0003_6.png');
    load.image(BgLayers.SEVEN, '/background/Layer_0002_7.png');
    load.image(BgLayers.EIGHT, '/background/Layer_0001_8.png');
    load.image(BgLayers.NINE, '/background/Layer_0000_9.png');
  }

  init() {
    this.gameOver = false;
  }

  preload() {
    const { load } = this;

    load.setPath('assets');

    this.loadBackgroundAssets();
    load.audio('loop', '/audio/loop.ogg');
    load.image('logo', 'logo.png');

    load.spritesheet(PlayerSprites.ICON, '/witch/B_witch_icon.webp', {
      frameWidth: 50,
      frameHeight: 50,
    });
    load.spritesheet(PlayerSprites.IDLE, '/witch/B_witch_idle.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    load.spritesheet(PlayerSprites.RUN, '/witch/B_witch_run.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.sound.play('loop');
    this.add.image(this.scale.width / 2, 100, 'logo').setDepth(100);

    this.background = new Background(this);
    this.player = new Player(this, this.scale.width / 2, 450);
    this.foreground = new Foreground(this);

    const layer = this.add.layer();
    layer.add([
      ...this.background.getChildren(),
      this.player,
      ...this.foreground.getChildren(),
    ]);

    const invisibleFloor = new InvisibleFloor(this);
    this.physics.add.collider(this.player, invisibleFloor);

    this.cursor = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as CustomCursorKeys;
  }

  update() {
    if (this.gameOver) return;

    this.background.update(this.cursor);
    this.player.update(this.cursor);
    this.foreground.update(this.cursor);
  }
}
