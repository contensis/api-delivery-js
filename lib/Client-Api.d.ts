import { Config, ClientParams, ContensisClient } from './interfaces';
import { EntryOperations } from './entry-operations';
import { ContentTypeOperations } from './content-type-operations';
import { ProjectOperations } from './project-operations';
import { ClientConfig } from './client-config';
export declare class Client implements ContensisClient {
    static create(config?: Config): Client;
    static configure(config: Config): void;
    static defaultClientConfig: ClientConfig;
    clientConfig: ClientConfig;
    private httpClient;
    entries: EntryOperations;
    project: ProjectOperations;
    contentTypes: ContentTypeOperations;
    constructor(config?: Config);
    getParams(): ClientParams;
}
