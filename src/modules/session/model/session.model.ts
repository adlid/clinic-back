import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookingGraph } from 'src/modules/booking/model/booking.model';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { SpecializationGraph } from 'src/modules/specialization/model/specialization.model';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { SessionAddictive } from './session.addictive';
import { Session } from './session.interface';

@ObjectType('Session')
export class SessionGraph
    implements
        Modify<
            Omit<Session, 'bookingId' | 'userId'>,
            {
                _id: string;
                startDate: string;
                endDate: string;
                doctorId: string;
                serviceId: string;
                specializationIds?: string[];
            }
        >
{
    @Field()
    _id: string;

    @Field(() => BookingGraph, { nullable: true })
    booking: BookingGraph;

    @Field()
    startDate: string;

    @Field()
    endDate: string;

    @Field(() => Int, { defaultValue: 1 })
    count: number;

    @Field()
    doctorId: string;

    @Field()
    serviceId: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => ServiceGraph, { nullable: true })
    service: ServiceGraph;

    @Field({
        defaultValue: 0,
    })
    price: number;

    @Field({ defaultValue: 100 })
    clinicPercnetage: number;

    @Field()
    userId: string;

    @Field()
    user: UserGraph;

    @Field(() => [String], { nullable: true })
    specializationIds?: string[];

    @Field(() => [SpecializationGraph], { nullable: true })
    specializations?: SpecializationGraph[];

    constructor(session: Partial<SessionAddictive>) {
        this.price = 0;
        this.clinicPercnetage = 100;
        if (session._id) this._id = session._id.toHexString();
        if (session.booking)
            this.booking = new BookingGraph({
                ...session.booking,
                service: session.service,
                user: session.user,
                doctor: session.doctor,
            });
        if (session.startDate) this.startDate = session.startDate.toISOString();
        if (session.endDate) this.endDate = session.endDate.toISOString();
        if (session.count) this.count = session.count;
        if (session.doctorId != null)
            this.doctorId = session.doctorId.toHexString();
        if (session.serviceId != null)
            this.serviceId = session.serviceId.toHexString();
        if (session.service != null)
            this.service = new ServiceGraph({ ...session.service });
        if (session.doctor != null)
            this.doctor = new DoctorGraph({ ...session.doctor });
        if (session.price != null) this.price = session.price;
        if (session.user != null) this.user = new UserGraph(session.user);
        if (session.userId != null) this.userId = session.userId.toHexString();
        if (session.specializationIds != null)
            this.specializationIds = session.specializationIds.map((e) =>
                e.toHexString(),
            );
        if (session.specializations != null)
            this.specializations = session.specializations.map(
                (e) => new SpecializationGraph(e),
            );
    }
}
