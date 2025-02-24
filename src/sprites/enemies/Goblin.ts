import { EnemyStates, GoblinAnims, GoblinSprites } from '@constants/enemies';
import { RegistryKeys } from '@constants/game';
import { Enemy } from './Enemy';

export class Goblin extends Enemy {
  public velocityX = 150;
  public initialPosition: number;
  private hitArea: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, GoblinSprites.IDLE);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.initialPosition = x;

    this.configureBody();
    this.createAnimations();
    this.configureHitArea();

    this.anims.play(GoblinAnims.IDLE, true);

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

  private createAnimations() {
    this.anims.create({
      key: GoblinAnims.IDLE,
      frames: this.anims.generateFrameNames(GoblinSprites.IDLE),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: GoblinAnims.RUN,
      frames: this.anims.generateFrameNames(GoblinSprites.RUN),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: GoblinAnims.ATTACK,
      frames: this.anims.generateFrameNames(GoblinSprites.ATTACK),
      frameRate: 10,
    });
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
    if (animation.key === GoblinAnims.ATTACK) {
      this.on(Phaser.Animations.Events.ANIMATION_UPDATE, this.startHit);
    }
  }

  private onAnimationComplete(animation: Phaser.Animations.Animation) {
    if (animation.key === GoblinAnims.ATTACK) {
      this.setState(EnemyStates.ALIVE);
      this.hitArea.body.enable = false;
      this.scene.physics.world.remove(this.hitArea.body);
    }
  }

  die() {
    this.hitArea.destroy();
    super.die();
  }

  update() {
    if (this.body) {
      this.hitArea.x = this.body.x + this.body.halfWidth;
      this.hitArea.y = this.body.y + this.body.halfHeight;
    }

    if (this.state === EnemyStates.IMMOVABLE) {
      return;
    }

    // TODO: move some of the logic to Enemy class
    const worldCoordX = this.scene.registry.get(RegistryKeys.WORLD_COORD_X);
    const playerRelativePosX = this.scene.scale.width / 2 + worldCoordX * 1.3 - this.x;

    const lookDirection = playerRelativePosX > 0 ? 'right' : 'left';
    const runDirection = Math.abs(playerRelativePosX) - 60 <= 0 ? 'none' : playerRelativePosX > 0 ? 'right' : 'left';
    this.setVelocityX(runDirection === 'right' ? this.velocityX : runDirection === 'left' ? -this.velocityX : 0);

    if (runDirection === 'none') {
      this.setState(EnemyStates.IMMOVABLE);
      this.anims.play(GoblinAnims.ATTACK);
    } else {
      this.calcMovement(runDirection, lookDirection);
    }
  }

  private calcMovement(runDirection: 'left' | 'right' | 'none', lookDirection: 'left' | 'right') {
    if (lookDirection === 'left') {
      this.flipX = true;
    } else {
      this.flipX = false;
    }

    if (runDirection === 'left') {
      this.anims.play(GoblinAnims.RUN, true);
      this.flipX = true;
    } else if (runDirection === 'right') {
      this.anims.play(GoblinAnims.RUN, true);
      this.flipX = false;
    }
  }
}
