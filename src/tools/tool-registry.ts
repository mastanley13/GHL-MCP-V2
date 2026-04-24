/**
 * Tool Registry — auto-registers all tool modules and provides
 * unified lookup for definitions and execution routing.
 */
import { IToolModule, ToolDefinition } from './base-tool.js';

export class ToolRegistry {
  private modules: IToolModule[] = [];
  /** tool-name → module for O(1) dispatch */
  private toolMap: Map<string, IToolModule> = new Map();

  /** Register a tool module and index all its tool names */
  register(mod: IToolModule): void {
    this.modules.push(mod);
    for (const tool of mod.getToolDefinitions()) {
      if (this.toolMap.has(tool.name)) {
        console.warn(`[ToolRegistry] Duplicate tool name: ${tool.name} — last registration wins`);
      }
      this.toolMap.set(tool.name, mod);
    }
  }

  /** Register many modules at once */
  registerAll(...mods: IToolModule[]): void {
    for (const mod of mods) {
      this.register(mod);
    }
  }

  /** Get all tool definitions across every registered module */
  getAllTools(): ToolDefinition[] {
    const tools: ToolDefinition[] = [];
    for (const mod of this.modules) {
      tools.push(...mod.getToolDefinitions());
    }
    return tools;
  }

  /** Whether a tool name is known */
  has(toolName: string): boolean {
    return this.toolMap.has(toolName);
  }

  /** Execute a tool by name, routing to the correct module */
  async execute(toolName: string, args: Record<string, any>): Promise<any> {
    const mod = this.toolMap.get(toolName);
    if (!mod) {
      throw new Error(`Unknown tool: ${toolName}`);
    }
    return mod.executeTool(toolName, args);
  }

  /** Per-domain tool counts for health/info endpoints */
  getCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    let total = 0;
    for (const mod of this.modules) {
      const defs = mod.getToolDefinitions();
      const name = (mod.constructor as any).name || 'unknown';
      counts[name] = defs.length;
      total += defs.length;
    }
    counts['total'] = total;
    return counts;
  }
}
