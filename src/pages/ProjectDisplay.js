import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectList } from '../helpers/ProjectList';
import getContractInstance from '../blockchain/web3';
import Button from '@mui/material/Button'; 
import '../styles/ProjectDisplay.css'

function ProjectDisplay() {
    const { id } = useParams();
    const project = ProjectList[id];
    const [isBooked, setIsBooked] = useState(false);
    const [isBooker, setIsBooker] = useState(false);

    useEffect(() => {
        const checkAvailability = async () => {
            const contract = await getContractInstance();
            const available = await contract.methods.checkAvailability(id).call();
            setIsBooked(!available);

            if (!available) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                const booker = await contract.methods.booker(id).call();
                setIsBooker(accounts[0].toLowerCase() === booker.toLowerCase());
            }
        };

        checkAvailability();
    }, [id]);

    const handleReserve = async () => {
        try {
            const contract = await getContractInstance();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const price = await contract.methods.get_room_price().call(); 

            await contract.methods.bookRoom(id).send({ from: accounts[0], value: price });
            setIsBooked(true);
            setIsBooker(true);
            alert('Reserva realizada con éxito!');
        } catch (error) {
            console.error('Error al hacer la reserva:', error);
            alert('Error al realizar la reserva. Ver consola para más detalles.');
        }
    };

    const handleCancelReservation = async () => {
        try {
            const contract = await getContractInstance();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await contract.methods.cancelBooking(id).send({ from: accounts[0] });
            setIsBooked(false);
            setIsBooker(false);
            alert('Reserva cancelada con éxito!');
        } catch (error) {
            console.error('No puedes cancelar la reserva de otra persona:', error);
            alert('Error al cancelar la reserva. Ver consola para más detalles.');
        }
    };

    return (
        <div className='project'>
            <h1>{project.name}</h1>
            <img src={project.image} alt={project.name}/>
            <p><b>{project.info}</b></p>
            <Button variant="contained" color="primary" onClick={handleReserve} disabled={isBooked}>
            {isBooked ? "Reservado" : "Reservar"}
            </Button>
            {isBooker && (
                <Button variant="outlined" color="secondary" onClick={handleCancelReservation}>
                    Cancelar Reserva
                </Button>
            )}
        </div>
    );
}

export default ProjectDisplay;
