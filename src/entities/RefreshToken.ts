import { Column, Entity } from 'typeorm';

@Entity('refresh_token')
export class RefreshToken {
  @Column('varchar', { primary: true, name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'value', nullable: true, length: 255 })
  value: string | null;
}
