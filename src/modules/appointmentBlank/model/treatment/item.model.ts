import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
    CreateRepeatingOptionsGraph,
    RepeatingOptionsGraph,
} from './repeating_options.model';

export interface TreatmentPlanItem {
    text: string;
    repeatingOptions: RepeatingOptionsGraph;
}

@ObjectType()
export class TreatmentPlanItemGraph implements TreatmentPlanItem {
    @Field()
    text: string;

    @Field()
    repeatingOptions: RepeatingOptionsGraph;

    constructor(__: Partial<TreatmentPlanItem>) {
        if (__.text != null) this.text = __.text;
        if (__.repeatingOptions != null)
            this.repeatingOptions = __.repeatingOptions;
    }
}

@InputType()
export class CreateTreatmentPlanItemGraph implements TreatmentPlanItem {
    @Field()
    text: string;

    @Field()
    repeatingOptions: CreateRepeatingOptionsGraph;

    constructor(__: Partial<TreatmentPlanItem>) {
        if (__?.text != null) this.text = __.text;
        if (__?.repeatingOptions != null)
            this.repeatingOptions = __.repeatingOptions;
    }
}
