import { MaxFloorPanels } from '@constants/game';

export class InvisibleFloor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      scene.scale.width / 2,
      scene.scale.height - 24,
      // @ts-ignore Empty texture
      undefined
    );

    scene.physics.add.existing(this, true);

    this.setVisible(false);
    this.body?.setSize(this.scene.scale.width * MaxFloorPanels, 40);
    this.setDebug(false, false, 0x000);
  }
}
