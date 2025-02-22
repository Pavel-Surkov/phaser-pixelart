import { RegistryKeys } from '@constants/game';

export class WorldContainer extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, children: Phaser.GameObjects.GameObject[]) {
    super(scene, 0, 0, [...children]);

    this.scene.add.existing(this);
    this.scene.events.on('updateWorldCoordX', this.updatePosition, this);
    this.setDepth(1);
  }

  updatePosition() {
    this.x = -this.scene.registry.get(RegistryKeys.WORLD_COORD_X) * 1.3;
  }
}
