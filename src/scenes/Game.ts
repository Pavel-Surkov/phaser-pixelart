import { Player } from '@sprites/Player';
import { Background } from '@groups/background';
import { Foreground } from '@groups/foreground';
import { InvisibleFloor } from '@sprites/InvisibleFloor';
import { RegistryKeys, SceneKeys } from '@constants/game';
import { loadAssets } from '@functions/loadAssets';
import { Enemies } from '@groups/enemies';
import { EnemyTypes } from '@constants/enemies';

export class Game extends Phaser.Scene {
  public player: Player;
  private enemies: Enemies;
  private floor: InvisibleFloor;
  public layer: Phaser.GameObjects.Layer;

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

    const background = new Background(this);
    const foreground = new Foreground(this);
    this.player = new Player(this, this.scale.width / 2, 450);
    this.floor = new InvisibleFloor(this);

    this.enemies = new Enemies(this.physics.world, this);
    this.enemies.addEnemy(EnemyTypes.GOBLIN, this.scale.width / 2, 550, [
      this.player,
      this.floor,
    ]);

    // TODO: Remove this
    this.layer = this.add.layer();
    this.layer.add([
      ...background.getChildren(),
      this.player,
      ...foreground.getChildren(),
    ]);

    this.physics.add.collider(this.player, this.floor);
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
    this.enemies.getChildren().forEach((child) => child.update());
  }
}
