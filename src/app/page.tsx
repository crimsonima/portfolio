import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js (App Router)!</h1>
      <Link href="/gof">game of life</Link>
    </div>
  );
}
