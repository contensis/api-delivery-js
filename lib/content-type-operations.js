export class ContentTypeOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get(contentTypeId) {
        let params = this.paramsProvider.getParams();
        let url = `/api/delivery/projects/${params.projectId}/contenttypes/${contentTypeId}`;
        return this.httpClient.request(url);
    }
}
