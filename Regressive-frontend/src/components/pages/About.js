import React, { useState } from 'react';
import profilePic from '/Users/Ayushpanda/Desktop/Programs/CS_251/regressive-app/src/components/images/headshot.jpg';
import resume from '/Users/Ayushpanda/Desktop/Programs/CS_251/regressive-app/src/components/images/Ayush_Panda_Resume.jpg';
import linkedinIcon from '/Users/Ayushpanda/Desktop/Programs/CS_251/regressive-app/src/components/images/linkedin-icon.jpg';
import githubIcon from '/Users/Ayushpanda/Desktop/Programs/CS_251/regressive-app/src/components/images/github-icon.jpg';
import { Helmet } from 'react-helmet';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AboutUs() {
    const [show, setShow] = useState(false);
    const [imageToShow, setImageToShow] = useState(null);

    const handleShow = (image) => {
        setImageToShow(image);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <>
            <Helmet>
                <style>{'body { background-color: #FAFAFA; }'}</style>
            </Helmet>
            <div className="container">
                <style jsx>{`
                    .carousel-control-next-icon,
                    .carousel-control-prev-icon {
                        background-image: none !important;
                        color: #000;
                        width: 30px;
                        height: 30px;
                    }
                    .contact-link {
                        margin-right: 5px;
                        width: 50px;
                        height: 50px;
                        transition: transform .2s;
                    }
                    .contact-link:hover {
                        transform: scale(1.1);
                    }
                    .vertically-centered-content {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .main-heading {
                        color: #1A1A1A;
                        font-size: 36px;
                        margin-bottom: 20px;
                        text-align: center;
                        letter-spacing: 1px;
                        font-weight: 600;
                    }
                    p {
                        color: #4A4A4A;
                        font-size: 18px;
                        line-height: 1.6;
                        text-align: justify;
                        margin-bottom: 20px;
                    }
                    .container {
                        max-width: 960px;
                        margin: auto;
                        padding: 30px;
                        background-color: #FFFFFF;
                        border-radius: 10px;
                        box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
                    }
                    .carousel-item img {
                        border-radius: 10px;
                        transition: all .2s ease-in-out;
                    }
                    .carousel-item:hover img {
                        transform: scale(1.03);
                    }
                `}</style>
                <div className="row mt-4">
                    <div className="col-12">
                        <h3 className="main-heading">About Me</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" onClick={() => handleShow(resume)}>
                                    <img src={resume} className="d-block w-100" style={{cursor: 'pointer'}} alt="resume" />
                                </div>
                                <div className="carousel-item" onClick={() => handleShow(profilePic)}>
                                    <img src={profilePic} className="d-block w-100" style={{cursor: 'pointer'}} alt="profilePic" />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"><i className="fa fa-chevron-left"></i></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"><i className="fa fa-chevron-right"></i></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6 vertically-centered-content">
                        <p>Hello, my name is Ayush Panda. I am currently a Junior at the University Of Illinois at Chicago (UIC) studying
                            Computer Science Engineering with a minor in Finance. I am really interested in the interdisciplinary fields of 
                            Computer Science and Finance. After graduation, I am very interested in working in the fin-tech field or big tech. Please
                            feel free to reach out.
                        </p>
                        <a href="https://www.linkedin.com/in/ayushdpanda/" target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="LinkedIn Icon" className="contact-link" />
                        </a>
                        <a href="https://github.com/panda-ayush" target="_blank" rel="noopener noreferrer">
                            <img src={githubIcon} alt="GitHub Icon" className="contact-link" />
                        </a>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} size="lg" >
                    <Modal.Header closeButton>
                        <Modal.Title>Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={imageToShow} alt="Selected" style={{ width: '100%' }} />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default AboutUs;
