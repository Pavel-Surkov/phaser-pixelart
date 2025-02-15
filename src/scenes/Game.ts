import { Scene } from 'phaser';
import { Player, PlayerSprites } from '@sprites/Player';
import { GameData } from '@constants/game';

// TODO: Add HUD with a witch gif

export class Game extends Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  public player: Player;
  public gameOver = false;

  init() {
    this.gameOver = false;
  }

  preload() {
    const { load } = this;

    load.setPath('assets');

    load.image('sky', 'sky.png');
    load.image('logo', 'logo.png');

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
    const skyImage = this.add.image(
      GameData.width / 2,
      GameData.height / 2,
      'sky'
    );
    skyImage.setScale(GameData.width / skyImage.width);

    this.cameras.main.setBounds(0, 0, GameData.width, GameData.height, true);

    this.add.image(GameData.width / 2, 100, 'logo');

    this.player = new Player(this, 100, 450);

    // this.physics.add.collider(this.player, this.platforms);
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
  }
}
