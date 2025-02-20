import { Player } from '@sprites/Player';
import { Foreground } from '@groups/foreground';
import { InvisibleFloor } from '@sprites/InvisibleFloor';
import { RegistryKeys, SceneKeys } from '@constants/game';
import { loadAssets } from '@functions/loadAssets';
import { Enemies } from '@groups/enemies';
import { EnemyTypes } from '@constants/enemies';
import { WorldContainer } from '@containers/WorldContainer';
import { Background } from '@groups/background';
import { Goblin } from '@sprites/enemies/Goblin';

export class Game extends Phaser.Scene {
  public player: Player;
  private enemies: Enemies;
  private worldContainer: WorldContainer;
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

    new Background(this);
    new Foreground(this);
    this.player = new Player(this, this.scale.width / 2, 450);
    this.floor = new InvisibleFloor(this);
    this.physics.add.collider(this.player, this.floor);

    this.enemies = new Enemies(this.physics.world, this).setDepth(10);
    this.enemies.addEnemy(EnemyTypes.GOBLIN, this.scale.width / 2.75, 550, [this.floor]);

    // const g = new Goblin(this, 650, 450);
    // this.physics.add.collider(g, this.floor);

    this.worldContainer = new WorldContainer(this, this.enemies.getChildren());
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
    // this.enemies.getChildren().forEach((child) => child.update());
  }
}
