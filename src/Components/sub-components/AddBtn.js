import React from 'react'


export default function AddBtn({ bg, Icon, color }) {
    
    

    return (
        <button
            onClick={() => {
                //document.getElementById("AddBackDrop").style.display="block"
            }}
            type="button"
            className="ajouter"
           
        >
            <Icon size="90" color='#8A4DD9' variant="Bulk" />
        </button>
    )
}
