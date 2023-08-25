import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof Usuario | typeof Empresa> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.permission === 'a') {
      can(Action.Manage, 'all');
      //   cannot(Action.Manage, Usuario, { empresa: {$ne: user.empresa }}).because('You can only manage your company users');
    } else {
      can(Action.Read, 'all');
    }

    return build({
      detectSubjectType: (item) => {
        return item.constructor as ExtractSubjectType<Subjects>;
      },
    });
  }
}
