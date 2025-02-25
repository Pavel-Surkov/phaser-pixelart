import { Player } from '@sprites/Player';
import { Foreground } from '@groups/foreground';
import { InvisibleFloor } from '@sprites/InvisibleFloor';
import { GlobalEvents, RegistryKeys, SceneKeys } from '@constants/game';
import { loadAssets } from '@functions/loadAssets';
import { Enemies } from '@groups/enemies';
import { EnemyTypes } from '@constants/enemies';
import { WorldContainer } from '@containers/WorldContainer';
import { Background } from '@groups/background';

export class Game extends Phaser.Scene {
  public player: Player;
  private enemies: Enemies;
  private worldContainer: WorldContainer;
  private floor: InvisibleFloor;
  public layer: Phaser.GameObjects.Layer;
  private scoreText: Phaser.GameObjects.Text;

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
    this.cameras.main.fadeIn(1000, 0, 0, 0, () => this.scene.remove(SceneKeys.Tutorial), this);
    this.sound.add('loop', { loop: true }).play();
    this.registry.set(RegistryKeys.WORLD_COORD_X, 0);

    this.scoreText = this.add.text(this.scale.width / 2, 100, '0', { fontFamily: 'silver', fontSize: 80 }).setDepth(5);
    this.events.on(GlobalEvents.SCORE_INC, () => this.scoreText.setText(String(+this.scoreText.text + 1)), this);

    new Background(this);
    new Foreground(this);
    this.floor = new InvisibleFloor(this);
    this.enemies = new Enemies(this.physics.world, this);
    this.worldContainer = new WorldContainer(this, [...this.enemies.getChildren()]);

    this.player = new Player(this, this.scale.width / 2, 450, this.enemies);
    this.physics.add.collider(this.player, this.floor);

    // TODO: Move this to a custom method
    const newEnemy = this.enemies.addEnemy(EnemyTypes.SKELETON, this.scale.width / 2.75, 550, this.player, [
      this.floor,
    ]);
    this.worldContainer.add(newEnemy);
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
    this.enemies.getChildren().forEach((child) => child.update());
  }
}
