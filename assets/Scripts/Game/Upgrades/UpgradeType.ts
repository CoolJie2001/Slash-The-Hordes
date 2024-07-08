
export enum UpgradeType {
    WeaponLength = "WEAPON_LENGTH",
    WeaponDamage = "WEAPON_DAMAGE",
    HorizontalProjectile = "HORIZONTAL_PROJECTILE",
    DiagonalProjectile = "DIAGONAL_PROJECTILE",
    HaloProjectlie = "HALO_PROJECTILE",
    Regeneration = "REGENERATION",
    RotatingBlade = "ROTATING_BLADE"
}

export enum MetaUpgradeType {
    Health = "META_HEALTH",
    OverallDamage = "META_OVERALL_DAMAGE",
    ProjectilePiercing = "META_PROJECTILE_PIERCING",
    MovementSpeed = "META_MOVEMENT_SPEED",
    XPGatherer = "META_XP_GATHERER",
    GoldGatherer = "META_GOLD_GATHERER",
}

/**
 * 允许升级的技能类别
 */
export enum SkillUpgradeType {
    /**
     * 旋风刃技能
     */
    RotatingBlade = 1
}