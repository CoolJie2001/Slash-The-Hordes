import { approx, Component, Label, NodeEventType, Sprite, _decorator } from "cc";
import { AppRoot } from "../../../AppRoot/AppRoot";
import { ISignal } from "../../../Services/EventSystem/ISignal";
import { Signal } from "../../../Services/EventSystem/Signal";
import { TranslationData } from "../../Data/TranslationData";
import { UpgradeType } from "../../Upgrades/UpgradeType";
const { ccclass, property } = _decorator;

@ccclass("LevelUpSkill")
export class LevelUpSkill extends Component {
    @property(Label) private skillTitle: Label;
    @property(Label) private skillDescription: Label;
    @property(Sprite) private skillIcon: Sprite;
    private chooseSkillEvent: Signal<UpgradeType> = new Signal<UpgradeType>();
    private skillType: UpgradeType;

    public init(skillType: UpgradeType, translationData: TranslationData): void {
        this.skillType = skillType;
        console.log(`显示技能${skillType}的选择UI.`)

        const skillInfo = translationData.GetSkillInfo(skillType, 1)

        if (skillInfo) {
            this.skillTitle.string = `${skillInfo.Name}`;
            this.skillDescription.string = `${skillInfo.Describe}`;
            this.skillIcon.spriteFrame = AppRoot.Instance.GameAssets.UpgradeIcons.getIcon(skillType);
        }

        this.node.on(NodeEventType.TOUCH_START, this.chooseSkill, this);
    }

    public get ChooseSkillEvent(): ISignal<UpgradeType> {
        return this.chooseSkillEvent;
    }

    private chooseSkill(): void {
        this.chooseSkillEvent.trigger(this.skillType);
    }
}
