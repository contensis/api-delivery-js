import { LinkResolver } from './link-resolver';
import './polyfills';
function queryString(o) {
    let query = Object.keys(o)
        .filter((key) => key && (o[key] !== null) && (o[key] !== ''))
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(o[key]));
    return (query.length > 0)
        ? '?' + query.join('&')
        : '';
}
function getOptions(params, idOrOptions) {
    let options = (typeof idOrOptions === 'string')
        ? { id: idOrOptions }
        : idOrOptions;
    options.language = options.language || params.language;
    options.linkDepth = options.linkDepth || null;
    let query = {
        lang: options.language,
        versionStatus: (params.versionStatus !== 'published') ? params.versionStatus : null,
        linkDepth: options.linkDepth
    };
    return {
        projectId: params.projectId,
        id: options.id,
        query: queryString(query)
    };
}
function getListOptions(params, contentTypeIdOrOptions) {
    let options = (typeof contentTypeIdOrOptions === 'string')
        ? { contentTypeId: contentTypeIdOrOptions }
        : contentTypeIdOrOptions;
    options = options || {};
    options.language = options.language || params.language;
    options.pageOptions = options.pageOptions || {};
    options.pageOptions.pageIndex = options.pageOptions.pageIndex || params.pageIndex;
    options.pageOptions.pageSize = options.pageOptions.pageSize || params.pageSize;
    options.order = options.order || [];
    options.linkDepth = options.linkDepth || null;
    options.fields = options.fields || [];
    let query = {
        versionStatus: (params.versionStatus !== 'published') ? params.versionStatus : null,
        linkDepth: options.linkDepth,
        pageIndex: options.pageOptions.pageIndex,
        pageSize: options.pageOptions.pageSize,
        order: options.order.join(','),
        fields: options.fields.join(','),
        lang: options.language
    };
    return {
        projectId: params.projectId,
        contentTypeId: options.contentTypeId,
        query: queryString(query)
    };
}
export class EntryOperations {
    constructor(httpClient, paramsProvider) {
        this.httpClient = httpClient;
        this.paramsProvider = paramsProvider;
    }
    get(idOrOptions) {
        let options = getOptions(this.paramsProvider.getParams(), idOrOptions);
        let url = `/api/delivery/projects/${options.projectId}/entries/${options.id}${options.query}`;
        return this.httpClient.request(url);
    }
    list(contentTypeIdOrOptions) {
        let options = getListOptions(this.paramsProvider.getParams(), contentTypeIdOrOptions);
        let url = !!options.contentTypeId
            ? `/api/delivery/projects/${options.projectId}/contenttypes/${options.contentTypeId}/entries${options.query}`
            : `/api/delivery/projects/${options.projectId}/entries${options.query}`;
        return this.httpClient.request(url);
    }
    search(query, linkDepth = 0) {
        if (!query) {
            return new Promise((resolve) => { resolve(null); });
        }
        let params = this.paramsProvider.getParams();
        query.pageSize = query.pageSize || params.pageSize;
        query.pageIndex = query.pageIndex || 0;
        let url = `/api/delivery/projects/${params.projectId}/entries/search`;
        if (linkDepth) {
            url += queryString({ linkDepth });
        }
        return this.httpClient.request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(query)
        });
    }
    resolve(entryOrList, fields = null) {
        let params = this.paramsProvider.getParams();
        let resolver = new LinkResolver(entryOrList, fields, params.versionStatus, (query) => this.search(query));
        return resolver.resolve();
    }
}
