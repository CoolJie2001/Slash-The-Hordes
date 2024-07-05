import { _decorator, Component, Node, resources, TextAsset } from 'cc';
import { BaseSkill } from './BaseSkill';
import { SkillUpgradeType, UpgradeType } from '../../Upgrades/UpgradeType';
import { CsvReader } from '../../../Services/Utils/CsvUtils';
const { ccclass, property } = _decorator;

/**
 * 管理当前玩家的技能类
 */
@ccclass('SkillManager')
export class SkillManager extends Component {

    private skills : Map<string, BaseSkill> = new Map()

    start() {
        this.loadSkills('skills')
    }

    /**
     * 加载技能文件夹下的所有技能配置
     */
    loadSkills(dir : string) {
        resources.loadDir(dir, TextAsset, (err, assets : TextAsset[]) => {
            if (err) {
                console.error('加载技能文件失败.', err)
                return
            }

            assets.forEach((asset) => {
                const csvContent = asset.text
                const skillSetting = CsvReader.parseCsv(csvContent)
    
            })

            console.log(`加载技能:${this.skills}`)
            
        })
    }

    public gameTick(deltaTime: number): void {
        this.skills.forEach((element, index) => {
            element.gameTick(deltaTime)
        })
    }

    upgrade(upgradeType: SkillUpgradeType) {
        if (this.skills != null && this.skills.length > 0) {
            for (let i = 0; i < this.skills.length; ++i) {
                if (this.skills[i].UpgradeType == upgradeType) {
                    this.skills[i].upgrade()
                }
            }
        }
    }
}


