import { forwardRef, Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { UploadFileModule } from '../helpers/uploadFiles/uploadFiles.module';
import { NotificationModule } from '../notification/notification.module';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../user/user.module';
import { AppointmentBlankResolver } from './resolver/appointmentBlank.resolver';
import { AppointmentBlankService } from './service/appointmentBlank.service';

@Module({
    imports: [
        MongoModule,
        UploadFileModule,
        forwardRef(() => SessionModule),
        PreAuthModule,
        UserModule,
        NotificationModule,
    ],
    providers: [AppointmentBlankResolver, AppointmentBlankService],
    exports: [AppointmentBlankService],
})
export class AppointmentBlankModule {}
