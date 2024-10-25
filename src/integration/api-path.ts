import { API_KIND, API_PATH_SEGMENT, API_VERSION } from "src/common";
import { GetPathArgs, ResourcePath, IdSet } from "src/types/api.type";
interface IRoutes {
	kind: API_KIND | string;
	name?: string;
	version?: API_VERSION | string;
	isRoot?: boolean;
}

export const genAPIRoutes = (options: IRoutes): string => {
	let _version: string = options.version ?? "";
	let _kind: string = options.kind;
	let _isRoot: boolean = options.isRoot ?? false;
	let _name: string = options.name ?? "";
	let api_path: string = `/${API_PATH_SEGMENT.API}`;

	if (_version) api_path += `/${_version}`;
	if (_kind) api_path += `/${_kind}`;
	if (_isRoot) return (api_path += `/*`);
	if (_name) api_path += `/${_name}`;
	return api_path;
};

export function getAPIPath(resource: ResourcePath[], options: GetPathArgs): string {
	let match: string | null = null;
	let specificity = -1;
	const { http_method, operation, entity, urlIds } = options;

	resource.forEach((path: ResourcePath) => {
		//error 1st
		if (http_method !== path.http_method || operation !== path.operation || path.ids.length <= specificity) {
			return;
		}
		//mapping id
		let pathUrlIds: IdSet = { ...urlIds };
		path.ids.forEach((id) => {
			if (!pathUrlIds[id] && entity && entity[id]) {
				pathUrlIds[id] = entity[id];
			}
		});

		pathUrlIds = Object.entries(pathUrlIds).reduce((acc: IdSet, [key, value]: [string, string | number | null]) => {
			if (value) acc[key] = value;
			return acc;
		}, {});

		// If we weren't given all of the path's required ids, we can't use it
		const diff = path.ids.reduce((acc: string[], id: string) => (pathUrlIds[id] ? acc : acc.concat(id)), []);
		if (diff.length > 0) return;

		specificity = path.ids.length;

		match = path.path.replace(/(<([^>]+)>)/g, (_m1, _m2, id) => `${pathUrlIds[id]}`);
	});

	if (!match) {
		throw new Error("Could not find a path for request");
	}

	return match;
}
