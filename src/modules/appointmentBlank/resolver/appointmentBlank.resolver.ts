import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { SessionService } from 'src/modules/session/service/session.service';
import { paginate } from 'src/utils/paginate';
import {
    AppointmentBlankArg,
    AppointmentBlankGraph,
} from '../model/appointmentBlank.model';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
import { EditAppointmentBlank } from '../model/editAppointmentBlank.args';
import { AppointmentBlankService } from '../service/appointmentBlank.service';

@Resolver()
export class AppointmentBlankResolver {
    constructor(
        private appointmentBlankService: AppointmentBlankService,
        private sessionService: SessionService,
    ) {}

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async createSessionBlank(
        @CurrentUserGraph() doctor: Doctor,
        @CurrentRequestURLGraph() req: string,
        @Args() args: CreateAppointmentBlank,
    ) {
        const session = await this.sessionService.findOne({
            doctorId: doctor._id,
            _id: new ObjectId(args.sessionId),
        });
        const appointmentBlank = await this.appointmentBlankService.create({
            ...args,
            req,
            session,
            doctorId: doctor._id,
        });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async editSessionBlank(
        @CurrentUserGraph() doctor: Doctor,
        @CurrentRequestURLGraph() req: string,
        @Args() args: EditAppointmentBlank,
    ) {
        const appointmentBlank = await this.appointmentBlankService.edit({
            ...args,
            req,
            doctorId: doctor._id,
        });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async addDoctorToAppointmentBlank(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('appointmentBlankId', { type: () => String })
        appointmentBlankId: string,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const appointmentBlank =
            await this.appointmentBlankService.updateOneWithOptions({
                findField: ['_id', 'owners'],
                findValue: [
                    new ObjectId(appointmentBlankId),
                    { $elemMatch: { doctorId: { $eq: doctor._id } } },
                ],
                updateField: ['owners'],
                updateValue: [{ doctorId: new ObjectId(doctorId) }],
                method: '$addToSet',
            });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }

    @Query(() => [AppointmentBlankGraph])
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async getAppointmentBlanksOfUser(
        @Args('userId', { type: () => String }) userId: string,
        @CurrentUserGraph() doctor: Doctor,
        @Args('page', { type: () => Int, nullable: true }) page?: number,
    ): Promise<AppointmentBlankGraph[]> {
        const appointmentBlanksCursor =
            await this.appointmentBlankService.getMultipleWithAddictives({
                userId: new ObjectId(userId),
                doctorId: doctor._id,
            });
        const _appointmentBlanks =
            page == null
                ? await appointmentBlanksCursor.toArray()
                : await paginate({
                      cursor: appointmentBlanksCursor,
                      page: page,
                      elementsPerPage: 10,
                  });
        appointmentBlanksCursor.close();
        const appointmentBlanks: AppointmentBlankArg[] =
            _appointmentBlanks.map<AppointmentBlankArg>((blank) => {
                console.log(blank);
                return {
                    ...blank,
                    complaint: (blank.complaint as any) != 'null' && {
                        ...blank.complaint,
                        doctor: blank.complaintDoctor,
                    },
                    inspections:
                        (blank.inspections as any) != 'null' &&
                        blank.inspections != null
                            ? blank.inspections.map((inspection) => {
                                  return {
                                      ...inspection,
                                      doctor:
                                          blank.inspectionsDoctors &&
                                          inspection.doctorId
                                              ? blank.inspectionsDoctors.find(
                                                    (doc) =>
                                                        doc._id.toHexString() ===
                                                        inspection.doctorId.toHexString(),
                                                )
                                              : undefined,
                                  };
                              })
                            : undefined,
                    appointmentResults:
                        (blank.appointmentResults as any) != 'null'
                            ? blank.appointmentResults.map((appRes) => {
                                  return {
                                      ...appRes,
                                      doctor:
                                          blank.appointmentResultsDoctors &&
                                          blank.appointmentResultsDoctors.find(
                                              (doc) =>
                                                  doc._id.toHexString() ===
                                                  appRes.doctorId.toHexString(),
                                          ),
                                  };
                              })
                            : undefined,
                    diagnose: (blank.diagnose as any) != 'null' && {
                        ...blank.diagnose,
                        doctor: blank.diagnoseDoctor,
                    },
                    owners: blank.owners.map((val) => {
                        return {
                            ...val,
                            doctor: blank.ownersDoctors.find(
                                (doc) =>
                                    val.doctorId.toHexString() ==
                                    doc._id.toHexString(),
                            ),
                        };
                    }),
                };
            });
        const appointmentBlanksResponce = appointmentBlanks.map(
            (val) => new AppointmentBlankGraph({ ...val }),
        );
        return appointmentBlanksResponce;
    }
}
