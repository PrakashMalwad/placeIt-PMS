

const statistics = () => {
  // These values can be fetched from an API or passed as props
  const data = {
    totalDrives: 120,
    jobOffers: 300,
    resumes: 150,
    dailyUsers: 75
  };

  return (
    <section id="statistics" className="statistics py-10">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h1>Our Statistics</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="small-box bg-blue-500 p-4 text-white text-center rounded">
            <h3>{data.totalDrives}</h3>
            <p>Total Drives</p>
          </div>
          <div className="small-box bg-green-500 p-4 text-white text-center rounded">
            <h3>{data.jobOffers}</h3>
            <p>Job Offers</p>
          </div>
          <div className="small-box bg-yellow-500 p-4 text-white text-center rounded">
            <h3>{data.resumes}</h3>
            <p>CV /Resume</p>
          </div>
          <div className="small-box bg-red-500 p-4 text-white text-center rounded">
            <h3>{data.dailyUsers}</h3>
            <p>Daily Users</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default statistics;
