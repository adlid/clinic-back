import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import {
    CreateTreatmentPlanItemGraph,
    TreatmentPlanItem,
    TreatmentPlanItemGraph,
} from './item.model';
import { RepeatingOptionsGraph } from './repeating_options.model';

export interface TreatmentPlan {
    medical: TreatmentPlanItem[];
    proccess: TreatmentPlanItem[];
    recomendation: TreatmentPlanItem[];
}

@ObjectType()
export class TreatmentPlanGraph implements TreatmentPlan {
    @Field(() => [TreatmentPlanItemGraph], { defaultValue: [] })
    medical: TreatmentPlanItemGraph[];
    @Field(() => [TreatmentPlanItemGraph], { defaultValue: [] })
    proccess: TreatmentPlanItemGraph[];
    @Field(() => [TreatmentPlanItemGraph], { defaultValue: [] })
    recomendation: TreatmentPlanItemGraph[];
    constructor(__: Partial<TreatmentPlan>) {
        if (__.medical != null) this.medical = __.medical;
        if (__.proccess != null) this.proccess = __.proccess;
        if (__.recomendation != null) this.recomendation = __.recomendation;
    }
}

@InputType()
export class CreateTreatmentPlanGraph implements TreatmentPlan {
    @Field(() => [CreateTreatmentPlanItemGraph], {
        defaultValue: [],
        nullable: true,
    })
    medical: CreateTreatmentPlanItemGraph[];

    @Field(() => [CreateTreatmentPlanItemGraph], {
        defaultValue: [],
        nullable: true,
    })
    proccess: CreateTreatmentPlanItemGraph[];

    @Field(() => [CreateTreatmentPlanItemGraph], {
        defaultValue: [],
        nullable: true,
    })
    recomendation: CreateTreatmentPlanItemGraph[];

    constructor(__: Partial<TreatmentPlan>) {
        if (__?.medical != null) this.medical = __.medical;
        if (__?.proccess != null) this.proccess = __.proccess;
        if (__?.recomendation != null) this.recomendation = __.recomendation;
    }
}
