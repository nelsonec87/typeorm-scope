import { QueryBuilder } from "typeorm"
import { TableMetadataArgs } from "typeorm/metadata-args/TableMetadataArgs"

export type ScopeQB<Entity> = (qb: QueryBuilder<Entity>, alias: string) => QueryBuilder<Entity>

export interface ScopedTableMetadata<Entity> extends TableMetadataArgs {
	scopes: Array<ScopeQB<Entity>>
	scopesEnabled: boolean
}
