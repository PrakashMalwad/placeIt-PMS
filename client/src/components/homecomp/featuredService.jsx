

const featuredService = () => {
  const services = [
    {
      icon: 'bi bi-activity',
      title: 'Login',
      description: 'Students can login using their credentials.',
      link: '#'
    },
    {
      icon: 'bi bi-bounding-box-circles',
      title: 'Register',
      description: 'Register yourself here.',
      link: './register-candidates.php'
    },
    {
      icon: 'bi bi-calendar4-week',
      title: 'Look for companies',
      description: 'You can search for companies.',
      link: '#'
    },
    {
      icon: 'bi bi-broadcast',
      title: 'Apply for Drives',
      description: 'Look for eligibility criteria and apply for companies accordingly.',
      link: '#'
    }
  ];

  return (
    <section id="featured-services" className="featured-services py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="service-item bg-white p-6 rounded shadow">
              <div className="icon mb-4">
                <i className={`${service.icon} icon text-blue-500 text-2xl`}></i>
              </div>
              <h4 className="text-lg font-semibold mb-2">
                <a href={service.link} className="text-blue-700 hover:underline">{service.title}</a>
              </h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default featuredService;
