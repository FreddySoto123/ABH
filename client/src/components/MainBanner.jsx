import React from 'react';
import NavigationButton from './ui/NavigationButton.jsx';
import SectionHeader from './ui/SectionHeader.jsx';
import './MainBanner.css';

const MainBanner = ({
    page,
    title,
    description,
    primaryButton,
    secondaryButton
}) => {
    const hasButtons = primaryButton || secondaryButton;

    return (
        <section className="main-banner">
            <div className="main-banner__group">
                <div className="main-banner__title">
                    <SectionHeader
                        title={page}
                        whiteText={true}
                        left={true}
                    />
                    <h1>{title}</h1>
                </div>

                <div className={`main-banner__buttons ${!hasButtons ? 'main-banner__buttons--no-buttons' : ''}`}>
                    <p>{description}</p>

                    {hasButtons && (
                        <div className="buttons-container">
                            {primaryButton && (
                                <NavigationButton
                                    title={primaryButton.title}
                                    link={primaryButton.link}
                                    buttonColor="var(--color-accent)"
                                    borderColor="var(--color-accent)"
                                    textColor="var(--color-primary)"
                                />
                            )}

                            {secondaryButton && (
                                <NavigationButton
                                    title={secondaryButton.title}
                                    link={secondaryButton.link}
                                    buttonColor="transparent"
                                    borderColor="var(--color-white)"
                                    textColor="var(--color-white)"
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MainBanner;