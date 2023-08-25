import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { Injectable, CanActivate, ExecutionContext, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from './abilities.decorator';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext) {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    // try {
    //     rules.forEach((rule) =>
    //         ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
    //     )

    return true;
    // }
  }
}
