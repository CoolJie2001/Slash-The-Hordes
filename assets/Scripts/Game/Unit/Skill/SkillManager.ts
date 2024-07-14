import { _decorator, Component, instantiate, resources, TextAsset } from 'cc';
import { BaseSkill } from './BaseSkill';
import { CsvReader } from '../../../Services/Utils/CsvUtils';
import { DebugNodeUtils } from '../../../Services/Utils/DebugNodeUtils';
import { SkillConfig } from './SkillConfig';
import { EnumUtils, SkillUpgradeType, UpgradeType } from '../../Upgrades/UpgradeType';

const { ccclass, property } = _decorator;

/**
 * 管理当前玩家所有能掌握的技能的管理器类
 */
@ccclass('SkillManager')
export class SkillManager extends Component {

    @property({ type: [SkillConfig] })
    private skillConfigs: SkillConfig[] = []

    private skills: Map<string, BaseSkill> = new Map()

    private static instance: SkillManager = null

    public static get Instance(): SkillManager {
        if (!SkillManager.instance) {
            console.error('SkillManager instance is not created yet.')
        }

        return SkillManager.instance
    }

    onLoad() {
        if (SkillManager.instance == null)
            SkillManager.instance = this
    }

    protected onDestroy(): void {
        if (SkillManager.instance === this)
            SkillManager.instance = null
    }

    start() {
        this.skills.clear()
        this.loadSkills('skills')
    }

    /**
     * 加载技能文件夹下的所有技能配置
     */
    loadSkills(dir: string) {
        resources.loadDir(dir, TextAsset, (err, assets: TextAsset[]) => {
            if (err) {
                console.error('加载技能文件失败.', err)
                return
            }

            assets.forEach((asset) => {
                const csvContent = asset.text
                const skillSetting = CsvReader.parseCsv(csvContent)

                if (skillSetting.length > 0) {
                    const skill = this.createSkill(skillSetting)

                    if (skill) {
                        this.skills.set(skill.Id, skill)
                    }
                }
            })

            console.log(`加载技能:${this.skills}`)
        })
    }

    public gameTick(deltaTime: number): void {
        this.skills.forEach((element, index) => {
            element.gameTick(deltaTime)
        })
    }

    public upgrade(name: UpgradeType) {
        if (this.skills != null) {
            const skillUpgradeType = EnumUtils.convertUpgradeTypeToSkillUpgradeType(name)

            const skill = this.skills.get(String(Number(skillUpgradeType)))

            if (skill) {
                skill.upgrade()
            }
        }
    }

    createSkill(skillSetting: any[]): BaseSkill | null {
        const data = skillSetting[0]

        let skill: BaseSkill = null

        this.skillConfigs.forEach((config, index) => {
            const skillId: SkillUpgradeType = Number(data.id)

            if (config && config.id === skillId && config.prefab) {
                console.log(`配置Id:${config.id}, 技能Id:${skillId}`)

                let skillPrefab = instantiate(config.prefab)

                if (skillPrefab) {
                    this.node.addChild(skillPrefab)

                    DebugNodeUtils.DebugOutputNode('', this.node)

                    skill = skillPrefab.getComponent(BaseSkill)

                    if (skill)
                        skill.setup(skillSetting)
                }
            }
        })

        return skill
    }
}


