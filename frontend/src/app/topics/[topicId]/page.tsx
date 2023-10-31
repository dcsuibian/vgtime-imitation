export default function Topic({ params }: { params: { topicId: string } }) {
  return <main>{params.topicId}</main>
}
