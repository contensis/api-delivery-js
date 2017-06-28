import * as Contensis from '../index';

const Zengenti = { Contensis };

const global = window || this;

describe('Link Resolver', function () {

	beforeEach(() => {
		Zengenti.Contensis.Client.defaultClientConfig = null;

		spyOn(global, 'fetch').and.callFake((...args) => {
			return new Promise((resolve, reject) => {
				resolve({
					json: () => {
						return {
							items: []
						};
					}
				});
			});
		});
	});

	it('should resolve array', () => {
		let client = Zengenti.Contensis.Client.create({
			projectId: 'myProject',
			rootUrl: 'http://my-website.com/',
			accessToken: 'XXXXXX'
		});

		let testEntry: any = {
			entry: {
				sys: { id: 99, language: 'en-GB' }
			}
		};

		client.entries.resolve(testEntry);

		expect(global.fetch).toHaveBeenCalled();
		expect(global.fetch).toHaveBeenCalledWith(
			'http://my-website.com/api/delivery/projects/myProject/entries/search',
			Object({
				method: 'POST',
				mode: 'cors',
				headers: {
					'accessToken': 'XXXXXX',
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify({
					pageIndex: 0,
					pageSize: 1,
					orderBy: [],
					where: [{
						or: [{
							and: [
								{ field: 'sys.id', equalTo: 99 },
								{ field: 'sys.language', equalTo: 'en-GB' },
								{ field: 'sys.versionStatus', equalTo: 'published' }
							]
						}]
					}]
				})
			}));

	});
});
