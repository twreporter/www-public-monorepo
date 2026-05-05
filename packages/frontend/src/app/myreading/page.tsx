import { MyReading } from '@/components/my-reading'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ empty?: string }>
}) {
  const { empty } = await searchParams
  return <MyReading isEmpty={empty !== undefined} />
}
