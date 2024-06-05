import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../styles/Footer.css'
function Footer() {
  return (
    <div className='footer'>
        <div className='socialMedia'>
            <WhatsAppIcon onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}/>
        </div>
        <p>&copy; 2024 Hotel Tranquilidad</p>
    </div>
  )
}

export default Footer