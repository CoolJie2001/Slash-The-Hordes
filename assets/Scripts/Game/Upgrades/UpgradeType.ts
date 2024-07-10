import { Enum } from "cc"

export enum UpgradeType {
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

export class EnumUtils {

    public static createEnumFromStringEnum<T extends Record<string, string>>(stringEnum: T): Record<keyof T, number> {
        const result: Record<string, number> = {};
        let index = 0;
        for (const key in stringEnum) {
            if (stringEnum.hasOwnProperty(key)) {
                result[key] = index++;
            }
        }
        return Enum(result) as Record<keyof T, number>;
    }
}