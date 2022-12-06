import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';

export interface ColorCodeGradient {
    start: string;
    finish: string;
}

@ObjectType()
export class ColorCodeGradientGraph implements ColorCodeGradient {
    @Field({ nullable: true })
    start: string;

    @Field({ nullable: true })
    finish: string;

    constructor(colorCode: { start: string; finish: string }) {
        if (colorCode.start) this.start = colorCode.start;
        if (colorCode.finish) this.finish = colorCode.finish;
    }
}

@InputType()
export class ColorCodeGradientInputType implements ColorCodeGradient {
    @Field()
    start: string;

    @Field()
    finish: string;

    constructor(colorCode: { start: string; finish: string }) {
        if (colorCode?.start != null) this.start = colorCode.start;
        if (colorCode?.finish != null) this.finish = colorCode.finish;
    }
}
