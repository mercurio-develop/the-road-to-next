import Link from "next/link";
import { ticketsPath } from "@/app/paths";
import { Heading } from "@/components/heading";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Home Page" description="Your home place to start"/>
      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()} className="underline">Go To Tickets</Link>
      </div>
    </div>
  );
};

export default HomePage;