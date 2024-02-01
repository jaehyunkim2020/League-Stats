import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const AddIcon = ({ onClick }: { onClick: () => void }) => {
    return (
        <button 
            onClick={onClick} 
            className='flex flex-col items-center justify-center space-y-2 bg-riot-red hover:shadow-lg transition-shadow duration-300 px-4 py-2 rounded'
        >
            <FontAwesomeIcon icon={faCirclePlus} size="4x" style={{color: "#C8AA6E"}}/>
        </button>
    )
}

export default AddIcon
