import "typeorm";

declare module "typeorm" {
	export interface QueryBuilder<Entity> {
		___scope_getQuery_copy___: () => string
	}
}
