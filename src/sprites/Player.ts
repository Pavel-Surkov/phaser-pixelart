enum PlayerStates {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
}

export enum PlayerSprites {
  IDLE = 'player_idle',
  RUN = 'player_run',
  DEATH = 'player_death',
  CHARGE = 'player_charge',
}

export enum PlayerAnims {
  IDLE = 'idle',
  RUN = 'run',
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursor: Phaser.Types.Input.Keyboard.CursorKeys;

  private maxVelocityX = 250;
  private maxVelocityY = 320;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.scene = scene;

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setState(PlayerStates.ALIVE);

    this.setDepth(1);
    this.setCollideWorldBounds(true);
    this.setScale(2);

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

    this.scene.cameras.main.startFollow(this, false, 0.1, 0.1);

    this.cursor = this.scene.input.keyboard!.createCursorKeys();
  }

  die() {
    this.setState(PlayerStates.DEAD);

    this.anims.play(PlayerAnims.IDLE);
    this.anims.stop();

    this.setTint(0xff0000);
    this.setImmovable(true);

    this.scene.physics.world.disable(this);
  }

  update() {
    if (this.state === PlayerStates.DEAD) {
      return;
    }

    if (this.cursor.left.isDown) {
      this.setVelocityX(-this.maxVelocityX);
      this.anims.play(PlayerAnims.RUN, true);
      this.setFlipX(true);
    } else if (this.cursor.right.isDown) {
      this.setVelocityX(this.maxVelocityX);
      this.anims.play(PlayerAnims.RUN, true);
      this.setFlipX(false);
    } else if (this.body) {
      this.setVelocityX(this.body.velocity.x * 0.88);
      this.anims.play(PlayerAnims.IDLE, true);
    }

    if (this.cursor.up.isDown && this.body?.touching.down) {
      this.setVelocityY(-this.maxVelocityY);
    }
  }
}
