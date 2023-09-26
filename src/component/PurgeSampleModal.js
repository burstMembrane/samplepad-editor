import React, { useState } from 'react';
import ProgressBar from 'react-progressbar';

/**
 * A modal component that allows the user to purge all samples not currently associated with a kit.
 * @param {Object} props - The props object.
 * @param {boolean} props.isModalOpen - A boolean value indicating whether the modal is open or not.
 * @param {function} props.closeModal - A function to close the modal.
 * @returns {JSX.Element} - The PurgeSampleModal component.
 */
const PurgeSampleModal = ({ isModalOpen, closeModal }) => {
    const modalClass = isModalOpen ? 'is-active' : '';
    const [progress, setProgress] = useState(0);

    /**
     * Purges all samples and updates the progress bar.
     * @returns {void}
     */
    const purgeSamples = () => {
        console.log('Purging samples');
        let i = 0;
        const intervalId = setInterval(() => {
            i++;
            setProgress(i);
            if (i === 100) {
                clearInterval(intervalId);
                closeModal();
            }
        }, 50);
    };

    return (
        <div className={`modal ${modalClass} purgeSamples is-dark`}>
            <div className="modal-background"></div>
            <div className="modal-card is-dark">
                <header className="modal-card-head">
                    <p className="modal-card-title">Purge samples</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    <div className="text">
                        This action will remove all samples from your SD card not currently associated with a kit.
                        a kit.
                        Are you sure you want to purge the samples?
                    </div>
                    {progress > 0 && progress < 100 && (
                        <div className='text'>
                            <p className='text'>Purging...</p>
                            <ProgressBar className="is-large" completed={progress} />
                        </div>
                    )}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={purgeSamples}>
                        Purge
                    </button>
                    <button className="button" onClick={closeModal}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PurgeSampleModal;