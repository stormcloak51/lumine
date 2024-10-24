'use client';

import { Grid, Card, Skeleton, Flex } from '@mantine/core'

export default function Loading() {
  return (
    <div>
      <Grid className='w-full !p-0' gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}>
        {/* UserBanner Skeleton */}
        <Flex className='w-full relative' direction={'column'}>
          {/* Banner Image Skeleton */}
          <div className='w-full h-[200px] overflow-hidden'>
            <Skeleton height={200} className='rounded-t-xl' />
          </div>

          {/* User Info Card Skeleton */}
          <Card className='!bg-[#1f2124] rounded-b-lg border-b border-r border-l border-[rgb(66,66,66)] relative pl-[180px]'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='flex gap-x-2 items-center'>
                  <Skeleton height={20} width={200} radius="md" />
                  <Skeleton height={28} width={28} radius="md" />
                </div>
                <div className='flex gap-x-2'>
                  <Skeleton height={16} width={120} radius="md" />
                </div>
              </div>
              
            </div>
          </Card>

          <div className='absolute top-[130px] transform -translate-x-1/2 left-[10%]'>
            <Skeleton className='border border-[rgb(66,66,66)]' height={130} width={130} circle />
          </div>
        </Flex>

        <Grid.Col span={7.5} className='pt-4'>
          <Card className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] mb-4'>
            <div className='flex items-center gap-x-4'>
              <Skeleton height={40} width="100%" radius="md" />
            </div>
          </Card>

          {[1].map((index) => (
            <Card key={index} className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] mb-4'>
              <div className='flex items-center gap-x-4 mb-4'>
                <Skeleton height={40} width={40} circle />
                <div className='flex-1'>
                  <Skeleton height={20} width={150} radius="md" mb={8} />
                  <Skeleton height={16} width={100} radius="md" />
                </div>
              </div>
							<Skeleton height={16} width="90%" radius="md" mt={4} />
              <Skeleton height={16} width="75%" radius="md" mt={4} />
              <Skeleton height={200} radius="md" mt={8} />
            </Card>
          ))}
        </Grid.Col>

        {/* FollowerSection Skeleton */}
        <Grid.Col className='px-0 pt-4' span={4} offset={0.5}>
          <Card className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] !py-[12px]'>
            <Skeleton height={24} width={120} radius="md" mb={3} />
            <div className='flex gap-2 mt-4'>
              {[1, 2, 3, 4].map((index) => (
                <Skeleton key={index} height={46} width={46} circle />
              ))}
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  )
}