export class Bomb extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bomb');
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    // All bombs will be rotating
    this.rotation += 0.01;
  }
}

// TODO: Figure out how to make it work with typescript
Phaser.GameObjects.GameObjectFactory.register(
  'bomb',
  function (x: number, y: number) {
    // @ts-ignore
    return this.displayList.add(new Bomb(this.scene, x, y));
  }
);
