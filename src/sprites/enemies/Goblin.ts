import { EnemyAnims, EnemyStates, GoblinSprites } from '@constants/enemies';
import { Enemy } from './Enemy';

export class Goblin extends Enemy {
  public velocityX = 150;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, {
      idle: GoblinSprites.IDLE,
      run: GoblinSprites.RUN,
      attack: GoblinSprites.ATTACK,
    });

    this.configureBody();
    this.configureHitArea();

    this.on(Phaser.Animations.Events.ANIMATION_START, this.onAnimationStart, this);
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.onAnimationComplete, this);
  }

  private configureBody() {
    this.setSize(24, 32).setScale(1.6);
    this.body?.setOffset(this.width / 2 - this.body.halfWidth, this.height / 2 - this.body.halfHeight + 10);
    this.refreshBody();
  }

  private configureHitArea() {
    if (!this.body) return;

    this.hitArea = this.scene.add.rectangle(
      this.body.x + this.body.halfWidth,
      this.body.y + this.body.halfHeight,
      this.body.width * 3.7,
      this.body.height
    ) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    this.addPhysicsAndHideHitArea();
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

  update() {
    this.hitArea.x = this.body!.x + this.body!.halfWidth;
    this.hitArea.y = this.body!.y + this.body!.halfHeight;

    super.update(this.velocityX);
  }
}
