type Handler = (event: object, context: object) => unknown;
type Command = { handler: (args: string, context: object) => unknown };

export class OmpSpy {
  private readonly handlers = new Map<string, Handler>();
  private readonly commands = new Map<string, Command>();

  on(name: string, handler: Handler): void {
    this.handlers.set(name, handler);
  }

  registerCommand(name: string, command: Command): void {
    this.commands.set(name, command);
  }

  startSession(context: object): unknown {
    return this.handlers.get("session_start")?.({}, context);
  }

  runCommand(name: string, context: object): unknown {
    return this.commands.get(name)?.handler("", context);
  }
}
