import { act, renderHook } from "@testing-library/react";
import useMonth from "./useMonth";
describe("useMonth", () => {
  test("return current month and year", () => {
    const today = new Date();
    const { result } = renderHook(() => useMonth());
    expect(result.current.month).toBe(today.getMonth());
    expect(result.current.year).toBe(today.getFullYear());
  });
  test("update month and year when handleChangeMonth is called", () => {
    const { result } = renderHook(() => useMonth());
    act(() => {
      result.current.handleChangeMonth(2025, 7);
    });
    expect(result.current.year).toBe(2025);
    expect(result.current.month).toBe(7);
  });
});
