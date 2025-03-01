import { RegistryKeys } from '@constants/game';
import { InvisibleFloor } from '@sprites/InvisibleFloor';

export class WorldContainer extends Phaser.GameObjects.Container {
  public floor: InvisibleFloor;

  constructor(scene: Phaser.Scene, children: Phaser.GameObjects.GameObject[] = []) {
    super(scene, 0, 0, children);

    this.scene.add.existing(this);
    this.setDepth(1);

    // TODO: Solve the problem with this.scene === undefined in updatePosition after restarting the Game scene
    this.scene.events.on('updateWorldCoordX', () => this.updatePosition(scene), this);
  }

  private updatePosition(scene: Phaser.Scene) {
    this.x = -scene.registry.get(RegistryKeys.WORLD_COORD_X) * 1.3;
  }
}
