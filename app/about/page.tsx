import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - ZeeBussiness</title>
        <meta name="description" content="Learn more about ZeeBussiness, our mission, and what we stand for." />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
        <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            About ZeeBussiness
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At ZeeBussiness, our mission is to empower individuals and bussinesses with timely, accurate, and insightful information to navigate the complex world of finance and commerce. We believe that informed decisions lead to greater success, and we are dedicated to providing the tools and knowledge necessary to achieve that.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ZeeBussiness is a leading platform dedicated to delivering comprehensive bussiness news, market analysis, and financial insights. Founded on the principles of integrity and clarity, we strive to be your trusted source for everything related to the global economy. Our team comprises seasoned financial analysts, market experts, and dedicated journalists committed to bringing you the most relevant and impactful stories.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We cover a broad spectrum of topics, including stock markets, corporate news, economic trends, personal finance, and entrepreneurship. Our goal is to break down complex financial concepts into understandable information, making it accessible to both seasoned investors and beginners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be the most reliable and influential voice in the bussiness and financial media landscape, fostering a community of economically literate and empowered individuals worldwide. We envision a future where everyone has the knowledge to make sound financial decisions and contribute to a thriving global economy.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
