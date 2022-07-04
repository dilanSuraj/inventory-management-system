import React from 'react';

const ModalHeading = ({ modalHeading = 'Modal Heading' }) => {
    return (
        <h3 class="font-bold text-lg text-center uppercase mb-2">{modalHeading}</h3>
    );
};

export default ModalHeading;