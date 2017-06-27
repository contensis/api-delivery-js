import { IHttpClient, ITaxonomyOperations, IParamsProvider, TaxonomyNode, TaxonomyGetNodeByKeyOptions, TaxonomyGetNodeByPathOptions, TaxonomyResolveChildrenOptions } from './interfaces';
import { UrlBuilder } from './url-builder';

let taxonomyMappers = {
	order: (value) => (value === 'alphabetical') ? value : null
};

export class TaxonomyOperations implements ITaxonomyOperations {
	constructor(private httpClient: IHttpClient, private paramsProvider: IParamsProvider) {

	}

	getNodeByKey(key: string | TaxonomyGetNodeByKeyOptions): Promise<TaxonomyNode> {
		let url = UrlBuilder.create('/api/delivery/projects/:projectId/taxonomy/nodes/:key', { order: null, childDepth: null, language: null })
			.setOptions(key, 'key')
			.setParams(this.paramsProvider.getParams())
			.addMappers(taxonomyMappers)
			.toUrl();
		return this.httpClient.request<TaxonomyNode>(url);
	}

	getNodeByPath(path: string | TaxonomyGetNodeByPathOptions): Promise<TaxonomyNode> {
		let url = UrlBuilder.create('/api/delivery/projects/:projectId/taxonomy/nodes', { order: null, childDepth: null, language: null, path: null })
			.setOptions(path, 'path')
			.setParams(this.paramsProvider.getParams())
			.addMappers(taxonomyMappers)
			.toUrl();
		return this.httpClient.request<TaxonomyNode>(url);
	}

	resolveChildren(node: string | TaxonomyNode | TaxonomyResolveChildrenOptions): Promise<TaxonomyNode> {
		let resolveOptions = node as TaxonomyResolveChildrenOptions;

		let taxonomyNodeOrKey: string | TaxonomyNode = (resolveOptions.node ? resolveOptions.node : node) as any;

		let getNodeByKeyOptions: Partial<TaxonomyGetNodeByKeyOptions> = resolveOptions.node
			? { childDepth: resolveOptions.childDepth || 1, order: resolveOptions.order, language: resolveOptions.language }
			: { childDepth: 1 };

		if (typeof taxonomyNodeOrKey === 'string') {
			return this.getNodeByKey({ ...getNodeByKeyOptions, key: taxonomyNodeOrKey });
		}
		if (!taxonomyNodeOrKey.hasChildren) {
			return Promise.resolve({ ...taxonomyNodeOrKey, children: [] });
		} else if (taxonomyNodeOrKey.children && (taxonomyNodeOrKey.children.length > 0)) {
			return Promise.resolve({ ...taxonomyNodeOrKey });
		}
		return this.getNodeByKey({ ...getNodeByKeyOptions, key: taxonomyNodeOrKey.key });
	}
}
