import Dashboard from '@/components/Dashboard';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';

export default function Home() {
  return (
    <>
      <BackgroundBeamsWithCollision>
        <Dashboard />
      </BackgroundBeamsWithCollision>
    </>
  );
}
