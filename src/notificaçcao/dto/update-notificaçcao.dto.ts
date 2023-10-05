import { PartialType } from '@nestjs/swagger';
import { CreateNotificaçcaoDto } from './create-notificaçcao.dto';

export class UpdateNotificaçcaoDto extends PartialType(CreateNotificaçcaoDto) {}
