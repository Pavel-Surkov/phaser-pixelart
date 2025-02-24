import { EnemyAnims, EnemyStates, SkeletonSprites } from '@constants/enemies';
import { Enemy } from './Enemy';

export class Skeleton extends Enemy {
  public velocityX = 150;
  public initialPosition: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, {
      idle: SkeletonSprites.IDLE,
      run: SkeletonSprites.RUN,
      attack: SkeletonSprites.ATTACK,
    });

    this.initialPosition = x;

    this.configureBody();
    this.configureHitArea();

    this.anims.play(EnemyAnims.IDLE, true);

    this.on(Phaser.Animations.Events.ANIMATION_START, this.onAnimationStart, this);
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.onAnimationComplete, this);
  }

  private configureBody() {
    this.setSize(24, 52).setScale(1.6);
    this.body?.setOffset(this.width / 2 - this.body.halfWidth, this.height / 2 - this.body.halfHeight);
    this.refreshBody();
  }

  private configureHitArea() {
    if (!this.body) return;

    this.hitArea = this.scene.add.rectangle(
      this.body.x + this.body.halfWidth,
      this.body.y,
      this.body.width * 3,
      this.body.height / 1.2
    ) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    this.hitArea.setOrigin(0, 0);
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
      this.flipX ? this.hitArea.setOrigin(1, 0) : this.hitArea.setOrigin(0, 0);
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
    this.hitArea.x = this.body!.x + this.body!.halfWidth;
    this.hitArea.y = this.body!.y;

    super.update(this.velocityX);
  }
}
