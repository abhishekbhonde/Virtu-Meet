import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
const SocketContext = createContext(null);

export const useSocket =() =>{
    const socket = useContext(SocketContext)
    return socket
}


export const SocketProvider =(props)=>{
    const {children} = props;
    const [socket, setSocket] = useState(null);

    useEffect(()=>{
        const connection = io();
        setSocket(connection)
        console.log('connection', connection)
    },[])

    socket?.on('connect_error', async (err)=>{
        console.log("Error establishing socket", err)
        await fetch('/api/socket')
    })

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    )
}