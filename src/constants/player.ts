export enum PlayerStates {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  IMMOVABLE = 'IMMOVABLE',
}

export enum PlayerSprites {
  IDLE = 'player_sprite_idle',
  RUN = 'player_sprite_run',
  DEATH = 'player_sprite_death',
  CHARGE = 'player_sprite_charge',
  ATTACK = 'player_sprite_attack',
  ICON = 'player_sprite_icon',
}

export enum PlayerAnims {
  IDLE = 'player_idle',
  RUN = 'player_run',
  CHARGE = 'player_charge',
  ATTACK = 'player_attack',
  DEATH = 'player_death',
}

export type CustomCursorKeys = {
  prUp: Phaser.Input.Keyboard.Key;
  secUp: Phaser.Input.Keyboard.Key;
  prLeft: Phaser.Input.Keyboard.Key;
  secLeft: Phaser.Input.Keyboard.Key;
  prRight: Phaser.Input.Keyboard.Key;
  secRight: Phaser.Input.Keyboard.Key;
  attack: Phaser.Input.Keyboard.Key;
};
