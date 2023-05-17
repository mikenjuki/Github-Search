const About = () => {
  return (
    <div>
      <h1 className="text-6xl mb-4">GitHub Finder</h1>
      <p className="mb-4 text-2xl font-light">
        A React app to search GitHub profiles and see profile details. To see
        more of my work, chekout my
        <a
          href="https://github.com/mikenjuki"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <span className=" link-primary link-hover">GitHub</span>
        </a>
      </p>
      <p className="text-lg text-gray-400">
        Version <span className="text-white">1.0.0</span>
      </p>
      <p className="text-lg text-gray-400">
        Project By:
        <a className="text-white" href="https://twitter.com/hassibmoddasser">
          {" "}
          Michael Njuki
        </a>
      </p>
    </div>
  );
};

export default About;
