import mockData from "./mockData.json";

export type Person = {
  id: string;
  jobTitle: string;
  emailAddress: string;
  firstNameLastName: string;
};

let cursor = -1;
const size = 10;

function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

export default async function apiData(): Promise<Person[]> {
  await delay(1000);
  if (Math.random() > 0.7) {
    throw new Error("Something went wrong");
  }
  cursor += 1;
  const start = cursor * size;
  const end = cursor * size + size;
  return mockData.slice(start, end);
}
