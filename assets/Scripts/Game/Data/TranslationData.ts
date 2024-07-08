import { resources, TextAsset } from "cc";
import { SkillInfo } from "../Unit/Skill/Settings/SkillInfo";
import { UpgradeType } from "../Upgrades/UpgradeType";
import { CsvReader } from "../../Services/Utils/CsvUtils";

export class TranslationData {
    // [key: string]: string;

    private skillInfoMap: Map<string, SkillInfo[]> = new Map()

    /**
     * 加载指定路径下所有的技能文字配置
     * @param dir 目录路径
     */
    public init(dir: string) {
        resources.loadDir(dir, TextAsset, (err, assets: TextAsset[]) => {
            if (err) {
                console.error('加载技能文件失败.', err)
                return
            }

            assets.forEach(asset => {
                const csvContent = asset.text
                const skillSetting = CsvReader.parseCsv(csvContent)

                if (skillSetting.length) {
                    const skillInfo = skillSetting.map((value, index) => {
                        return new SkillInfo(value.id, value.name, value.describe, value.level) 
                    })

                    if (skillInfo.length > 0) {
                        this.skillInfoMap.set(skillInfo[0].Id, skillInfo)
                    }
                }
            })
        })
    }

    /**
     * 获取指定技能Id等级的技能信息
     * @param id 指定的技能Id
     * @param level 指定的技能等级
     * @returns 返回指定技能Id等级的技能信息
     */
    public GetSkillInfo(id: string, level: number): SkillInfo | null {
        const skillInfo = this.skillInfoMap.get(id)

        if (skillInfo) {
            for (let i = 0; i < skillInfo.length; i++) {
                const element = skillInfo[i];

                if (element && element.Level == level) {
                    return element
                }
            }
        }

        return null
    }
}
