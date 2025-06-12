import init, { process_data } from "wasm-pedometer";

export async function filterData(data: string): Promise<number[]> {
  await init();
  return Array.from(process_data(data));
}
