import { Player } from '@sprites/Player';
import { Background } from '@groups/background';
import { Foreground } from '@groups/foreground';
import { InvisibleFloor } from '@sprites/InvisibleFloor';
import { RegistryKeys, SceneKeys } from '@constants/game';
import { loadAssets } from '@functions/loadAssets';
import { Goblin } from '@sprites/Goblin';

export class Game extends Phaser.Scene {
  public player: Player;
  private enemies: Phaser.Physics.Arcade.Group;
  private floor: InvisibleFloor;
  // Replace with enemies group
  public gameOver = false;

  public layer: Phaser.GameObjects.Layer;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({
      ...config,
      plugins: {
        global: [
          {
            key: 'EventEmitter',
            plugin: Phaser.Events.EventEmitter,
            mapping: 'events',
          },
        ],
      },
    });
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

    this.enemies = this.physics.add.group();

    // TODO: Remove this
    this.layer = this.add.layer();
    this.layer.add([
      ...background.getChildren(),
      this.player,
      ...foreground.getChildren(),
    ]);

    this.physics.add.collider(this.player, this.floor);

    this.addGoblin(100, 450);
  }

  addGoblin(x: number, y: number) {
    const goblin = new Goblin(this, x, y);
    goblin.setInteractive().refreshBody();
    this.physics.add.collider(this.player, goblin);

    // TODO: Do it via collision layers
    this.physics.add.collider(this.floor, goblin);
    this.enemies.add(goblin);
    this.layer.addAt(goblin, this.layer.length - 1);
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
    this.enemies.getChildren().forEach((child) => child.update());
  }
}
