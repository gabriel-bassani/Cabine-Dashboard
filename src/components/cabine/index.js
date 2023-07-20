import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TungstenIcon from '@mui/icons-material/Tungsten';
import PersonIcon from '@mui/icons-material/Person';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import FormControl from '@mui/material/FormControl';
import Fade from '@mui/material/Fade';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import "./index.css";


const backendURl = process.env.REACT_APP_BACKEND_URL;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function Cabine(){
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [horario, setHorario] = useState('');
    const [cabineReservada, setCabineReservada] = useState(false);
    const [cabineOcupada, setCabineOcupada] = useState(false);
    const [estadoCabine, setEstadoCabine] = useState('DISPONIVEL');
    const [corCabine, setCorCabine] = useState('white');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [naoReservada, setNaoReservada] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setSenha('');
        setHorario('');
    }


    useEffect(() => {
        getCabine();
    }, []);

    useEffect(() => {
        if(snackbarMessage !== '') setOpenSnackbar(true)
        console.log('useEffect');
    }, [snackbarMessage, snackbarSeverity])


    useEffect(() => {
  
        //Implementing the setInterval method
        const interval = setInterval(() => {
            getCabine()
            //getReservaAtual();
        }, 3000);
  
        //Clearing the interval
        return () => clearInterval(interval);
    }, []);
    
    const handleOpen = () => {
        setOpen(true);
    }


    const reservaCabine = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              usuarioEmail: email,//'danielscolao@gmail.com',
              usuarioSenha: senha,//'daniel@123',
              horario: horario,
            }),
          };
        const url = `${backendURl}/sala-estudo/1/cabines/1`;
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Trata a resposta do servidor
                console.log("data.status", data.status);
                if(data.status !== undefined){
                    console.log("diferente de undefined");
                    setSnackbarMessage(data.message);
                    setSnackbarSeverity('error');
                    //setOpenSnackbar(true);
                } else {
                    console.log('undefined');
                    setSnackbarMessage('Reservada com sucesso!');
                    setSnackbarSeverity('success');
                }
                //handleClick();
            })
            .catch(error => {
                ///setSnackbarMessage(error.message);
                console.log('erro');
                console.error('Erro:', error);
            });

    }

    const getCabine = async () => {
        //console.log('backednURl:', backendURl);
        try{
            const resp = await fetch(`${backendURl}/cabines/1`, {
                method: "GET",
            });
            const data = await resp.json();
            console.log("resp:", data);
            if(data.status === 'RESERVADA' ){
                setCorCabine('rgb(255 229 74)');
                setCabineReservada(true);
                setCabineOcupada(false);
                setEstadoCabine('RESERVADA');
            }
            if(data.status === 'OCUPADA' && data.horarioInicial !== null){
                setCorCabine('rgb(255 229 74)');
                setCabineOcupada(true);
                setCabineReservada(false);
                setEstadoCabine('OCUPADA');
            }
            if(data.status === 'OCUPADA' && data.horarioInicial === null){
                setCorCabine('white');
                setCabineOcupada(true);
                setCabineReservada(false);
                setEstadoCabine('OCUPADA');
            }
            if(data.status === 'DISPONIVEL'){
                setCorCabine('white');
                setCabineOcupada(false);
                setCabineReservada(false);
                setEstadoCabine('DISPONIVEL');
            }
        } catch(error){
            console.log(error);
        }
    }

    const alteraEstadoCabine = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: 'DISPONIVEL',
              horario: null,
            }),
          };
          
          const url = `${backendURl}/cabines/1/status`;
          
          fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data); // Trata a resposta do servidor
            })
            .catch(error => {
              console.error('Erro:', error);
            });
    }

    const getReservaAtual = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          
          const url = `${backendURl}/cabines/1`;
          
          fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data); // Trata a resposta do servidor
              if(data.horarioInicial === null){
                //setCabineReservada(false);
                console.log('horarioInicial === null');
                //setNaoReservada(true);
              } else {
                //setNaoReservada(false);
              }
            })
            .catch(error => {
              console.error('Erro:', error);
            });
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return(
        <div className='div'>
            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                TransitionComponent={Fade}
                //message="I love snacks"
            >
                <Alert variant="filled" severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Reservar
                    </Typography>
                {/*<Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>*/}
                    <TextField id="outlined-basic" label="Email" variant="outlined" value={email} fullWidth style={{marginTop: 10}}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    />
                    <TextField id="outlined-basic" label="Senha" type='password' variant="outlined" fullWidth value={senha} style={{marginTop: 10}}
                    onChange={(e) => {
                        setSenha(e.target.value)
                    }}
                    />
                    <FormControl fullWidth style={{marginTop: 10}}>
                        <TimePicker
                        value={horario}
                        onChange={(e) => {
                            let year = e.$y;
                            let month = e.$M;
                            month = month + 1;
                            if(month < 10) month = '0' + month;
                            let day = e.$D;
                            if(day < 10) day = '0' + day;
                            let hour = e.$H;
                            //hour = hour + 5;
                            if(hour < 10) hour = '0' + hour;
                            let minute = e.$m;
                            if(minute < 10) minute = '0' + minute;
                            let second = e.$s;
                            if(second < 10) second = '0' + second;

                            let time = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
                            
                            console.log(time);
                            setHorario(time)
                            //console.log('e:', e);
                        }}
                        />
                        
                    </FormControl>
                    <Button variant="contained" color="success" size='big' style={{marginTop: 10}}
                    onClick={() => {
                        //reservaCabine();
                        //getCabine();
                        reservaCabine();
                    }}
                    >
                        Reservar
                    </Button>
                    <Button variant="contained" color="error" size='big' style={{marginTop: 10, marginLeft: 10}}
                    onClick={() => {
                        setEmail("");
                        setSenha("");
                        setHorario("");
                        //reservaCabine();
                        alteraEstadoCabine();
                    }}
                    >
                        Limpar
                    </Button>
                </Box>
            </Modal>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 128,
                height: 128,
                },
            }}
            >
            <Paper style={{marginLeft: "144px", marginTop: "100px", alignItems: 'center', background: corCabine}} elevation={0}>
                <TungstenIcon fontSize='large' color='action'/>
                <div className='p' onClick={handleOpen}>
                    <h4>{estadoCabine}</h4>
                </div>
                {cabineOcupada && <PersonIcon className='person' />}
            </Paper>
            <Paper style={{marginLeft: "144px", marginTop: "100px", alignItems: 'center', background: "rgb(255 229 74)"}}>
                <TungstenIcon fontSize='large' color='action'/>
                <div className='p' onClick={handleOpen}>
                    <h4>OCUPADA</h4>
                </div>
                <PersonIcon className='person' />
            </Paper>
            <Paper style={{marginLeft: "144px", marginTop: "100px", background: "rgb(255 229 74)"}} elevation={3}>
                <TungstenIcon fontSize='large' color='action' />
                <div className='p' onClick={handleOpen}>
                    <h4>RESERVADA</h4>
                </div>
            </Paper>
            </Box>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 128,
                height: 128,
                },
            }}
            >
            <Paper className='paper' style={{marginLeft: "144px", marginTop: "100px", background: "rgb(255 229 74)"}} elevation={0}>
                <TungstenIcon fontSize='large' color='action'/>
                <div className='p' onClick={handleOpen}>
                    <h4>OCUPADA</h4>
                </div>
                <PersonIcon className='person' />
            </Paper>
            <Paper style={{marginLeft: "144px", marginTop: "100px", background: "rgb(255 229 74)"}}>
                <TungstenIcon fontSize='large' color='action'/>
                <div className='p' onClick={handleOpen}>
                    <h4>OCUPADA</h4>
                </div>
                <PersonIcon className='person' />
            </Paper>
            <Paper style={{marginLeft: "144px", marginTop: "100px", background: "rgb(255 229 74)"}} elevation={3}>
                <TungstenIcon fontSize='large' color='action'/>
                <div className='p' onClick={handleOpen}>
                    <h4>OCUPADA</h4>
                </div>
                <PersonIcon className='person' />
            </Paper>
            </Box>
        </div>
    )
}