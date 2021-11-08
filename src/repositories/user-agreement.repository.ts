import { UserAgreement } from "src/entities/UserAgreement";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserAgreement)
export class UserAgreementRepository extends Repository<UserAgreement> {

}