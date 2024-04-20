import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center p-12">
      <h1 className="text-lg p-6">
        <p>{"Landing page here :)"}</p>
      </h1>
      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
