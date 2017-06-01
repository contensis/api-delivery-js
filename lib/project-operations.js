export class ProjectOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get() {
        let params = this.paramsProvider.getParams();
        let url = `/api/delivery/projects/${params.projectId}`;
        return this.httpClient.request(url);
    }
}
