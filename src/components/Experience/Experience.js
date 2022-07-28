/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */

import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import ExperienceTitle from "./ExperienceTitle";

import "./Experience.scss";

class Experience extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTab: "work",

      renderAnimation: false,
      comeFromBelow: "",
      comeFromBelowDelayed: "",

      renderGridAnimation: "",
      visible: "invisible",

      expandItem0: false,
      expandItem1: false,
      expandItem2: false,
      expandItem3: false,
      expandItem4: false
    };

    this.selectTab = this.selectTab.bind(this);
  }

  componentDidUpdate() {
    const { refinview } = this.props;
    const { renderAnimation } = this.state;

    if (refinview === "experience" && !renderAnimation) {
      this.setState({
        comeFromBelow: "come-from-below",
        comeFromBelowDelayed: "come-from-below-delayed",
        renderAnimation: true,
        visible: "visible"
      });
    }
  }

  selectTab(target) {
    this.setState({
      selectedTab: target,
      renderGridAnimation: "come-from-below-fast"
    });
  }

  expandWork(item) {
    const { expandItem0, expandItem1, expandItem2, expandItem3, expandItem4 } =
      this.state;
    if (item === 0) this.setState({ expandItem0: !expandItem0 });
    if (item === 1) this.setState({ expandItem1: !expandItem1 });
    if (item === 2) this.setState({ expandItem2: !expandItem2 });
    if (item === 3) this.setState({ expandItem3: !expandItem3 });
    if (item === 4) this.setState({ expandItem4: !expandItem4 });
  }

  render() {
    const {
      selectedTab,
      comeFromBelow,
      comeFromBelowDelayed,
      renderGridAnimation,
      visible,
      expandItem0,
      expandItem1,
      expandItem2,
      expandItem3,
      expandItem4
    } = this.state;
    const { headerTextHighlightRef, refinview } = this.props;

    const workItems = [
      <div key={0} className="experience--item-general-box">
        <p className="experience--item-general-box-title">
          IBM UK
          <br />
          Cloud developer
        </p>
        <p className="experience--item-general-box-date">
          (Jul 2019 - Sept 2020)
        </p>
        <div className="experience--item-general-box-description">
          - Returning intern, resumed work as usual
          <br />
          - Cloud integration and deployment
          <br />
          - Client interactions and out-of-hours service maintenance
          <br />- Side projects, developing new platforms, and patent filing
          {expandItem0 ? (
            <div className="experience--item-general-box-description">
              As a returning developer, I immediately synchronised with the
              team, and resumed work. I contributed to the integration to a new
              cloud platform and deployment new services. Also, I had the
              opportunity to discuss with current and potential clients and
              operate the out-of-hours service maintenance. Additionally, I
              attended several side-projects, developing new internal platforms.
              I succesfully filed a patent.
            </div>
          ) : null}
          <button
            type="button"
            className="experience--item-box-see-more"
            onClick={() => this.expandWork(0)}
          >
            <div className="experience--item-box-see-more-bar" />
            <div className="experience--item-box-see-more-text">
              {expandItem0 ? <p>See less</p> : <p>See more</p>}
            </div>
          </button>
        </div>
      </div>,
      <div key={1} className="experience--item-general-box">
        <p className="experience--item-general-box-title">
          Software Developer Freelancer
        </p>
        <p className="experience--item-general-box-date">
          (Sept 2020 - Present)
        </p>
        <div className="experience--item-general-box-description">
          - Architectural understanding and implementation
          <br />
          - Continous testing, integration and deployment
          <br />- Communication, presentation and flexibility
          {expandItem1 ? (
            <div className="experience--item-general-box-description">
              During this time, I developed full-stack web applications,
              implementing testing, continuous integration, and deployment into
              the cloud. Moreover, I further developed excellent communication
              skills, by collaborating with new clients.
            </div>
          ) : null}
          <button
            type="button"
            className="experience--item-box-see-more"
            onClick={() => this.expandWork(1)}
          >
            <div className="experience--item-box-see-more-bar" />
            <div className="experience--item-box-see-more-text">
              {expandItem1 ? <p>See less</p> : <p>See more</p>}
            </div>
          </button>
        </div>
      </div>,
      <div key={2} className="experience--item-general-box">
        <p className="experience--item-general-box-title">
          IBM UK
          <br />
          (internship)
        </p>
        <p className="experience--item-general-box-date">
          (Jul 2017 - Aug 2018)
        </p>
        <div className="experience--item-general-box-description">
          - Adapting to a team of professionals
          <br />
          - Automation, documentation and monitoring
          <br />- Extension of internship and invitation to return
          {expandItem2 ? (
            <div className="experience--item-general-box-description">
              As an intern, I was introduced to working with a team of
              professionals and adapting quickly to a new environment. In the
              beginning, I was developing automation and monitoring scripts, and
              by the end reaching the point of being an integral part of the
              team. I obtained an extension to the internship, and I was invited
              to return as a graduate.
            </div>
          ) : null}
          <button
            type="button"
            className="experience--item-box-see-more"
            onClick={() => this.expandWork(2)}
          >
            <div className="experience--item-box-see-more-bar" />
            <div className="experience--item-box-see-more-text">
              {expandItem2 ? <p>See less</p> : <p>See more</p>}
            </div>
          </button>
        </div>
      </div>
    ];

    const educationItems = [
      <div key={3} className="experience--item-general-box">
        <p className="experience--item-general-box-title">
          Coventry University
          <br />
          BSc Computer Science
        </p>
        <p className="experience--item-general-box-date">
          (Oct 2015 - Jun 2018)
        </p>
        <div className="experience--item-general-box-description">
          - Data structures, algorithm and database architecture
          <br />
          - First full-stack web applications developed
          <br />- Final year project working with big data
          {expandItem3 ? (
            <div className="experience--item-general-box-description">
              As a student, I significantly developed my programming skills,
              learning data structures, algorithms, and database architecture.
              In addition, I improved my problem-solving skills, developed
              full-stack applications and submitted the final year project in
              big data.
            </div>
          ) : null}
          <button
            type="button"
            className="experience--item-box-see-more"
            onClick={() => this.expandWork(3)}
          >
            <div className="experience--item-box-see-more-bar" />
            <div className="experience--item-box-see-more-text">
              {expandItem3 ? <p>See less</p> : <p>See more</p>}
            </div>
          </button>
        </div>
      </div>,
      <div key={4} className="experience--item-general-box">
        <p className="experience--item-general-box-title">
          Traian High School
          <br />
          Science and Math
        </p>
        <p className="experience--item-general-box-date">
          (Sept 2012 - Jun 2015)
        </p>
        <div className="experience--item-general-box-description">
          - Increased passion and curiosity for technology
          <br />
          - Practical problem-solving
          <br />- Communication, presenting and volunteering
          {expandItem4 ? (
            <div className="experience--item-general-box-description">
              My passion and curiosity for technology were greatly nourished
              during this time. Being always inclined to discover and problem
              solve, I have participated in numerous extracurricular activities
              and contests. I was able to develop my communication skills, by
              presenting projects, publically speaking and participating in
              volunteering activities.
            </div>
          ) : null}
          <button
            type="button"
            className="experience--item-box-see-more"
            onClick={() => this.expandWork(4)}
          >
            <div className="experience--item-box-see-more-bar" />
            <div className="experience--item-box-see-more-text">
              {expandItem4 ? <p>See less</p> : <p>See more</p>}
            </div>
          </button>
        </div>
      </div>
    ];

    return (
      <div
        className={`experience ${visible}`}
        id="experience"
        refinview={refinview}
      >
        <section className="experience--center-flex">
          <MediaQuery maxWidth={912}>
            <ExperienceTitle
              mode="mobile"
              headerTextHighlightRef={headerTextHighlightRef}
              refinview={refinview}
            />
            <div className="experience--description" />
            <div className={`experience--btn-group ${comeFromBelow} `}>
              <button
                className={`main-btn-style experience--btn-tab ${
                  selectedTab === "work" ? "cyan-btn-selected" : null
                }`}
                type="button"
                onClick={() => this.selectTab("work")}
              >
                <p>Work</p>
              </button>

              <button
                className={`main-btn-style experience--btn-tab ${
                  selectedTab === "education" ? "cyan-btn-selected" : null
                }`}
                type="button"
                onClick={() => this.selectTab("education")}
              >
                <p>Education</p>
              </button>
            </div>
            {selectedTab === "work" ? (
              <div className="experience--item-description">
                {workItems.map((item) => (
                  <div
                    key={item.key}
                    className={`experience--item-description ${
                      renderGridAnimation || comeFromBelowDelayed
                    } `}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <div className="experience--item-description">
                {educationItems.map((item) => (
                  <div
                    key={item.key}
                    className={`experience--item-description ${
                      renderGridAnimation || comeFromBelowDelayed
                    } `}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </MediaQuery>
          <MediaQuery minWidth={913}>
            <div className="two-rows">
              <div className="first-row">
                <ExperienceTitle
                  mode="desktop"
                  headerTextHighlightRef={headerTextHighlightRef}
                  refinview={refinview}
                />
              </div>
              <div className={`second-row ${comeFromBelow}`}>
                <div className="experience--btn-group">
                  <button
                    className={`main-btn-style experience--btn-tab ${
                      selectedTab === "work" ? "cyan-btn-selected" : null
                    }`}
                    type="button"
                    onClick={() => this.selectTab("work")}
                  >
                    <p>Work</p>
                  </button>

                  <button
                    className={`main-btn-style experience--btn-tab ${
                      selectedTab === "education" ? "cyan-btn-selected" : null
                    }`}
                    type="button"
                    onClick={() => this.selectTab("education")}
                  >
                    <p>Education</p>
                  </button>
                </div>
              </div>
            </div>
            {selectedTab === "work" ? (
              <div className="experience--item-grid-desktop">
                {workItems.map((item) => (
                  <div
                    key={item.key}
                    className={`experience--item-description-desktop ${
                      renderGridAnimation || comeFromBelowDelayed
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <div className="experience--item-grid-desktop">
                {educationItems.map((item) => (
                  <div
                    key={item.key}
                    className={`experience--item-description-desktop ${
                      renderGridAnimation || comeFromBelowDelayed
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </MediaQuery>
        </section>
      </div>
    );
  }
}

export default Experience;

Experience.propTypes = {
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};
