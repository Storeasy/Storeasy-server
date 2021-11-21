import { Agreement } from 'src/entities/Agreement';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Agreement)
export class AgreementRepository extends Repository<Agreement> {}
