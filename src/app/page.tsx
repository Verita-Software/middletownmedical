import { HeroBanner } from "@/components/home/hero-banner";
import { WaveDivider } from "@/components/home/wave-divider";
import { FeatureSectionTwoColumn } from "@/components/home/feature-section-two-column";
import { StatFeatureGrid } from "@/components/home/stat-feature-grid";
import { StatFeatureCard } from "@/components/home/stat-feature-card";
import { MyChartSection } from "@/components/home/mychart-section";
import { HomeFooter } from "@/components/home/home-footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroBanner />

      <WaveDivider />

      <FeatureSectionTwoColumn
        imageLeft={true}
        imageSrc="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt="Care team at Middletown Medical"
        heading="Your strength backed by expert care."
        body="With locations across the Hudson Valley and additional clinics throughout the region, Middletown Medical brings comprehensive primary and specialty care closer to home, offering patients a more connected, personal, and accessible care experience."
        buttonLabel="Explore our services"
        buttonHref="/services"
        badge="Middletown Medical"
      />

      <FeatureSectionTwoColumn
        imageLeft={false}
        imageSrc="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
        imageAlt="Telehealth visit at home"
        heading="Care that fits your real life"
        body="Get same-day telehealth care from home. Schedule a video visit and connect with a primary care provider in as little as 30 minutes."
        buttonLabel="Schedule a virtual visit"
        buttonHref="/resource/telemedicine"
      />

      <StatFeatureGrid>
        <StatFeatureCard
          imageSrc="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
          imageAlt="Provider with patient"
          title="Our Providers"
          description="When it comes to your health, you deserve a care team you can count on. Our trusted primary care and specialty providers deliver the care you need, close to home."
          buttonLabel="Find a Provider"
          buttonHref="/providers"
        />
        <StatFeatureCard
          imageSrc="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=800&auto=format&fit=crop"
          imageAlt="Immediate care"
          title="Immediate Care"
          description="We welcome walk-ins with extended hours. With same-day and next-day options, you can get back to feeling better sooner."
          buttonLabel="Find Care Now"
          buttonHref="#"
        />
        <StatFeatureCard
          imageSrc="https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=800&auto=format&fit=crop"
          imageAlt="Lab services"
          title="Lab & Imaging"
          description="Our lab and imaging locations are open for walk-ins, including routine blood work and COVID testing."
          buttonLabel="Find Location"
          buttonHref="#"
        />
      </StatFeatureGrid>

      <MyChartSection
        imageSrc="https://images.unsplash.com/photo-1565035812153-a190783dbc09?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt="Patient using MyChart"
        heading="MyChart Resources"
        body="From viewing test results and refilling prescriptions to receiving care virtually, MyChart offers existing patients easy access to your care team whenever and wherever you are."
        buttonLabel="Access MyChart"
        buttonHref="#"
      />

      <HomeFooter />
    </main>
  );
}
