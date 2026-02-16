import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-20">
                <Services />
            </div>
            <Footer />
        </main>
    );
}
