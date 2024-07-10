import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectList } from '../helpers/ProjectList';
import getContractInstance from '../blockchain/web3';
import Web3 from 'web3';
import Button from '@mui/material/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInCalendarDays } from 'date-fns';
import '../styles/ProjectDisplay.css';

function ProjectDisplay() {
    const { id } = useParams();
    const project = ProjectList[id];
    const [isBooked, setIsBooked] = useState(false);
    const [isBooker, setIsBooker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [useDiscount, setUseDiscount] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [isDiscountValid, setIsDiscountValid] = useState(false);
    const [price, setPrice] = useState(null);

    const roomType = id; // Assuming roomType is the same as id for simplicity

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const contract = await getContractInstance();
                const basePrice = await contract.methods.calculatePrice(roomType, 1, false).call();
                setPrice(Web3.utils.fromWei(basePrice, 'ether'));
            } catch (error) {
                console.error("Error fetching price:", error);
            }
        };

        fetchPrice();
    }, [roomType]);

    useEffect(() => {
        const checkAvailability = async () => {
            if (!startDate || !endDate) return;
            const contract = await getContractInstance();
            const startDateTimestamp = Math.floor(startDate.getTime() / 1000);
            const endDateTimestamp = Math.floor(endDate.getTime() / 1000);
            const available = await contract.methods.checkAvailability(roomType, startDateTimestamp, endDateTimestamp).call();
            setIsBooked(!available);
        };

        checkAvailability();
    }, [id, startDate, endDate]);

    const validateDiscountCode = (code) => {
        // Aquí puedes implementar la lógica para verificar el código de descuento
        // En este ejemplo simple, asumimos que "DISCOUNT50" es el código válido
        return code === "profepongameun7";
    };

    const handleReserve = async () => {
        try {
            if (!startDate || !endDate) {
                alert('Por favor selecciona las fechas de inicio y fin.');
                return;
            }

            const contract = await getContractInstance();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const numDays = differenceInCalendarDays(endDate, startDate) + 1;
            const startDateTimestamp = Math.floor(startDate.getTime() / 1000);
            const endDateTimestamp = Math.floor(endDate.getTime() / 1000);

            // Verificar si la habitación ya está reservada en el registro final
            const isAvailable = await contract.methods.checkAvailability(roomType, startDateTimestamp, endDateTimestamp).call();
            if (!isAvailable) {
                alert('La habitación ya está reservada para las fechas seleccionadas.');
                return;
            }

            // Calcular el precio total con o sin descuento
            const totalPriceWei = await contract.methods.calculatePrice(roomType, numDays, isDiscountValid).call();
            await contract.methods.bookRoom(roomType, startDateTimestamp, endDateTimestamp, isDiscountValid).send({ from: accounts[0], value: totalPriceWei });
            alert('Reserva realizada con éxito!');
            setIsBooked(true);
            setIsBooker(true);
        } catch (error) {
            console.error('Error al hacer la reserva:', error);
            alert('Error al realizar la reserva. Ver consola para más detalles.');
        }
    };

    const handleCancelReservation = async () => {
        try {
            if (!startDate || !endDate) return;
            const contract = await getContractInstance();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const startDateTimestamp = Math.floor(startDate.getTime() / 1000);
            const endDateTimestamp = Math.floor(endDate.getTime() / 1000);
            await contract.methods.cancelBooking(roomType, startDateTimestamp, endDateTimestamp).send({ from: accounts[0] });
            setIsBooked(false);
            setIsBooker(false);
            alert('Reserva cancelada con éxito!');
        } catch (error) {
            console.error('No puedes cancelar la reserva de otra persona:', error);
            alert('Error al cancelar la reserva. Ver consola para más detalles.');
        }
    };

    const handleDiscountCodeChange = (event) => {
        const code = event.target.value;
        setDiscountCode(code);
        setIsDiscountValid(validateDiscountCode(code));
    };

    return (
        <div className='project'>
            <h1>{project.name}</h1>
            <img src={project.image} alt={project.name}/>
            <p><b>{project.info}</b></p>
            {price && <p><b>Precio por noche: {price} ETH</b></p>}
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    placeholderText="Fecha de inicio"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || new Date()}
                    placeholderText="Fecha de fin"
                />
            </div>
            <Button variant="contained" color="primary" onClick={handleReserve} disabled={isBooked}>
                {isBooked ? "Reservado" : "Reservar"}
            </Button>
            {isBooker && (
                <Button variant="outlined" color="secondary" onClick={handleCancelReservation}>
                    Cancelar Reserva
                </Button>
            )}
            <div>
                <Button variant="contained" color="primary" onClick={() => setUseDiscount(!useDiscount)}>
                    {useDiscount ? "Cancelar Descuento" : "Usar Código de Descuento"}
                </Button>
                {useDiscount && (
                    <div>
                        <input type="text" value={discountCode} onChange={handleDiscountCodeChange} placeholder="Código de Descuento" />
                        {isDiscountValid ? <p>Código válido</p> : <p>Código inválido</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectDisplay;
