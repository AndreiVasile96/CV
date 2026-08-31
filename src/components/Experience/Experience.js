/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */

import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import ExperienceTitle from "./ExperienceTitle";

// Import JSON data
import workData from "../../data/work.json";
import educationData from "../../data/education.json";

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
      expandedItems: {}, // Track expanded state by item ID
      isTabSwitching: false, // Track tab switching animation
      tabSwitchDirection: null // Track switch direction for animation
    };

    this.selectTab = this.selectTab.bind(this);
    this.tabTimeouts = [];
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

  componentWillUnmount() {
    this.tabTimeouts.forEach(clearTimeout);
    this.tabTimeouts = [];
  }

  // Handle card click - only expand, don"t collapse
  handleCardClick(itemId, event) {
    const { expandedItems, isTabSwitching } = this.state;

    // Prevent expansion during tab switching
    if (isTabSwitching) {
      return;
    }

    // Don"t trigger if clicking on the "See less" button
    if (event.target.closest(".experience--item-box-see-more")) {
      return;
    }

    const isCurrentlyExpanded = expandedItems[itemId] || false;

    // Only expand if not already expanded
    if (!isCurrentlyExpanded) {
      this.setState((prevState) => ({
        expandedItems: {
          ...prevState.expandedItems,
          [itemId]: true
        }
      }));
    }
  }

  // Handle "See less" button click - only collapse
  handleSeeLessClick(itemId, event) {
    const { isTabSwitching } = this.state;

    // Stop event propagation to prevent card click
    event.stopPropagation();

    // Prevent action during tab switching
    if (isTabSwitching) {
      return;
    }

    // Always collapse when "See less" is clicked
    this.setState((prevState) => ({
      expandedItems: {
        ...prevState.expandedItems,
        [itemId]: false
      }
    }));
  }

  selectTab(target) {
    const { selectedTab, isTabSwitching } = this.state;

    // Prevent multiple clicks during transition
    if (isTabSwitching || target === selectedTab) {
      return;
    }

    // Start tab switching animation
    this.setState({
      isTabSwitching: true,
      tabSwitchDirection: "out"
    });

    // After switch-out animation completes, change tab and start switch-in
    this.tabTimeouts.push(setTimeout(() => {
      this.setState({
        selectedTab: target,
        renderGridAnimation: "come-from-below-fast",
        expandedItems: {}, // Reset expanded items when switching tabs
        tabSwitchDirection: "in"
      });

      // Complete the transition
      this.tabTimeouts.push(setTimeout(() => {
        this.setState({
          isTabSwitching: false,
          tabSwitchDirection: null
        });
      }, 400)); // Match animation duration
    }, 400)); // Match switch-out animation duration
  }

  // Stable helper method to render experience items
  renderExperienceItem(item) {
    const { expandedItems, isTabSwitching, tabSwitchDirection } = this.state;
    const isExpanded = expandedItems[item.id] || false;

    // Determine transition class for tab switching
    let transitionClass = "";
    if (isTabSwitching) {
      transitionClass = tabSwitchDirection === "out" ? "switching-out" : "switching-in";
    }

    return (
      <div
        key={`item-${item.id}`}
        className={`experience--item-general-box experience--tab-content ${transitionClass} ${isExpanded ? "expanded" : ""} ${!isExpanded ? "clickable" : ""}`}
        {...(isExpanded
          ? {}
          : {
            onClick: (event) => this.handleCardClick(item.id, event),
            role: "button",
            tabIndex: 0,
            onKeyDown: (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                this.handleCardClick(item.id, event);
              }
            },
            "aria-label": `Expand details for ${item.title}`
          })}
      >
        <p className="experience--item-general-box-title">
          {item.title}
          {item.subtitle && (
            <>
              <br />
              {item.subtitle}
            </>
          )}
        </p>
        <p className="experience--item-general-box-date">
          {item.date}
        </p>
        <div className="experience--item-general-box-description">
          <div className="experience--item-content-container">
            {/* Base content - always visible */}
            <div className="experience--item-base-content">
              {item.summary.map((point) => (
                <React.Fragment key={`summary-${item.id}-${point.substring(0, 20)}`}>
                  - {point}
                  <br />
                </React.Fragment>
              ))}
            </div>

            {/* Expanded content - shows below base content when expanded */}
            <div className={`experience--item-expanded-content ${isExpanded ? "expanded" : ""}`}>
              {item.details}
            </div>
          </div>

          {/* Conditional button - shows "See more" or "See less" */}
          {!isExpanded ? (
            <div className="experience--item-box-see-more-indicator">
              <div className="experience--item-box-see-more-bar" />
              <div className="experience--item-box-see-more-text">
                <p>Click to see more</p>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="experience--item-box-see-more"
              onClick={(event) => this.handleSeeLessClick(item.id, event)}
              disabled={isTabSwitching}
              aria-label={`Collapse details for ${item.title}`}
            >
              <div className="experience--item-box-see-more-bar" />
              <div className="experience--item-box-see-more-text">
                <p>See less</p>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  }

  render() {
    const {
      selectedTab,
      comeFromBelow,
      comeFromBelowDelayed,
      renderGridAnimation,
      visible,
      isTabSwitching
    } = this.state;
    const { headerTextHighlightRef, refinview } = this.props;

    const currentData = selectedTab === "work" ? workData : educationData;

    return (
      <div className={`experience ${visible}`} id="experience">
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
                  selectedTab === "work" ? "cyan-btn-selected" : ""
                }`}
                type="button"
                onClick={() => this.selectTab("work")}
                disabled={isTabSwitching} // Disable during transition
              >
                <p>Work</p>
              </button>

              <button
                className={`main-btn-style experience--btn-tab ${
                  selectedTab === "education" ? "cyan-btn-selected" : ""
                }`}
                type="button"
                onClick={() => this.selectTab("education")}
                disabled={isTabSwitching} // Disable during transition
              >
                <p>Education</p>
              </button>
            </div>
            <div className="experience--item-description">
              {currentData.map((item) => (
                <div
                  key={`mobile-${item.id}`}
                  className={`experience--item-description ${
                    renderGridAnimation || comeFromBelowDelayed
                  } `}
                >
                  {this.renderExperienceItem(item)}
                </div>
              ))}
            </div>
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
                      selectedTab === "work" ? "cyan-btn-selected" : ""
                    }`}
                    type="button"
                    onClick={() => this.selectTab("work")}
                    disabled={isTabSwitching} // Disable during transition
                  >
                    <p>Work</p>
                  </button>

                  <button
                    className={`main-btn-style experience--btn-tab ${
                      selectedTab === "education" ? "cyan-btn-selected" : ""
                    }`}
                    type="button"
                    onClick={() => this.selectTab("education")}
                    disabled={isTabSwitching} // Disable during transition
                  >
                    <p>Education</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="experience--item-grid-desktop">
              {currentData.map((item) => (
                <div
                  key={`desktop-${item.id}`}
                  className={`experience--item-description-desktop ${
                    renderGridAnimation || comeFromBelowDelayed
                  }`}
                >
                  {this.renderExperienceItem(item)}
                </div>
              ))}
            </div>
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
