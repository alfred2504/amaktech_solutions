import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">ABOUT AMAKTECH</span>

          <h1>
            Technology, creativity and ideas
            <span> working together.</span>
          </h1>

          <p>
            AmakTech Solutions is a technology and creative services company
            providing professional digital and creative solutions to
            individuals, businesses, organizations and institutions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="section-label">WHO WE ARE</span>

            <h2>Creative solutions backed by technology.</h2>
          </div>

          <div>
            <p>
              AmakTech Solutions provides professional graphic design,
              digital branding, business design materials, website
              development, software development and technology solutions.
            </p>

            <p>
              We believe that good technology should not only work well,
              but should also communicate clearly, look professional and
              create meaningful value for its users.
            </p>

            <p>
              Our approach combines creativity, technical thinking and
              professional execution to help our clients turn ideas into
              practical digital solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container about-grid">
          <div>
            <span className="section-label">OUR MISSION</span>

            <h2>
              Helping people and businesses grow through digital solutions.
            </h2>
          </div>

          <div>
            <p>
              To provide innovative, professional and accessible digital
              and creative solutions that help individuals, businesses
              and organizations build strong brands, communicate
              effectively and grow.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="section-label">OUR VISION</span>

            <h2>A trusted technology and creative solutions company.</h2>
          </div>

          <div>
            <p>
              To become a trusted technology and creative solutions company
              known for quality, innovation, professionalism and impactful
              digital solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading centered">
            <span className="section-label">OUR VALUES</span>

            <h2>What guides our work.</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <h3>Innovation</h3>
              <p>
                Exploring modern ideas and technologies to solve real
                problems.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3>Quality</h3>
              <p>
                Delivering work with attention to detail and professional
                standards.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3>Professionalism</h3>
              <p>
                Building trust through reliable communication and service.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3>Creativity</h3>
              <p>
                Combining creative thinking with practical digital
                solutions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">05</div>
              <h3>Integrity</h3>
              <p>
                Working honestly and responsibly with our clients and
                partners.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">06</div>
              <h3>Reliability</h3>
              <p>
                Providing dependable solutions and professional support.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">07</div>
              <h3>Customer Satisfaction</h3>
              <p>
                Understanding client needs and focusing on useful,
                practical results.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">08</div>
              <h3>Continuous Learning</h3>
              <p>
                Continuously improving our skills, knowledge and
                technology capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section founder-section">
        <div className="container founder-grid">
          <div className="founder-image founder-placeholder">
            <span>AM</span>
          </div>

          <div className="founder-content">
            <span className="section-label">FOUNDER & DEVELOPER</span>

            <h2>Alfred Makura</h2>

            <p>
              Alfred Makura is the founder of AmakTech Solutions, a
              software engineering graduate and frontend developer with
              a growing focus on full-stack software engineering and
              digital product development.
            </p>

            <p>
              His technical journey includes frontend development
              specialization through ALX and frontend development
              training through Chris DesignX Academy.
            </p>

            <Link href="/contact" className="btn btn-primary">
              Work With AmakTech
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}