import { RegistryKeys } from '@constants/game';
import { CustomCursorKeys, PlayerAnims, PlayerSprites, PlayerStates } from '@constants/player';
import Phaser from 'phaser';
import { Enemy } from './enemies/Enemy';
import { Enemies } from '@groups/enemies';

// TODO: Add mobs and counter above the player to count monsters killed
// In future:
// 1. Add input for user to type a name and save it in localStorage
// 2. Add backend with leaderboard and show to user after each try

export class Player extends Phaser.Physics.Arcade.Sprite {
  private velocityX = 180;
  private velocityY = 320;
  private cursor: CustomCursorKeys;

  private hitArea: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor(scene: Phaser.Scene, x: number, y: number, enemies: Enemies) {
    super(scene, x, y, PlayerSprites.IDLE);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setState(PlayerStates.ALIVE);

    this.configureBody();
    this.createAnimations();
    this.configureHitArea();

    this.scene.physics.add.overlap(
      enemies.getChildren(),
      this.hitArea,
      (enemy) => (enemy as Enemy).die(),
      undefined,
      this
    );

    scene.cameras.main.startFollow(this, false, 0.1, 0.1);
    scene.cameras.main.setDeadzone(0, 0);
    scene.cameras.main.setBounds(0, 0, scene.scale.width, scene.scale.height, true);

    this.cursor = scene.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      attack: Phaser.Input.Keyboard.KeyCodes.J,
    }) as CustomCursorKeys;
  }

  private configureBody() {
    this.setCollideWorldBounds(true).setInteractive().setScale(2).setBodySize(16, 32).refreshBody().setDepth(1);
  }

  private configureHitArea() {
    this.hitArea = this.scene.add.rectangle(
      this.x + 92,
      this.y,
      130,
      60
    ) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    this.scene.physics.world.enable(this.hitArea);
    this.hitArea.body.allowGravity = false;
    this.hitArea.body.enable = false;
    this.hitArea.visible = false;
    this.scene.physics.world.remove(this.hitArea.body);
  }

  private createAnimations() {
    this.anims.create({
      key: PlayerAnims.RUN,
      frames: this.anims.generateFrameNames(PlayerSprites.RUN),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: PlayerAnims.IDLE,
      frames: this.anims.generateFrameNames(PlayerSprites.IDLE),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: PlayerAnims.CHARGE,
      frames: this.anims.generateFrameNames(PlayerSprites.CHARGE),
      frameRate: 10,
    });

    this.anims.create({
      key: PlayerAnims.ATTACK,
      frames: this.anims.generateFrameNames(PlayerSprites.ATTACK),
      frameRate: 12,
    });

    this.scene.anims.create({
      key: 'hero_icon',
      frames: this.anims.generateFrameNames(PlayerSprites.ICON),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.add.sprite(60, 60, 'hero_icon').setScale(1.5).setDepth(2).play('hero_icon');

    this.on(Phaser.Animations.Events.ANIMATION_START, this.onAnimationStart, this);
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.onAnimationComplete, this);
  }

  private startHit(_: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) {
    if (frame.index < 5) {
      return;
    }

    this.off(Phaser.Animations.Events.ANIMATION_UPDATE, this.startHit);

    this.hitArea.x = this.flipX ? this.x - this.body!.width * 3 : this.x + this.body!.width * 3;
    this.hitArea.y = this.y;
    this.hitArea.body.enable = true;
    this.scene.physics.world.add(this.hitArea.body);
  }

  private onAnimationStart(animation: Phaser.Animations.Animation) {
    if (animation.key === PlayerAnims.CHARGE) {
      this.body?.setOffset(this.body.halfWidth, 10);
      this.setState(PlayerStates.IMMOVABLE);
    } else if (animation.key === PlayerAnims.ATTACK) {
      // Change ofset & origin for Player to stay at one place
      if (this.flipX) {
        this.body?.setOffset(this.width - this.body.width + 4, 10);
        this.setOrigin(0.81, 0.5).refreshBody();
      } else {
        this.body?.setOffset(12, 10);
        this.setOrigin(0.19, 0.5).refreshBody();
      }

      this.on(Phaser.Animations.Events.ANIMATION_UPDATE, this.startHit);
    } else {
      this.body?.setOffset(8, 10);
      this.setState(PlayerStates.ALIVE);
    }
  }

  private onAnimationComplete(animation: Phaser.Animations.Animation) {
    if (animation.key === PlayerAnims.CHARGE) {
      this.anims.play(PlayerAnims.ATTACK);
    }
    if (animation.key === PlayerAnims.ATTACK) {
      this.setOrigin(0.5, 0.5);
      this.setState(PlayerStates.ALIVE);

      this.hitArea.body.enable = false;
      this.scene.physics.world.remove(this.hitArea.body);
    }
  }

  public killEnemy(enemy: Enemy) {
    enemy.die();
  }

  private die() {
    this.setState(PlayerStates.DEAD);
    this.setTint(0xff0000);
    this.setImmovable(true);

    this.hitArea.destroy();

    this.anims.play(PlayerAnims.IDLE);
    this.anims.stop();

    this.scene.physics.world.disable(this);
  }

  public update() {
    if (this.state === PlayerStates.DEAD) {
      return;
    }

    if (this.cursor.attack.isDown && this.body?.touching.down && this.state === PlayerStates.ALIVE) {
      this.anims.play(PlayerAnims.CHARGE, true);
      this.setState(PlayerStates.IMMOVABLE);
      return;
    }

    this.calcMovement();
  }

  private calcMovement() {
    if (this.state === PlayerStates.IMMOVABLE) {
      return;
    }

    if (this.cursor.left.isDown) {
      this.anims.play(PlayerAnims.RUN, true);
      this.setFlipX(true);

      this.scene.registry.inc(
        RegistryKeys.WORLD_COORD_X,
        Math.round((-this.velocityX * this.scene.game.loop.delta) / 1000)
      );
      this.scene.events.emit('updateWorldCoordX', false);
    } else if (this.cursor.right.isDown) {
      this.anims.play(PlayerAnims.RUN, true);
      this.setFlipX(false);

      this.scene.registry.inc(
        RegistryKeys.WORLD_COORD_X,
        Math.round((this.velocityX * this.scene.game.loop.delta) / 1000)
      );
      this.scene.events.emit('updateWorldCoordX', true);
    } else {
      this.anims.play(PlayerAnims.IDLE, true);
    }

    if (this.cursor.up.isDown && this.body?.touching.down) {
      this.setVelocityY(-this.velocityY);
    }
  }
}
