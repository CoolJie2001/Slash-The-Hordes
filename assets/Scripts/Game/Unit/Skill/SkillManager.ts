import { _decorator, BoxCollider, BoxCollider2D, Component, instantiate, Node, Prefab, resources, TextAsset } from 'cc';
import { BaseSkill } from './BaseSkill';
import { CsvReader } from '../../../Services/Utils/CsvUtils';
import { DebugNodeUtils } from '../../../Services/Utils/DebugNodeUtils';
import { SkillConfig } from './SkillConfig';
const { ccclass, property } = _decorator;

/**
 * 管理当前玩家的技能类
 */
@ccclass('SkillManager')
export class SkillManager extends Component {

    @property({ type: [SkillConfig] })
    private skillConfigs: SkillConfig[] = []

    private skills: Map<string, BaseSkill> = new Map()

    start() {
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

    upgrade(name: string) {
        if (this.skills != null) {
            const skill = this.skills.get(name)

            if (skill) {
                skill.upgrade()
            }
        }
    }

    createSkill(skillSetting: any[]): BaseSkill | null {
        const data = skillSetting[0]

        let skill: BaseSkill = null

        this.skillConfigs.forEach((config, index) => {
            if (config && config.id === data.id && config.prefab) {
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


