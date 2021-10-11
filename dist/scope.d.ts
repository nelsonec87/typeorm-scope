import { Connection, ObjectType } from "typeorm";
import { ScopeQB } from "./table-metadata";
export declare function Scope<Entity>(scopes: Array<ScopeQB<Entity>>, enabled?: boolean): Function;
export declare function unscoped<Entity>(connection: Connection, target: ObjectType<Entity>): ObjectType<Entity>;
