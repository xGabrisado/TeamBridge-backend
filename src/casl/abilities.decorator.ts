import { Action, Subjects } from './casl-ability.factory/casl-ability.factory';
import { SetMetadata } from '@nestjs/common';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
