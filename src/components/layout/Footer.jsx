import eyeSvg from "../../assets/eyeball.svg";

const Footer = () => {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <footer className="footer bg-gray-700 p-8 text-primary-content footer-center">
      <div>
        <img src={eyeSvg} alt="eye svg" width={30} height={30} />
        <p>Copyright &copy; {year} No Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
