import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable()
export class FetchHttpService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Asynchronously fetches data from an external service using a GET request.
   *
   * @param url The URL of the external service to fetch data from.
   * @param params Optional parameters to be sent with the request.
   * @param headers Optional headers to be included in the request.
   * @returns A Promise that resolves with the data retrieved from the external service.
   * @throws Throws an error if there are issues with the request or response handling.
   */
  async fetchGetExternalService(
    url: string,
    params: Record<string, any> = {},
    headers: Record<string, any> = {},
  ): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, { params, headers }).pipe(
          catchError((error: AxiosError) => {
            if (error.response) {
              console.error(
                `Error al obtener datos del servicio externo: ${error.response.status} - ${error.response.statusText}`,
              );
              return throwError(
                () =>
                  new BadRequestException({
                    message: 'Error en la solicitud al servicio externo',
                    statusCode: error.response.status,
                    data: error.response.data,
                  }),
              );
            } else if (error.request) {
              console.error(
                'No hubo respuesta del servidor o problema de red.',
              );
              return throwError(
                () =>
                  new InternalServerErrorException(
                    'Problema de red o el servidor no respondió',
                  ),
              );
            } else {
              console.error(
                'Error en la configuración de la solicitud:',
                error.message,
              );
              return throwError(
                () =>
                  new InternalServerErrorException(
                    'Error en la configuración de la solicitud',
                  ),
              );
            }
          }),
        ),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
