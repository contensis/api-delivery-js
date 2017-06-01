import * as Contensis from './index';
import { ClientConfig } from './client-config';
var Zengenti = { Contensis };
var global = this;
describe("Contensis Client suite", function () {
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
    it('Zengenti exists', () => {
        expect(Zengenti).toBeDefined();
    });
    it('Contensis exists', () => {
        expect(Zengenti.Contensis).toBeDefined();
    });
    it('Contensis Client exists', () => {
        expect(Zengenti.Contensis.Client).toBeDefined();
    });
    it('Contensis Client create exists', () => {
        expect(Zengenti.Contensis.Client.create).toBeDefined();
    });
    it('Static Initial Default Settings', () => {
        let defaultSettings = new ClientConfig(null, null);
        expect(defaultSettings.projectId).toBeNull();
        expect(defaultSettings.rootUrl).toBeNull();
        expect(defaultSettings.language).toEqual('en-US');
        expect(defaultSettings.versionStatus).toEqual('published');
        expect(defaultSettings.pageSize).toEqual(20);
    });
    it('Static Settable Default Settings', () => {
        Zengenti.Contensis.Client.configure({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'fr-fr',
            versionStatus: 'latest',
            accessToken: 'XXXXXX',
            pageSize: 50
        });
        expect(Zengenti.Contensis.Client.defaultClientConfig.projectId).toEqual('myProject');
        expect(Zengenti.Contensis.Client.defaultClientConfig.rootUrl).toEqual('http://my-website.com');
        expect(Zengenti.Contensis.Client.defaultClientConfig.language).toEqual('fr-fr');
        expect(Zengenti.Contensis.Client.defaultClientConfig.versionStatus).toEqual('latest');
        expect(Zengenti.Contensis.Client.defaultClientConfig.pageSize).toEqual(50);
        expect(Zengenti.Contensis.Client.defaultClientConfig.accessToken).toEqual('XXXXXX');
    });
    it('Instance Default Settings', () => {
        Zengenti.Contensis.Client.configure({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'fr-fr',
            versionStatus: 'latest',
            pageSize: 50,
            accessToken: 'YYYYYY'
        });
        let client = Zengenti.Contensis.Client.create();
        let params = client.getParams();
        expect(params.projectId).toEqual('myProject');
        expect(params.rootUrl).toEqual('http://my-website.com');
        expect(params.language).toEqual('fr-fr');
        expect(params.versionStatus).toEqual('latest');
        expect(params.pageSize).toEqual(50);
        expect(params.accessToken).toEqual('YYYYYY');
    });
    it('Instance Settable Settings', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            pageSize: 100,
            accessToken: 'ZZZZZZ'
        });
        let params = client.getParams();
        expect(params.projectId).toEqual('myProject');
        expect(params.rootUrl).toEqual('http://my-website.com');
        expect(params.language).toEqual('en-US');
        expect(params.versionStatus).toEqual('published');
        expect(params.pageSize).toEqual(100);
        expect(params.accessToken).toEqual('ZZZZZZ');
    });
    //`${params.baseUrl}/api/projects/${params.projectId}/entries/${id}/${params.language}/versions/${params.version}`
    it('Get Live Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.get('1');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/entries/1/versions/published?lang=en-US', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Get Preview Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'latest',
            accessToken: 'XXXXXX'
        });
        client.entries.get('1');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/entries/1/versions/latest?lang=en-US', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Get Default French Version', () => {
        Zengenti.Contensis.Client.configure({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'fr-FR',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        let client = Zengenti.Contensis.Client.create();
        client.entries.get('1');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/entries/1/versions/published?lang=fr-FR', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Get Specified French Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'fr-FR',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.get('1');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/entries/1/versions/published?lang=fr-FR', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Content Type', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list('cheese');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/contentTypes/cheese/entries/published?lang=en-US&pageIndex=0&pageSize=20', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Live Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list('cheese');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/contentTypes/cheese/entries/published?lang=en-US&pageIndex=0&pageSize=20', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Preview Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'latest',
            accessToken: 'XXXXXX'
        });
        client.entries.list('cheese');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/contentTypes/cheese/entries/latest?lang=en-US&pageIndex=0&pageSize=20', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List French Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'fr-FR',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list('cheese');
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/contentTypes/cheese/entries/published?lang=fr-FR&pageIndex=0&pageSize=20', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Paging Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list({ contentTypeId: 'cheese', pageOptions: { pageIndex: 5, pageSize: 100 } });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/contentTypes/cheese/entries/published?lang=en-US&pageIndex=5&pageSize=100', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Specified French Version', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list({ contentTypeId: 'cheese', language: 'fr-FR' });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/contentTypes/cheese/entries/published?lang=fr-FR&pageIndex=0&pageSize=20', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('List Specified French Version with Paging Options', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.list({ contentTypeId: 'cheese', language: 'fr-FR', pageOptions: { pageIndex: 5, pageSize: 100 } });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/projects/myProject/contentTypes/cheese/entries/published?lang=fr-FR&pageIndex=5&pageSize=100', Object({
            mode: 'cors', headers: {
                'accessToken': 'XXXXXX'
            }
        }));
    });
    it('Do Search via the Client API', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.search({
            "pageIndex": 1,
            "pageSize": 50,
            "orderBy": [{
                    "asc": "name"
                }, {
                    "desc": "brewTypeCount"
                }],
            "where": [{
                    "field": "brewTypeCount",
                    "greaterThan": 5
                }, {
                    "field": "Origin",
                    "in": ["Peru", "Columbia"]
                }]
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/search', Object({
            method: 'POST',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                "pageIndex": 1,
                "pageSize": 50,
                "orderBy": [{
                        "asc": "name"
                    }, {
                        "desc": "brewTypeCount"
                    }],
                "where": [{
                        "field": "brewTypeCount",
                        "greaterThan": 5
                    }, {
                        "field": "Origin",
                        "in": ["Peru", "Columbia"]
                    }]
            })
        }));
    });
    it('Do Search via the Client API v2', () => {
        let client = Zengenti.Contensis.Client.create({
            projectId: 'myProject',
            rootUrl: 'http://my-website.com/',
            language: 'en-US',
            versionStatus: 'published',
            accessToken: 'XXXXXX'
        });
        client.entries.search({
            "pageIndex": 1,
            "pageSize": 50,
            "orderBy": [{
                    "asc": "authorName"
                }],
            "where": [{
                    "field": "authorName",
                    "startsWith": "W"
                }]
        });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('http://my-website.com/api/search', Object({
            method: 'POST',
            mode: 'cors',
            headers: {
                'accessToken': 'XXXXXX',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                "pageIndex": 1,
                "pageSize": 50,
                "orderBy": [{
                        "asc": "authorName"
                    }],
                "where": [{
                        "field": "authorName",
                        "startsWith": "W"
                    }]
            })
        }));
    });
    it('Serialize And Query 1', () => {
        let Query = Zengenti.Contensis.Query;
        let Op = Zengenti.Contensis.Op;
        let query = new Query(Op.and(Op.equalTo("first", 1), Op.equalTo("second", 2)));
        query.pageIndex = 1;
        query.pageSize = 50;
        query.orderBy = ['+name', '-id'];
        let expected = {
            "pageIndex": 1,
            "pageSize": 50,
            "orderBy": [{ "asc": "name" }, { "desc": "id" }],
            "where": [{
                    "and": [{
                            "field": "first",
                            "equalTo": 1
                        }, {
                            "field": "second",
                            "equalTo": 2
                        }]
                }]
        };
        expect(JSON.stringify(query)).toEqual(JSON.stringify(expected));
    });
    it('Serialize And Query 2', () => {
        let Query = Zengenti.Contensis.Query;
        let Op = Zengenti.Contensis.Op;
        let OrderBy = Zengenti.Contensis.OrderBy;
        let query = new Query(Op.equalTo("first", 1), Op.equalTo("second", 2));
        query.pageIndex = 1;
        query.pageSize = 50;
        query.orderBy = OrderBy.asc('name').desc('id');
        let expected = {
            "pageIndex": 1,
            "pageSize": 50,
            "orderBy": [{ "asc": "name" }, { "desc": "id" }],
            "where": [{
                    "field": "first",
                    "equalTo": 1
                }, {
                    "field": "second",
                    "equalTo": 2
                }]
        };
        expect(JSON.stringify(query)).toEqual(JSON.stringify(expected));
    });
    it('Serialize Or Query', () => {
        let Query = Zengenti.Contensis.Query;
        let Op = Zengenti.Contensis.Op;
        let query = new Query(Op.or(Op.equalTo("first", 1), Op.equalTo("second", 2)));
        query.pageIndex = 1;
        query.pageSize = 50;
        query.orderBy = ['+name', '-id'];
        let expected = {
            "pageIndex": 1,
            "pageSize": 50,
            "orderBy": [{ "asc": "name" }, { "desc": "id" }],
            "where": [{
                    "or": [{
                            "field": "first",
                            "equalTo": 1
                        }, {
                            "field": "second",
                            "equalTo": 2
                        }]
                }]
        };
        expect(JSON.stringify(query)).toEqual(JSON.stringify(expected));
    });
    it('Serialize Not Query', () => {
        let Query = Zengenti.Contensis.Query;
        let Op = Zengenti.Contensis.Op;
        let OrderBy = Zengenti.Contensis.OrderBy;
        let query = new Query(Op.not(Op.equalTo("first", 7)));
        query.pageIndex = 1;
        query.pageSize = 50;
        query.orderBy = OrderBy.asc('name').desc('id');
        let expected = {
            "pageIndex": 1,
            "pageSize": 50,
            "orderBy": [{ "asc": "name" }, { "desc": "id" }],
            "where": [{
                    "not": {
                        "field": "first",
                        "equalTo": 7
                    }
                }]
        };
        expect(JSON.stringify(query)).toEqual(JSON.stringify(expected));
    });
});
