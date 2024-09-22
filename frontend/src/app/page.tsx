import { Button, Container, Title } from '@mantine/core';

export default function Home() {
  return (
    <Container>
      <Title order={1}>Welcome to Mantine with Next.js</Title>
      <Button>Click me</Button>
    </Container>
  );
}