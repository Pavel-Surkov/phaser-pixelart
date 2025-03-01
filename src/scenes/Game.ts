import { Player } from '@sprites/Player';
import { Foreground } from '@groups/foreground';
import { InvisibleFloor } from '@sprites/InvisibleFloor';
import { GlobalEvents, RegistryKeys, SceneKeys } from '@constants/game';
import { Enemies } from '@groups/enemies';

import { Background } from '@groups/background';

export class Game extends Phaser.Scene {
  private enemies: Enemies;
  private scoreText: Phaser.GameObjects.Text;

  public player: Player;
  public floor: InvisibleFloor;
  public layer: Phaser.GameObjects.Layer;
  public gameOver = false;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  init() {
    this.registry.set(RegistryKeys.GAME_OVER, false);
    this.registry.set(RegistryKeys.WORLD_COORD_X, 0);

    // TODO: Fix sound
    this.sound.pauseAll();
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0, () => this.scene.remove(SceneKeys.TUTORIAL), this);
    this.sound.add('loop', { loop: true }).play();
    this.registry.set(RegistryKeys.WORLD_COORD_X, 0);

    this.scoreText = this.add.text(this.scale.width / 2, 100, '0', { fontFamily: 'silver', fontSize: 80 }).setDepth(5);
    this.events.on(GlobalEvents.SCORE_INC, () => this.scoreText.setText(String(+this.scoreText.text + 1)), this);

    new Background(this);
    new Foreground(this);
    this.floor = new InvisibleFloor(this);
    this.enemies = new Enemies(this, [this.floor]);

    this.player = new Player(this, this.scale.width / 2, 450, this.enemies);
    this.physics.add.collider(this.player, this.floor);
    this.enemies.bindAttack(this.player);
  }

  update() {
    if (this.registry.get(RegistryKeys.GAME_OVER)) return;

    this.player.update();
    this.enemies.getChildren().forEach((child) => child.update());
  }
}
