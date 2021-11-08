import { ApiProperty } from '@nestjs/swagger';
import { ResponseStatus } from "./response-status";
import { Exclude, Expose } from 'class-transformer';

export class ResponseEntity<T> {
  @Exclude() private readonly _status: number;
  @Exclude() private readonly _code: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  private constructor(status: ResponseStatus, data: T) {
    this._status = status.httpStatus;
    this._code = status.enumName;
    this._message = status.message;
    this._data = data;
  }

  static OK(responseStatus: ResponseStatus): ResponseEntity<string> {
    return new ResponseEntity<string>(responseStatus, null);
  }

  static OK_WITH<T>(responseStatus: ResponseStatus, data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(responseStatus, data);
  }

  static ERROR(responseStatus: ResponseStatus): ResponseEntity<string> {
    return new ResponseEntity<string>(responseStatus, null);
  }

  static ERROR_WITH<T>(responseStatus: ResponseStatus, data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(responseStatus, data);
  }

  @ApiProperty()
  @Expose()
  get status(): number {
    return this._status;
  }

  @ApiProperty()
  @Expose()
  get code(): string {
    return this._code;
  }

  @ApiProperty()
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}