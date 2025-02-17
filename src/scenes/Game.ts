import { Player } from '@sprites/Player';
import { Background } from '@groups/background';
import { Foreground } from '@groups/foreground';
import { InvisibleFloor } from '@sprites/InvisibleFloor';
import { RegistryKeys, SceneKeys } from '@constants/game';
import { loadAssets } from '@functions/loadAssets';
import { Goblin } from '@sprites/Goblin';

export class Game extends Phaser.Scene {
  private background: Background;
  private foreground: Foreground;

  public player: Player;
  // Replace with enemies group
  public goblin: Goblin;
  public gameOver = false;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  init() {
    this.gameOver = false;
  }

  preload() {
    loadAssets(this);
  }

  create() {
    this.cameras.main.fadeIn(
      1000,
      0,
      0,
      0,
      () => {
        this.scene.remove(SceneKeys.Tutorial);
      },
      this
    );

    this.sound.add('loop', { loop: true }).play();

    this.registry.set(RegistryKeys.WORLD_COORD_X, 0);

    this.background = new Background(this);
    this.foreground = new Foreground(this);
    this.player = new Player(this, this.scale.width / 2, 450);

    this.goblin = new Goblin(this, 100, 450);

    // TODO: Remove
    const floor = new InvisibleFloor(this);

    const layer = this.add.layer();
    layer.add([
      ...this.background.getChildren(),
      this.goblin,
      this.player,
      ...this.foreground.getChildren(),
    ]);

    this.physics.add.collider(this.goblin, floor);
    this.physics.add.collider(this.player, floor);
  }

  update() {
    if (this.gameOver) return;

    this.background.update();
    this.player.update();
    this.foreground.update();
    this.goblin.update();
  }
}
