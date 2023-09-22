import { React } from 'react';

const PurgeSampleModal = ({ isModalOpen, closeModal }) => {
    const modalClass = isModalOpen ? 'is-active' : '';

    return (
        <div className={`modal ${modalClass} purgeSamples`}>
            <div className="modal-background"></div>
            <section className="section">
                <div className="container">
                    <div className="has-text-centered title is-size-2 mt-6">Purge samples?</div>
                    <div className="modal-content">
                        <div className="box is-inline">
                            <button className="modal-content">OK</button>
                            <button className="modal-content" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </section>
            <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
    );
};

export default PurgeSampleModal;