import { EnemyStates, EnemyAnims, GoblinSprites } from '@constants/enemies';
import { RegistryKeys } from '@constants/game';
import { Enemy } from './Enemy';

export class Goblin extends Enemy {
  public velocityX = 150;
  public initialPosition: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, GoblinSprites.IDLE, {
      idle: GoblinSprites.IDLE,
      run: GoblinSprites.RUN,
      attack: GoblinSprites.ATTACK,
    });

    this.initialPosition = x;

    this.configureBody();
    this.configureHitArea();

    this.anims.play(EnemyAnims.IDLE, true);

    this.on(Phaser.Animations.Events.ANIMATION_START, this.onAnimationStart, this);
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.onAnimationComplete, this);
  }

  private configureBody() {
    this.setSize(24, 32).setScale(1.6);
    this.body?.setOffset(this.width / 2 - this.body.halfWidth, this.height / 2 - this.body.halfHeight + 10);

    this.refreshBody();
  }

  // TODO: Set private / public methods for all classes
  private configureHitArea() {
    if (!this.body) return;

    this.hitArea = this.scene.add.rectangle(
      this.body.x + this.body.halfWidth,
      this.body.y + this.body.halfHeight,
      this.body.width * 3.7,
      this.body.height
    ) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    this.scene.physics.world.enable(this.hitArea);
    this.hitArea.body.allowGravity = false;
    this.hitArea.body.enable = false;
    this.hitArea.visible = false;
    this.scene.physics.world.remove(this.hitArea.body);
  }

  private startHit(_: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) {
    if (frame.index < 6) {
      return;
    }

    this.off(Phaser.Animations.Events.ANIMATION_UPDATE, this.startHit);

    this.hitArea.body.enable = true;
    this.scene.physics.world.add(this.hitArea.body);
  }

  private onAnimationStart(animation: Phaser.Animations.Animation) {
    if (animation.key === EnemyAnims.ATTACK) {
      this.on(Phaser.Animations.Events.ANIMATION_UPDATE, this.startHit);
    }
  }

  private onAnimationComplete(animation: Phaser.Animations.Animation) {
    if (animation.key === EnemyAnims.ATTACK) {
      super.setState(EnemyStates.ALIVE);
      this.hitArea.body.enable = false;
      this.scene.physics.world.remove(this.hitArea.body);
    }
  }

  die() {
    this.hitArea.destroy();
    super.die();
  }

  update() {
    super.update(this.velocityX);
  }
}
