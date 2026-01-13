import { redirect } from 'next/navigation';

export default function Home() {
  const now = new Date();
  const year = now.getFullYear();
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const month = months[now.getMonth()];

  redirect(`/${year}/${month}`);
}
