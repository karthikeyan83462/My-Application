import styled from 'styled-components';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const TIMELINE_ZIG = [
  {
    icon: '🦄',
    title: '2023 - Present',
    subtitle: 'Indie Hacker & Educator',
    desc: 'Building courses and tools for developers, focusing on interactivity and fun.',
    details: 'Launched interactive courses, built indie SaaS, and grew a developer community. Featured in major dev publications.'
  },
  {
    icon: '💼',
    title: '2021 - 2023',
    subtitle: 'Senior Staff Software Engineer',
    desc: 'Worked at Gatsby, DigitalOcean, and Khan Academy, leading teams and building products.',
    details: 'Led cross-functional teams, shipped high-impact features, and mentored junior engineers. Spoke at international conferences.'
  },
  {
    icon: '🎓',
    title: '2019 - 2021',
    subtitle: 'Web Dev Instructor',
    desc: 'Taught web development fundamentals at Concordia University and online.',
    details: 'Developed curriculum, taught hundreds of students, and created interactive learning tools.'
  },
  {
    icon: '🌱',
    title: '2019',
    subtitle: 'Started my web journey',
    desc: 'Discovered my love for building things on the web and never looked back.',
    details: 'Built my first website, fell in love with code, and started sharing my journey online.'
  },
];

export default function AboutPage() {
  const [heightMetric, setHeightMetric] = useState(false);
  const [powerOn, setPowerOn] = useState(false);
  const [catPetted, setCatPetted] = useState(false);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const handleToggleHeight = () => setHeightMetric((h) => !h);
  const handlePower = () => setPowerOn((on) => !on);
  const handlePetCat = () => {
    setCatPetted(true);
    setTimeout(() => setCatPetted(false), 800);
  };
  const playSound = (sound: string) => {
    // Placeholder: You can add real sound files later
    alert(`Play sound: ${sound}`);
  };

  useEffect(() => {
    if (showConfetti) {
      const timeout = setTimeout(() => setShowConfetti(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [showConfetti]);

  return (
    <AboutContainer>
      <Heading
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hi there! I&apos;m Karthikeyan.
      </Heading>
      <Subheading
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        I started building on the web in 2007 and never stopped. These days, I&apos;m a solo indie hacker focused on empowering up-and-coming software developers.
      </Subheading>
      <CardGrid>
        {/* Pronunciation Card */}
        <Card>
          <CardImage>🔊</CardImage>
          <b>Pronunciation</b>
          <div>Comeau = Hello</div>
          <FunButton onClick={() => alert('Play pronunciation audio')}>Play</FunButton>
          <div style={{ fontSize: '0.95rem', color: '#888', marginTop: 8 }}>Click to hear a robot say it.</div>
        </Card>
        {/* Height Card */}
        <Card>
          <CardImage>📏</CardImage>
          <b>Height</b>
          <div style={{ fontSize: '1.2rem', margin: '8px 0' }}>{heightMetric ? '188cm' : '6&#39;2&quot;'}</div>
          <FunButton onClick={handleToggleHeight} aria-label="Toggle height units">Toggle</FunButton>
          <div style={{ fontSize: '0.95rem', color: '#888', marginTop: 8 }}>For some reason, this surprises a lot of people. 😅</div>
        </Card>
        {/* Location Card with Map */}
        <Card>
          <MapImage src="https://maps.googleapis.com/maps/api/staticmap?center=Montreal,Canada&zoom=10&size=220x120&key=YOUR_API_KEY" alt="Map of Montréal" />
          <b>Location</b>
          <div>Montréal, Canada</div>
          <div style={{ fontSize: '0.95rem', color: '#888', marginTop: 8 }}>A predominantly francophone city in eastern Canada. It&apos;s freezing in the winter and surprisingly hot in the summer.</div>
        </Card>
        {/* Soundboard Card */}
        <Card>
          <CardImage>🥁</CardImage>
          <b>Soundboard</b>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
            <SoundButton onClick={() => playSound('kick')}>Q</SoundButton>
            <SoundButton onClick={() => playSound('hihat')}>W</SoundButton>
            <SoundButton onClick={() => playSound('snare')}>E</SoundButton>
            <SoundButton onClick={() => playSound('cowbell')}>R</SoundButton>
          </div>
          <div style={{ fontSize: '0.95rem', color: '#888', marginTop: 8 }}>Play a sound! (Q, W, E, R)</div>
        </Card>
        {/* Power Toggle Card */}
        <Card>
          <CardImage>{powerOn ? '🟢' : '⚪'}</CardImage>
          <b>Toggle Power</b>
          <PowerButton onClick={handlePower}>{powerOn ? 'On' : 'Off'}</PowerButton>
          <div style={{ fontSize: '0.95rem', color: '#888', marginTop: 8 }}>This is a purely cosmetic effect.</div>
        </Card>
        {/* Cat Card */}
        <Card>
          <PetCat onClick={handlePetCat} aria-label="Pet the cat">{catPetted ? '😻' : '🐱'}</PetCat>
          <b>Cat Person</b>
          <div>Allergic, but owns lots of cat shirts.</div>
        </Card>
        {/* Open Source Card */}
        <Card>
          <CardImage>🛠️</CardImage>
          <b>Open Source</b>
          <div>
            <a href="https://github.com/joshwcomeau/use-sound" target="_blank" rel="noopener noreferrer">use-sound</a>,{' '}
            <a href="https://github.com/joshwcomeau/react-flip-move" target="_blank" rel="noopener noreferrer">react-flip-move</a>
          </div>
          <div style={{ fontSize: '0.95rem', color: '#888', marginTop: 8 }}>~600,000 downloads/month</div>
        </Card>
        {/* Courses Card */}
        <Card>
          <CardImage>📚</CardImage>
          <b>Courses</b>
          <div>
            <a href="https://joyofreact.com/" target="_blank" rel="noopener noreferrer">The Joy of React</a><br />
            <a href="https://css-for-js.dev/" target="_blank" rel="noopener noreferrer">CSS for JavaScript Devs</a>
          </div>
          <div style={{ fontSize: '0.95rem', color: '#888', marginTop: 8 }}>28,069 developers have registered!</div>
        </Card>
      </CardGrid>
      <TimelineFullWidthWrapper>
        <TimelineZigZag>
          <TimelineZigTrack>
            {TIMELINE_ZIG.map((item, idx) => {
              const above = idx % 2 === 0;
              return (
                <React.Fragment key={item.title}>
                  <ZigMilestone
                    $above={above}
                    whileHover={{ scale: 1.09, rotate: above ? -3 : 3 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: above ? -40 : 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    onClick={() => { setModalIdx(idx); setShowConfetti(true); }}
                  >
                    <ZigDot
                      style={above ? { top: '-2.7rem' } : { bottom: '-2.7rem' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                    >
                      {item.icon}
                    </ZigDot>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: above ? 36 : 24 }}>{item.title}</div>
                    <div style={{ color: '#60a5fa', fontWeight: 600, margin: '4px 0 8px 0' }}>{item.subtitle}</div>
                    <div style={{ color: '#888', fontSize: '0.98rem' }}>{item.desc}</div>
                  </ZigMilestone>
                  {idx < TIMELINE_ZIG.length - 1 && (
                    <ZigConnector
                      initial={{ opacity: 0, x: above ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.13 }}
                      style={{ top: above ? '5.5rem' : 'auto', bottom: above ? 'auto' : '5.5rem' }}
                    >
                      <svg viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d={above ? 'M0,24 Q28,0 56,24' : 'M0,0 Q28,24 56,0'} stroke="#60a5fa" strokeWidth="4" fill="none" />
                      </svg>
                    </ZigConnector>
                  )}
                </React.Fragment>
              );
            })}
          </TimelineZigTrack>
          {/* Parallax floating SVGs */}
          <motion.div
            style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
            animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 12 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="80" cy="60" r="18" fill="#f472b6" fillOpacity="0.18" />
              <circle cx="400" cy="30" r="12" fill="#60a5fa" fillOpacity="0.13" />
              <circle cx="700" cy="90" r="16" fill="#f472b6" fillOpacity="0.12" />
            </svg>
          </motion.div>
        </TimelineZigZag>
      </TimelineFullWidthWrapper>
      {showConfetti && (
        <ConfettiBurst
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2 }}
        >
          🎉✨🎊
        </ConfettiBurst>
      )}
      {modalIdx !== null && (
        <TimelineModalBackdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalIdx(null)}
        >
          <TimelineModal
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{TIMELINE_ZIG[modalIdx].icon}</div>
            <div style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: 6 }}>{TIMELINE_ZIG[modalIdx].title}</div>
            <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 10 }}>{TIMELINE_ZIG[modalIdx].subtitle}</div>
            <div style={{ color: '#888', fontSize: '1.05rem', marginBottom: 18 }}>{TIMELINE_ZIG[modalIdx].desc}</div>
            <div style={{ color: '#222', fontSize: '1.08rem', marginBottom: 8 }}>{TIMELINE_ZIG[modalIdx].details}</div>
            <FunButton onClick={() => setModalIdx(null)} style={{ marginTop: 10 }}>Close</FunButton>
          </TimelineModal>
        </TimelineModalBackdrop>
      )}
      <StorySection>
        <StoryHeading>My Story</StoryHeading>
        <StoryText>
          Placeholder
        </StoryText>
      </StorySection>
    </AboutContainer>
  );
} 

const AboutContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 64px 16px 96px 16px;
`;

const Heading = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
`;

const Subheading = styled(motion.p)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2.5rem;
`;

const StorySection = styled.section`
  margin: 3rem 0 2.5rem 0;
`;

const StoryHeading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
`;

const StoryText = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
`;

const FunButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
  margin-left: 0.5rem;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    transform: scale(1.08) rotate(-2deg);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px 0 rgba(60, 120, 240, 0.10);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  min-height: 180px;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px) scale(1.03) rotate(-1deg);
    box-shadow: 0 8px 32px 0 rgba(60, 120, 240, 0.18);
  }
`;

const CardImage = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const MapImage = styled.img`
  width: 100%;
  max-width: 220px;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
`;

const SoundButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.3rem;
  margin: 0 0.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.1) rotate(-4deg);
  }
`;

const PowerButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    transform: scale(1.1) rotate(-6deg);
  }
`;

const PetCat = styled.button`
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: transform 0.2s;
  &:active {
    transform: scale(1.2) rotate(10deg);
  }
`;

// Confetti component (simple SVG burst)
const ConfettiBurst = styled(motion.div)`
  position: fixed;
  left: 50%;
  top: 50%;
  pointer-events: none;
  z-index: 9999;
  font-size: 3rem;
  transform: translate(-50%, -50%);
`;

const TimelineModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimelineModal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(60, 120, 240, 0.18);
  padding: 2.5rem 2rem 2rem 2rem;
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
  position: relative;
`;

const TimelineFullWidthWrapper = styled.div`
  position: relative;
  width: 100%;
  background: none;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const TimelineZigZag = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 3rem auto 2.5rem auto;
  position: relative;
`;

const TimelineZigTrack = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;
  position: relative;
  padding: 3rem 0 3rem 0;
  justify-content: center;
  margin: 0 auto;
`;

const ZigMilestone = styled(motion.div)<{ $above: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 1.25rem;
  box-shadow: 0 2px 12px 0 rgba(60, 120, 240, 0.10);
  padding: 1.5rem 1.5rem 1.2rem 1.5rem;
  min-width: 180px;
  max-width: 260px;
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  cursor: pointer;
  margin-top: ${({ $above }) => ($above ? '0' : '3rem')};
  margin-bottom: ${({ $above }) => ($above ? '3rem' : '0')};
  transition: transform 0.18s, box-shadow 0.18s;
  &:hover {
    transform: translateY(-10px) scale(1.07) rotate(-2deg);
    box-shadow: 0 8px 32px 0 rgba(60, 120, 240, 0.18);
  }
`;

const ZigDot = styled(motion.div)`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa 0%, #f472b6 100%);
  border: 4px solid #fff;
  box-shadow: 0 2px 12px 0 rgba(60, 120, 240, 0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
`;

const ZigConnector = styled(motion.div)`
  position: absolute;
  left: 50%;
  width: 3.5rem;
  height: 2.5rem;
  z-index: 1;
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;
