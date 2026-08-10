import Navbar from '../components/public/Navbar.jsx'
import Hero from '../components/public/Hero.jsx'
import CatalogSection from '../components/public/CatalogSection.jsx'
import PriceTable from '../components/public/PriceTable.jsx'
import WhyUs from '../components/public/WhyUs.jsx'
import TermsSection from '../components/public/TermsSection.jsx'
import FAQSection from '../components/public/FAQSection.jsx'
import ContactSection from '../components/public/ContactSection.jsx'
import Footer from '../components/public/Footer.jsx'
import { useCars } from '../hooks/useCars.js'
import { useRates } from '../hooks/useRates.js'
import { useSettings } from '../hooks/useSettings.js'

export default function LandingPage() {
  const { cars, loading } = useCars()
  const { rates, loading: ratesLoading } = useRates()
  const { settings } = useSettings()
  const whatsappNumber = settings?.whatsapp_number

  return (
    <div className="min-h-screen bg-mist">
      <Navbar whatsappNumber={whatsappNumber} />
      <Hero />
      <CatalogSection cars={cars} loading={loading} whatsappNumber={whatsappNumber} />
      <PriceTable rates={rates} loading={ratesLoading} whatsappNumber={whatsappNumber} />
      <WhyUs />
      <TermsSection />
      <FAQSection />
      <ContactSection />
      <Footer whatsappNumber={whatsappNumber} />
    </div>
  )
}
