import { StapeSGTMOptions } from './types/StapeSGTMOptions';
import { EventData } from './types/EventData';
import { escape } from 'querystring';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { StapeSGTMError } from './StapeSGTMError';

export default class StapeSGTM {
  private config: Required<StapeSGTMOptions>;

  constructor({
    gtm_server_domain,
    request_path = '/data',
    token = '',
    preview_header = '',
    richsstsse = false,
    protocol_version = 2,
  }: StapeSGTMOptions) {
    this.config = {
      gtm_server_domain,
      request_path,
      token,
      preview_header,
      richsstsse,
      protocol_version,
    };
    this.validateConfig();
  }

  async sendEventData<T extends EventData = EventData, R = unknown>(
    event_name: string,
    eventData: T,
  ): Promise<R> {
    try {
      const url = new URL(
        `${this.config.gtm_server_domain}${this.config.request_path}`,
      );
      const params = new URLSearchParams(url.search);
      params.append('v', this.config.protocol_version.toString());
      params.append('event_name', escape(event_name));
      if (this.config.richsstsse) {
        params.append('richsstsse', '');
      }
      url.search = params.toString();

      const postData = {
        ...eventData,
        event_name,
        v: this.config.protocol_version,
      };

      const postConfig: AxiosRequestConfig = { headers: {} };

      if (this.config.token) {
        postConfig.headers!['Authorization'] = `Bearer ${this.config.token}`;
      }

      if (this.config.preview_header) {
        postConfig.headers!['X-Gtm-Server-Preview'] = this.config.preview_header;
      }

      const response = await axios.post<R>(url.toString(), postData, postConfig);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new StapeSGTMError({
          status: error.response?.status,
          statusText: error.response?.statusText,
          error: error.response?.data,
        });
      }
      else {
        throw new StapeSGTMError({error: error});
      }
    }
  }

  private validateConfig() {
    if (
      !this.config.gtm_server_domain ||
      !this.config.gtm_server_domain.startsWith('https://') ||
      this.config.gtm_server_domain.endsWith('/')
    ) {
      throw new Error(
        'You did not fill in the variable gtm_server_domain. Example: https://gtm.stape.io',
      );
    }
    if (
      !this.config.request_path ||
      !this.config.request_path.startsWith('/')
    ) {
      throw new Error(
        'You did not fill in the variable request_path. Example: /',
      );
    }
  }
}
