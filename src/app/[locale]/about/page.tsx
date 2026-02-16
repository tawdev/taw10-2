import Navbar from "@/components/Navbar";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-20">
                <WhyUs />
            </div>
            <Footer />
        </main>
    );
}
