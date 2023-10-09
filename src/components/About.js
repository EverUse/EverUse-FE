// ABOUT COMPONENT //

const About = ({setOpen}) => {
  return (
    <section className="about" id="about" onClick={() => {setOpen(false)}}>
      <div className="about__header">
        <h2 className="about__header-text">About Us</h2>
      </div>
      <div className="about__description">
        <p className="about__description-text">EverUse aims to partner with gyms, retailers, and manufacturers throughout the climbing industry to collect and upcycle used climbing rope into high-quality products. We aim to reduce waste, extend the lifespan of climbing rope, and minimize the environmental footprint of the climbing industry. By offering sustainable products, we strive to become the go-to brand for climbers who are passionate about both their sport and the planet. We aim to form partnerships and provide funding to organizations that are dedicated to maintaining access, restoration, and safety in climbing.</p>
      </div>
    </section>
  )
};

export default About;