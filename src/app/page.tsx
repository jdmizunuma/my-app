import Header from '@components/header'
import Body from '@components/body'

const url = 'https://api.agify.io/?name';

async function fetchAge(nameToQuery: string): Promise<number> {
  "use server";
  try {
    const dynamicData = await fetch(`${url}=${nameToQuery}`, { cache: 'no-store' });
    const data = await dynamicData.json();
    return data.age || -1;
  } catch (error) {
    console.error("Error fetching age:", error);
    return -1;
  }
}

export default function Home() { 
  return (
    <main className="bg-pink-600 text-white flex flex-col min-h-screen font-sans">
      <Header />
      <Body fetchAge={fetchAge} />
    </main>
  );
}
