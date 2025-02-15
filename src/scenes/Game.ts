import { Scene } from 'phaser';
import { Player, PlayerSprites } from '@sprites/Player';

// TODO: Add HUD with a witch gif

export class Game extends Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  public platforms: Phaser.Physics.Arcade.StaticGroup;
  public player: Player;
  public gameOver = false;

  init() {
    this.gameOver = false;
  }

  preload() {
    const { load } = this;

    load.setPath('assets');

    load.image('background', 'bg.png');
    load.image('logo', 'logo.png');
    load.image('ground', 'platform.png');

    load.spritesheet(PlayerSprites.IDLE, './witch/B_witch_idle.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    load.spritesheet(PlayerSprites.RUN, './witch/B_witch_run.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(512, 384, 'background');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(450, 568, 'ground').setScale(3).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.cameras.main.setBounds(0, -500, 1024, 2048, true);

    const logoPlatform = this.physics.add.staticGroup();
    logoPlatform
      .create(512, 100, 'logo')
      .setDepth(100)
      .setScale(0.9)
      .refreshBody();

    this.player = new Player(this, 100, 450);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, logoPlatform);
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
  }
}
