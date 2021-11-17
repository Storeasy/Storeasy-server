import { Agreement } from 'src/entities/Agreement';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Agreement)
export class AgreementRepository extends Repository<Agreement> {
  public async findAll() {
    return await this.find();
  }

  public async findOneByAgreementId(agreementId: number) {
    return await this.findOne({
      where: {
        id: agreementId,
      },
    });
  }
}
