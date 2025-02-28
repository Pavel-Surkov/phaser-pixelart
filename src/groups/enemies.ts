import { EnemyTypes } from '@constants/enemies';
import { RegistryKeys } from '@constants/game';
import { WorldContainer } from '@containers/WorldContainer';
import { Game } from '@scenes/Game';
import { Enemy } from '@sprites/enemies/Enemy';
import { FlyingEye } from '@sprites/enemies/FlyingEye';
import { Goblin } from '@sprites/enemies/Goblin';
import { Mushroom } from '@sprites/enemies/Mushroom';
import { Skeleton } from '@sprites/enemies/Skeleton';
import { Player } from '@sprites/Player';

export class Enemies extends Phaser.Physics.Arcade.Group {
  private container: Phaser.GameObjects.Container;
  private attackTarget: Phaser.GameObjects.Sprite | undefined;
  private collidesWith: Phaser.GameObjects.GameObject[];

  private spawnDelay = 2000;
  private spawnEvent: Phaser.Time.TimerEvent;

  constructor(scene: Game, collidesWith: Phaser.GameObjects.GameObject[] = []) {
    super(scene.physics.world, scene);

    this.setDepth(2);
    this.container = new WorldContainer(scene);
    this.collidesWith = collidesWith;

    this.decreaseSpawnDelay();

    // Each 10 sec spawn enemies faster
    this.scene.time.addEvent({
      delay: 10000,
      callback: () => this.decreaseSpawnDelay(),
      callbackScope: this,
      repeat: -1,
    });
  }

  private decreaseSpawnDelay() {
    if (this.spawnEvent) this.spawnEvent.remove();

    this.spawnEvent = this.scene.time.addEvent({
      delay: this.spawnDelay,
      callback: this.addEnemy,
      callbackScope: this,
      loop: true,
    });

    this.spawnDelay = Math.max(500, this.spawnDelay * 0.9);
  }

  public bindAttack(target: Phaser.GameObjects.Sprite) {
    this.attackTarget = target;
  }

  private addEnemy() {
    if (!this.attackTarget) return;

    if (this.scene.registry.get(RegistryKeys.GAME_OVER)) {
      this.spawnEvent.destroy();
      return;
    }

    const enemyTypes = Object.values(EnemyTypes);
    const enemyTypeToSpawn = enemyTypes[Phaser.Math.Between(0, enemyTypes.length - 1)];
    const spawnPositions = [-this.container.x - 250, -this.container.x + this.scene.scale.width + 250];
    const currentSpawnPos = spawnPositions[Phaser.Math.Between(0, spawnPositions.length - 1)];

    const newEnemy = this.createEnemy(enemyTypeToSpawn, currentSpawnPos, 550);

    // Bind enemy to attack Player
    if (this.attackTarget instanceof Player) {
      this.scene.physics.add.overlap(
        this.attackTarget,
        newEnemy.hitArea,
        (attackTarget) => (attackTarget as Player).die(),
        undefined,
        this
      );
    }

    this.add(newEnemy);
    this.container.add(newEnemy);

    this.collidesWith?.forEach((obj) => this.scene.physics.add.collider(newEnemy, obj));
  }

  private createEnemy(type: EnemyTypes, x: number, y: number) {
    let enemy: Enemy;

    if (type === EnemyTypes.GOBLIN) {
      enemy = new Goblin(this.scene, x, y);
    } else if (type === EnemyTypes.SKELETON) {
      enemy = new Skeleton(this.scene, x, y);
    } else if (type === EnemyTypes.MUSHROOM) {
      enemy = new Mushroom(this.scene, x, y);
    } else if (type === EnemyTypes.EYE) {
      enemy = new FlyingEye(this.scene, x, y);
    } else {
      // Default enemy sprite
      enemy = new Goblin(this.scene, x, y);
    }

    return enemy;
  }
}
