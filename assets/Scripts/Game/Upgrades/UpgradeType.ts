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
     * 飞行标枪
     */
    HorizontalProjectile = 1,
    /**
     * 交叉火焰
     */
    DiagonalProjectile = 2,
    /**
     * 火焰散弹枪
     */
    HaloProjectile = 3,

    /**
     * 回复术
     */
    Regeneration = 4,

    /**
     * 旋风刃技能
     */
    RotatingBlade = 5,
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

    /**
     * 获取枚举值在枚举类型中定义的名称字符串
     * @param enumType 枚举类型
     * @param value 枚举值
     * @returns 返回枚举值在枚举类型中定义的名称字符串
     */
    public static getEnumName(enumType: any, value : number) : string | undefined {
        return enumType[value]
    }


    public static getEnumIndex<T extends { [key: string]: string }>(enumType: T, value: string): number {
        const enumValue = Object.values(enumType)

        return enumValue.indexOf(value)
    }
}