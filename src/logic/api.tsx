

async function getData(name: string): Promise<any> {
    const url = `https://api.agify.io/?name=${name}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch data (${res.status} ${res.statusText})`);
    }

    return res.json()
}

   
export default async function Api(name: string): Promise<any> {
  const data = await getData(name);
  return data;
}



  