import React from 'react'

interface Props {
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}

function NavButton({title, isActive, onClick}: Props) {
  return (
    <button 
        onClick={onClick}
        className={`${
            isActive && "bg-[#2c2e42]"
            } hover:bg-[#7e42b1] text-white py-2 px-4 rounded font-bold`}>
        {title}
    </button>
    );
}

export default NavButton