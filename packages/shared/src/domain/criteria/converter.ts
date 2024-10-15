import { Criteria } from '.';

export interface CriteriaConverter {
  convert<T>(criteria: Criteria): T;
}
