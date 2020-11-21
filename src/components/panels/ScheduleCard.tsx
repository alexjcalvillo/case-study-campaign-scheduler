import React from 'react';

interface Props {
    children: JSX.Element[] | null,
}

export const ScheduleCard: React.FC<Props> = ({ children }) => {
    return (
        <div style={cardStyles}>
            {children}
        </div>
    )
};

const cardStyles = {
    height: '400px',
    margin: 'auto',
    width: '75%',
    backgroundColor: 'gray',
    borderRadius: '4px'
}