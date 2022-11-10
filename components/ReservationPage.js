import { useState } from 'react';

const ReservationPage = (props) => {
    const [checkin, setCheckin] = useState();
    const [checkout, setCheckout] = useState();
    const [numGuest, setNumGuest] = useState();

    const reservationHandler = ({ hotel, user, checkin, checkout }) => {
        createReservation(hotel, user, new Date(checkin), new Date(checkout)).then(
          (res) => {
            // res.error === false && setRegistered(true);
            res.error === false && alert("Hotel was successfully booked!");
          }
        );
      };

    return (
        <div className='reservation-page'>
            <div className="text-primary px-8 rounded-lg text-center my-8">
            <h1 className="text-3xl font-bold">Hotel name</h1>
            </div>

            <div className='flex justify-around '>
                <div className='border-2 border-dashed rounded-lg w-2/5'>
                    <h1>Photo and location</h1>
                </div>
                <div className='border-2 border-dashed rounded-lg w-2/5'>
                    <div className="text-center my-4">
                        <h3 className="text-1xl">Rate per night</h3>
                    </div>
                    <form className='flex flex-col justify-around items-center'>
                        <div className='check-in'>
                            <label>Check in: </label>
                            <input 
                            type='date' 
                            name='checkin-date'
                            className='w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black'
                            onChange={(e) => setCheckin(e.target.value)}
                            />
                        </div>
                        <div className='check-out'>
                            <label>Check out: </label>
                            <input
                            type='date'
                            name='checkout-date'
                            className='w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black'
                            onChange={(e) => setCheckout(e.target.value)}
                            />
                        </div>
                        <div className='num-of-guest'>
                            <label>Number of Guests: </label>
                            <input
                            type='text'
                            name='guest-num'
                            className='w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black'
                            onChange={(e) => setNumGuest(e.target.value)}/>
                        </div>
                        <div className='mb-4'>
                            <h4>Room Fee: </h4>
                        </div>
                        <div className=" mb-4 shadow-md w-1/3 cursor-pointer  hover:bg-white  hover:ring-1 hover:ring-tertiary hover:text-tertiary transition ease-linear duration-200 rounded-md bg-tertiary text-white p-2 flex items-center justify-center"
                        onClick={() =>
                            // registrationHandler({ hotel, user, checkin, checkout })
                            alert("Hotel was successfully booked!")
                        }>
                            Reserve
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default ReservationPage;