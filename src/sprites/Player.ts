export class Player extends Phaser.Physics.Arcade.Sprite {
  cursor: Phaser.Types.Input.Keyboard.CursorKeys;
  dead: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'hero');

    this.scene = scene;

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setDepth(1);
    this.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNames('hero', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNames('hero', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'hero', frame: 4 }],
      frameRate: 20,
    });

    this.scene.cameras.main.startFollow(this, false, 0.1, 0.1);

    this.cursor = this.scene.input.keyboard!.createCursorKeys();
  }

  die() {
    this.dead = true;

    this.anims.play('turn');
    this.anims.stop();

    this.setTint(0xff0000);
    this.setImmovable(true);

    this.scene.physics.world.disable(this);
  }

  update() {
    if (this.dead) {
      return;
    }

    if (this.cursor.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play('left', true);
    } else if (this.cursor.right.isDown) {
      this.setVelocityX(160);
      this.anims.play('right', true);
    } else {
      this.setVelocityX(0);
      this.anims.play('turn');
    }

    if (this.cursor.up.isDown && this.body?.touching.down) {
      this.setVelocityY(-330);
    }
  }
}
