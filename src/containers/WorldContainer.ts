import { RegistryKeys } from '@constants/game';
import { InvisibleFloor } from '@sprites/InvisibleFloor';

export class WorldContainer extends Phaser.GameObjects.Container {
  public floor: InvisibleFloor;

  constructor(scene: Phaser.Scene, children: Phaser.GameObjects.GameObject[] = []) {
    super(scene, 0, 0, children);

    this.scene.add.existing(this);
    this.setDepth(1);

    this.scene.events.on('updateWorldCoordX', this.updatePosition, this);
  }

  // TODO: Solve the problem with this.scene === undefined
  private updatePosition() {
    this.x = -this.scene.registry.get(RegistryKeys.WORLD_COORD_X) * 1.3;
  }
}
