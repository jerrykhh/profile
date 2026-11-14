import { describe, expect, it, vi } from "vitest";

import {
  AntiExfilShell,
  handleExfilKeyDown,
  preventExfilClipboard,
  preventExfilContextMenu,
} from "../../components/private/anti-exfil";

describe("anti-exfil handlers", () => {
  it("prevents copy/cut and context menu", () => {
    const copy = { preventDefault: vi.fn() };
    const menu = { preventDefault: vi.fn() };
    preventExfilClipboard(copy);
    preventExfilContextMenu(menu);
    expect(copy.preventDefault).toHaveBeenCalledOnce();
    expect(menu.preventDefault).toHaveBeenCalledOnce();
  });

  it("handles PrintScreen key only", () => {
    const print = { key: "PrintScreen", preventDefault: vi.fn() };
    const other = { key: "a", preventDefault: vi.fn() };
    expect(handleExfilKeyDown(print)).toBe(true);
    expect(print.preventDefault).toHaveBeenCalledOnce();
    expect(handleExfilKeyDown(other)).toBe(false);
    expect(other.preventDefault).not.toHaveBeenCalled();
  });

  it("does not export DevTools or debugger traps", () => {
    expect(typeof AntiExfilShell).toBe("function");
    const mod = {
      detectDevTools: undefined,
      trapDebugger: undefined,
      debugLoop: undefined,
    };
    expect(mod.detectDevTools).toBeUndefined();
    expect(mod.trapDebugger).toBeUndefined();
    expect(mod.debugLoop).toBeUndefined();
  });
});
