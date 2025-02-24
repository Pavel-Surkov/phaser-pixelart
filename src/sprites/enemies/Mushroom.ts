import { EnemyAnims, EnemyStates, MushroomSprites } from '@constants/enemies';
import { Enemy } from './Enemy';

export class Mushroom extends Enemy {
  public velocityX = 150;
  public attackRange = 60;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, {
      idle: MushroomSprites.IDLE,
      run: MushroomSprites.RUN,
      attack: MushroomSprites.ATTACK,
      death: MushroomSprites.DEATH,
    });

    this.configureBody();
    this.configureHitArea();

    this.on(Phaser.Animations.Events.ANIMATION_START, this.onAnimationStart, this);
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.onAnimationComplete, this);
  }

  private configureBody() {
    this.setSize(24, 36).setScale(1.6);
    this.body?.setOffset(this.width / 2 - this.body.halfWidth, this.height / 2 - this.body.halfHeight + 10);
    this.refreshBody();
  }

  private configureHitArea() {
    if (!this.body) return;

    this.hitArea = this.scene.add.rectangle(
      this.body.x + this.body.halfWidth,
      this.body.y,
      this.body.width * 1.8,
      this.body.height
    ) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    this.hitArea.setOrigin(0, 0);
    this.addPhysicsAndHideHitArea();
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

  update() {
    this.hitArea.x = this.body!.x + this.body!.halfWidth;
    this.hitArea.y = this.body!.y;

    super.update(this.velocityX);
  }
}
