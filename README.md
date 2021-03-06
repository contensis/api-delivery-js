# DEPRECATED !!! 
> This project was replaced by [contensis-delivery-api](https://github.com/contensis/contensis-delivery-api).  
> You can still use it with all versions of Contensis 11.3 and below. The repo *contensis-delivery-api* also supports Contensis 11.3 and all the versions after 11.3.
---

# api-delivery-js
Contensis JavaScript Delivery API implementation written in TypeScript.

This allows the querying and retrieval of entries, content types and projects in JavaScript.

It can be used in any ES2015 compatible project.
* Angular
* React
* React Native
* NativeScript

## Installation

The Contensis JavaScript Delivery API can be installed using npm.

**npm install -save contensis/api-delivery-js**

## Examples

Using ES2015 async/await

```js
import { Client } from 'api-delivery-js';

let contensisConfig = { 
	rootUrl: 'https://my-cms.com',
	accessToken: 'MY_DELIVERY_API_ACCESS_TOKEN',
	projectId: 'MY_PROJECT_ID',
	language: 'en-GB',
	versionStatus: 'published',
	pageSize: 50
};

async function loadMovies() {
	let client = Client.create(contensisConfig);
	let movieList = await client.entries.list({
		contentTypeId: 'movie',
		pageOptions: { pageIndex: 0, pageSize: 10 },
		orderBy: ['-releaseDate']
	});
	console.log(movieList.items);
}

loadMovies();
```

Using Promises
```js
import { Client } from 'api-delivery-js';

let contensisConfig = { 
	rootUrl: 'https://my-cms.com',
	accessToken: 'MY_DELIVERY_API_ACCESS_TOKEN',
	projectId: 'MY_PROJECT_ID',
	language: 'en-GB',
	versionStatus: 'published',
	pageSize: 50
};

function loadMovies() {
	let client = Client.create(contensisConfig);
	client.entries.list({
		contentTypeId: 'movie',
		pageOptions: { pageIndex: 0, pageSize: 10 },
		orderBy: ['-releaseDate']
	}).then(movieList => {
		console.log(movieList.items);
	});
}

loadMovies();
```

## Documentation

Read our [documentation on the Contensis Javascript Delivery API](https://developer.zengenti.com/contensis/api/delivery/js/) to learn of all it's features.
