export enum PlayerStates {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  IMMOVABLE = 'IMMOVABLE',
}

export enum PlayerSprites {
  IDLE = 'player_idle',
  RUN = 'player_run',
  DEATH = 'player_death',
  CHARGE = 'player_charge',
  ATTACK = 'player_attack',
  ICON = 'player_icon',
}

export enum PlayerAnims {
  IDLE = 'idle',
  RUN = 'run',
  CHARGE = 'charge',
  ATTACK = 'attack',
}

export type CustomCursorKeys = {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  attack: Phaser.Input.Keyboard.Key;
};
