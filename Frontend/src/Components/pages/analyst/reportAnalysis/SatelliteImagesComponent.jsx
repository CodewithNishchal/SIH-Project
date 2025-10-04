import React from 'react';

const SatelliteImagesComponent = () => {
    // Dummy data for satellite images
    const images = [
        { src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS0S5rIX_kn07wrLgfIWejZqO162LHKKsim2gI9huiHduQ1sDSTaPL5e0kIFI9Y", alt: "Satellite view of Mumbai coast from ESA", time: "14:30" },
        { src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTirDSvE-o9-KDZB59XC_0zZavmwxNeruKHQa_m_8uc6oGzWl5RwTmXV8M8u82v", alt: "Cyclone Tauktae approaching India coast", time: "14:28" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ZZ4BwhrS4j_vN-ctHY2iqNV7P3_uiCitAqbxKpdrhVhbCAx2fzfFSt95nFdn", alt: "Oil spill satellite image from NASA", time: "14:26" },
        { src: "https://www.nesdis.noaa.gov/sites/default/files/styles/card_image/public/2022-09/NOAA_20_Composite_Baja_Sept_21_2022_1200x675.jpeg?itok=y0wV1t5s", alt: "Coastal weather patterns from NOAA satellite", time: "14:22" }
    ];

    return (
        <div className="widget satellite-widget">
            <div className="widget-header">
                <div className="widget-title">
                    <i className="fas fa-satellite widget-icon"></i>
                    Recent Satellite Images
                </div>
            </div>
            <div className="satellite-gallery">
                {images.map((image, index) => (
                    <div className="satellite-image" key={index}>
                        <img src={image.src} alt={image.alt} />
                        <div className="satellite-timestamp">{image.time}</div>
                    </div>
                ))}
            </div>
            <div className="info-banner">
                <i className="fas fa-info-circle info-banner-icon"></i>
                <div className="info-banner-text">
                    Live satellite feed integration pending. Images will auto-refresh when active.
                </div>
            </div>
        </div>
    );
};

export default SatelliteImagesComponent;