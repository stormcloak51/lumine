import { Card, Container, Flex, Skeleton } from '@mantine/core'

export default function Loading() {
  return (
    <Container p={0} className="box-border flex flex-col w-full">
      <Flex direction={'column'} className="gap-y-4">
        {[1, 2, 3, 4].map((index) => (
          <Card
            key={index}
            className="!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] w-full"
            withBorder
            shadow="sm"
            radius="md"
          >
            <div className="flex justify-start items-center">
              <div className="flex flex-row gap-x-4 items-center">
                <Skeleton height={40} circle />

                <div className="flex flex-row items-center gap-x-4">
                  <Skeleton height={20} width={120} radius="md" />
                  <Skeleton height={8} circle />
                  <Skeleton height={16} width={80} radius="md" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Skeleton height={8} radius="xl" mt={6} />
              <Skeleton height={8} radius="xl" mt={6} />
              <Skeleton height={8} width="70%" radius="xl" mt={6} />
            </div>
          </Card>
        ))}
      </Flex>
    </Container>
  )
}
