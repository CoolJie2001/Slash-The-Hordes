export class GameSettings {
    public player: PlayerSettings = new PlayerSettings();
    public upgrades: UpgradeSettings = new UpgradeSettings();
}

export class PlayerSettings {
    public defaultHP = 0;
    public requiredXP: number[] = [];
    public regenerationDelay = 0;
    public collisionDelay = 0;
    public weapon: WeaponSettings = new WeaponSettings();
    public haloLauncher: HaloLauncherSettings = new HaloLauncherSettings();
}

export class WeaponSettings {
    public strikeDelay = 0;
    public damage = 0;
}

export class HaloLauncherSettings {
    public projectileLifetime = 0;
    public projectileSpeed = 0;
    public projectilesToSpawn = 0;
    public cooldown = 0;
}

export class UpgradeSettings {
    public maxWeaponLengthUpgrades = 0;
    public maxWeaponDamageUpgrades = 0;
    public maxHorizontalProjectileUpgrades = 0;
    public maxVerticalProjectileUpgrades = 0;
    public maxHaloProjectileUpgrades = 0;
    public maxRegenerationUpgrades = 0;
}
