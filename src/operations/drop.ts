import { Aspect, defineAspects } from './operation';
import { handleCallback } from '../utils';
import { CommandOperation, CommandOpOptions } from './command';
import type { Callback } from '../types';
import type { Server } from '../sdam/server';
import type { Db } from '../db';

export class DropCollectionOperation extends CommandOperation {
  name: string;

  constructor(db: Db, name: string, options: CommandOpOptions) {
    super(db, options);
    this.name = name;
  }

  execute(server: Server, callback: Callback): void {
    super.executeCommand(server, { drop: this.name }, (err, result) => {
      if (err) return handleCallback(callback, err);
      if (result.ok) return handleCallback(callback, null, true);
      handleCallback(callback, null, false);
    });
  }
}

export class DropDatabaseOperation extends CommandOperation {
  execute(server: Server, callback: Callback): void {
    super.executeCommand(server, { dropDatabase: 1 }, (err, result) => {
      if (err) return handleCallback(callback, err);
      if (result.ok) return handleCallback(callback, null, true);
      handleCallback(callback, null, false);
    });
  }
}

defineAspects(DropCollectionOperation, [Aspect.WRITE_OPERATION, Aspect.EXECUTE_WITH_SELECTION]);
defineAspects(DropDatabaseOperation, [Aspect.WRITE_OPERATION, Aspect.EXECUTE_WITH_SELECTION]);
