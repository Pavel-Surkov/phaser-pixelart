import { Scene } from 'phaser';

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  platforms: Phaser.Physics.Arcade.StaticGroup;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  stars: Phaser.Physics.Arcade.Group;
  bombs: Phaser.Physics.Arcade.Group;

  scoreText: Phaser.GameObjects.Text;
  score = 0;
  gameOver = false;

  preload() {
    this.load.setPath('assets');

    this.load.image('background', 'bg.png');
    this.load.image('logo', 'logo.png');
    this.load.image('ground', 'platform.png');
    this.load.image('star', 'star.png');
    this.load.image('bomb', 'bomb.png');
    this.load.spritesheet('hero', 'dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(512, 384, 'background');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(450, 568, 'ground').setScale(3).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.cameras.main.setBounds(0, -500, 1024, 2048, true);

    const logoPlatform = this.physics.add.staticGroup();
    logoPlatform
      .create(512, 100, 'logo')
      .setDepth(100)
      .setScale(0.9)
      .refreshBody();

    this.player = this.physics.add.sprite(100, 450, 'hero');

    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player, false, 0.1, 0.1);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, logoPlatform);

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

    this.cursorKeys = this.input.keyboard!.createCursorKeys();

    this.createStars();

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      undefined,
      this
    );

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '32px',
      color: '#000',
    });
  }

  hitBomb() {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.gameOver = true;
  }

  createStars() {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 14,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((star) => {
      (star as Phaser.Types.Physics.Arcade.SpriteWithStaticBody).setBounceY(
        Phaser.Math.FloatBetween(0.4, 0.8)
      );
      return true;
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this
    );
  }

  collectStar(
    ...args: Parameters<Phaser.Types.Physics.Arcade.ArcadePhysicsCallback>
  ) {
    args[1].destroy();

    this.score += 1;
    this.scoreText.setText(`Score:${this.score}`);

    if (this.stars.countActive(true) === 0) {
      this.createStars();

      const x =
        this.player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  update() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursorKeys.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
