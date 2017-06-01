import { EntryOperations } from './entry-operations';
import { ContentTypeOperations } from './content-type-operations';
import { ProjectOperations } from './project-operations';
import { ClientConfig } from './client-config';
import { HttpClient } from './http-client';
export class Client {
    constructor(config = null) {
        this.clientConfig = null;
        this.httpClient = new HttpClient(this);
        this.entries = new EntryOperations(this.httpClient, this);
        this.project = new ProjectOperations(this.httpClient, this);
        this.contentTypes = new ContentTypeOperations(this.httpClient, this);
        this.clientConfig = new ClientConfig(config, Client.defaultClientConfig);
    }
    static create(config = null) {
        return new Client(config);
    }
    static configure(config) {
        Client.defaultClientConfig = new ClientConfig(config, Client.defaultClientConfig);
    }
    getParams() {
        return this.clientConfig.toParams();
    }
}
Client.defaultClientConfig = null;
