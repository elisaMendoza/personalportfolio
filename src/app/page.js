import Header from '../components/Header';
import SocialLinks from '../components/SocialLinks';
import Projects from '../components/Projects';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 0%, #001f3f 0%, #000 100%)',
      color: '#fff',
      fontFamily: 'Orbitron, Roboto, sans-serif',
      boxShadow: '0 0 80px #0ff8 inset',
    }}>
      <Header />
      <SocialLinks />
      <Projects />
    </div>
  );
}