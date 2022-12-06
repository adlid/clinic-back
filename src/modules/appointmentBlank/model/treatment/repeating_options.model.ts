import {
    ArgsType,
    Field,
    GraphQLISODateTime,
    InputType,
    Int,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql';
import {
    ICalEventRepeatingFreq,
    ICalRepeatingOptions,
    ICalWeekday,
} from 'ical-generator';

registerEnumType(ICalEventRepeatingFreq, {
    name: 'CalEventRepeatingFreqGraph',
});

registerEnumType(ICalWeekday, {
    name: 'CalWeekdayGraph',
});

@ObjectType()
export class RepeatingOptionsGraph implements ICalRepeatingOptions {
    @Field()
    freq: ICalEventRepeatingFreq;
    @Field(() => Int, { nullable: true })
    count?: number;
    @Field(() => Int, { nullable: true })
    interval?: number;
    @Field(() => GraphQLISODateTime, { nullable: true })
    until?: Date;

    @Field(() => [ICalWeekday], { nullable: true })
    byDay?: ICalWeekday[];

    @Field(() => [Int], { nullable: true })
    byMonth?: number[];

    @Field(() => [Int], { nullable: true })
    byMonthDay?: number[];

    @Field(() => Int, { nullable: true })
    bySetPos?: number;

    @Field(() => [GraphQLISODateTime], { nullable: true })
    exclude?: Date[];

    @Field(() => ICalWeekday, { nullable: true })
    startOfWeek?: ICalWeekday;

    constructor(__: Partial<ICalRepeatingOptions>) {
        if (__.freq != null) this.freq = __.freq;
        if (__.count != null) this.count = __.count;
        if (__.interval != null) this.interval = __.interval;
        if (__.until != null) this.until = __.until;
        if (__.byDay != null)
            this.byDay = Array.isArray(__.byDay) ? __.byDay : [__.byDay];
        if (__.byMonth != null)
            this.byMonth = Array.isArray(__.byMonth)
                ? __.byMonth
                : [__.byMonth];
        if (__.byMonthDay != null)
            this.byMonthDay = Array.isArray(__.byMonthDay)
                ? __.byMonthDay
                : [__.byMonthDay];
        if (__.bySetPos != null) this.bySetPos = __.bySetPos;
        if (__.exclude != null) this.exclude = __.exclude;
        if (__.startOfWeek != null) this.startOfWeek = __.startOfWeek;
    }
}

@InputType()
export class CreateRepeatingOptionsGraph implements ICalRepeatingOptions {
    @Field()
    freq: ICalEventRepeatingFreq;
    @Field(() => Int, { nullable: true })
    count?: number;

    @Field(() => Int, { nullable: true })
    interval?: number;
    @Field(() => GraphQLISODateTime, { nullable: true })
    until?: Date;

    @Field(() => [ICalWeekday], { nullable: true })
    byDay?: ICalWeekday[];

    @Field(() => [Int], { nullable: true })
    byMonth?: number[];

    @Field(() => [Int], { nullable: true })
    byMonthDay?: number[];

    @Field(() => Int, { nullable: true })
    bySetPos?: number;

    @Field(() => [GraphQLISODateTime], { nullable: true })
    exclude?: Date[];

    @Field(() => ICalWeekday, { nullable: true })
    startOfWeek?: ICalWeekday;

    constructor(__: Partial<ICalRepeatingOptions>) {
        if (__?.freq != null) this.freq = __.freq;
        if (__?.count != null) this.count = __.count;
        if (__?.interval != null) this.interval = __.interval;
        if (__?.until != null) this.until = __.until;
        if (__?.byDay != null)
            this.byDay = Array.isArray(__.byDay) ? __.byDay : [__.byDay];
        if (__?.byMonth != null)
            this.byMonth = Array.isArray(__.byMonth)
                ? __.byMonth
                : [__.byMonth];
        if (__?.byMonthDay != null)
            this.byMonthDay = Array.isArray(__.byMonthDay)
                ? __.byMonthDay
                : [__.byMonthDay];
        if (__?.bySetPos != null) this.bySetPos = __.bySetPos;
        if (__?.exclude != null) this.exclude = __.exclude;
        if (__?.startOfWeek != null) this.startOfWeek = __.startOfWeek;
    }
}
