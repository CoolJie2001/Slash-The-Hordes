import { Collider2D } from "cc";
import { BaseSkill } from "./BaseSkill";

/**
 * 技能碰撞类
 */
export class SkillCollision {
    public otherCollider: Collider2D

    public skill: BaseSkill
}