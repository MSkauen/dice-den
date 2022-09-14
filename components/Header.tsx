import React from 'react';

function Header() {
    return (
        <div>
            <div>
                <img 
                  className="rounded-full h-20 w-20" 
                  src="/profile-image.png" 
                  alt=""
                />
            </div>
            <div>
                <h1>Fujitora's Dice Den</h1>
                <p></p>
            </div>
        </div>
    );
}

export default Header;