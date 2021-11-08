import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | ResponseStatus // custom exception
      | {error: string; statusCode: 400; message: string[] }; // class-validator
    
    if (err instanceof ResponseStatus) {
      return response.status(status).json({
        status: status,
        code: err.enumName,
        message: err.message,
        data: null
      })
    }

    response.status(status).json({
      status: status,
      code: "VALID_ERROR",
      message: "유효성 검사 실패",
      data: err.message
    })
  }
}