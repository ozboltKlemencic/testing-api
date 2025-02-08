import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Kontaktni obrazec</h1>
        <ContactForm />
      </div>
    </div>
  );
}