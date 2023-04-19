import { VirtualScroll } from "./VirtualScroll";

export function App() {
  return (
    <main className="h-[100dvh] p-4 space-y-4">
      <h1 className="text-4xl">React virtual scroll example</h1>
      <VirtualScroll />
    </main>
  );
}
