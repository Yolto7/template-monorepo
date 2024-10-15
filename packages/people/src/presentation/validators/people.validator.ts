import { z } from 'zod';

import { ZodValidator } from '@template/shared';

import { PeopleCreateInput } from '../../application/services/commands/people-create.command.service';

export default class PeopleValidator extends ZodValidator {
  static create(payload: unknown) {
    const schema = z.object({
      name: z.string().trim().min(1, { message: 'Invalid' }),
      height: z.number().min(1, { message: 'Invalid' }),
      mass: z.number().min(1, { message: 'Invalid' }),
      hairColor: z.string().trim().min(1, { message: 'Invalid' }),
      skinColor: z.string().trim().min(1, { message: 'Invalid' }),
      eyeColor: z.string().trim().min(1, { message: 'Invalid' }),
      birthYear: z.string().trim().min(1, { message: 'Invalid' }),
      gender: z.string().trim().min(1, { message: 'Invalid' }),
    });

    return this.validateSchema<PeopleCreateInput>(schema.safeParse(payload));
  }
}
