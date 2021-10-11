import { DeleteQueryBuilder, ObjectLiteral, SelectQueryBuilder, UpdateQueryBuilder } from "typeorm"
import { ScopedTableMetadata } from "./table-metadata"

const GET_QUERY_COPY = "___scope_getQuery_copy___"

class SelectQB<Entity extends ObjectLiteral> extends SelectQueryBuilder<Entity> {
	getQuery(): string {
		this.___patchScopes___()
		return this[GET_QUERY_COPY]()
	}

	protected ___patchScopes___(): void {
		for (const table of this.expressionMap.aliases) {
			if (!table || !table.hasMetadata) continue
			const metadata = table.metadata.tableMetadataArgs as ScopedTableMetadata<Entity>
			if (metadata.scopes && metadata.scopesEnabled) {
				for (const scope of metadata.scopes) scope(this, table.name)
			} else if (metadata.scopesEnabled === false) {
				metadata.scopesEnabled = true
			}
		}
	}
}

class UpdateQB<Entity extends ObjectLiteral> extends UpdateQueryBuilder<Entity> {
	getQuery(): string {
		this.___patchScopes___()
		return this[GET_QUERY_COPY]()
	}

	protected ___patchScopes___(): void {
		for (const table of this.expressionMap.aliases) {
			if (!table || !table.hasMetadata) continue
			const metadata = table.metadata.tableMetadataArgs as ScopedTableMetadata<Entity>
			if (metadata.scopes && metadata.scopesEnabled) {
				for (const scope of metadata.scopes) scope(this, table.name)
			} else if (metadata.scopesEnabled === false) {
				metadata.scopesEnabled = true
			}
		}
	}
}

class DeleteQB<Entity extends ObjectLiteral> extends DeleteQueryBuilder<Entity> {
	getQuery(): string {
		this.___patchScopes___()
		return this[GET_QUERY_COPY]()
	}

	protected ___patchScopes___(): void {
		for (const table of this.expressionMap.aliases) {
			if (!table || !table.hasMetadata) continue
			const metadata = table.metadata.tableMetadataArgs as ScopedTableMetadata<Entity>
			if (metadata.scopes && metadata.scopesEnabled) {
				for (const scope of metadata.scopes) scope(this, table.name)
			} else if (metadata.scopesEnabled === false) {
				metadata.scopesEnabled = true
			}
		}
	}
}

export const patchQueryBuilder = () => {
	SelectQueryBuilder.prototype[GET_QUERY_COPY] = SelectQueryBuilder.prototype.getQuery
	for (const property of Object.getOwnPropertyNames(SelectQB.prototype)) {
		Object.defineProperty(SelectQueryBuilder.prototype, property, Object.getOwnPropertyDescriptor(SelectQB.prototype, property) as PropertyDescriptor)
	}

	UpdateQueryBuilder.prototype[GET_QUERY_COPY] = UpdateQueryBuilder.prototype.getQuery
	for (const property of Object.getOwnPropertyNames(UpdateQB.prototype)) {
		Object.defineProperty(UpdateQueryBuilder.prototype, property, Object.getOwnPropertyDescriptor(UpdateQB.prototype, property) as PropertyDescriptor)
	}

	DeleteQueryBuilder.prototype[GET_QUERY_COPY] = DeleteQueryBuilder.prototype.getQuery
	for (const property of Object.getOwnPropertyNames(DeleteQB.prototype)) {
		Object.defineProperty(DeleteQueryBuilder.prototype, property, Object.getOwnPropertyDescriptor(DeleteQB.prototype, property) as PropertyDescriptor)
	}
}
