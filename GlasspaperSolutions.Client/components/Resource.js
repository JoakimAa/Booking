import useGetResourceById from '@/hooks/useGetResourceById'

export default function Resource({ resource }) {
  const [resourceById] = useGetResourceById(resource?.resourceId)

  return (
    <>
      <p>{resourceById?.name}</p>
    </>
  )
}
