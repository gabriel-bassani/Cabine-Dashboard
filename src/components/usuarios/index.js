import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

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

export function Usuarios() {
    const [rows, setRows] = useState([{}]);
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        getUsuarios();
    }, [])

    const getUsuarios = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          
          const url = `${backendURl}/usuario`;
          
          fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data); // Trata a resposta do servidor
              setRows(data);
            })
            .catch(error => {
              console.error('Erro:', error);
            });
    }
    const cadastraUsuario = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nome: nome,
              matricula: matricula,
              email: email,
              senha: senha,
            }),
            
          };
          
          const url = `${backendURl}/usuario`;
          
          fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data); // Trata a resposta do servidor
              //setRows(data);
              getUsuarios();
            })
            .catch(error => {
              console.error('Erro:', error);
            });
    }
    
  return (
    <div className='div'>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cadastrar Usuário
                    </Typography>
                {/*<Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>*/}
                    <TextField id="outlined-basic" label="Nome" variant="outlined" value={nome} fullWidth style={{marginTop: 10}}
                    onChange={(e) => {
                        setNome(e.target.value)
                    }}
                    />
                    <TextField id="outlined-basic" label="Matrícula" variant="outlined" value={matricula} fullWidth style={{marginTop: 10}}
                    onChange={(e) => {
                        setMatricula(e.target.value)
                    }}
                    />
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
                    <Button variant="contained" color="success" size='big' style={{marginTop: 10}}
                    onClick={() => {
                        cadastraUsuario();
                        setOpen(false);
                        setEmail('');
                        setMatricula('');
                        setNome('');
                        setSenha('');
                    }}
                    >
                        Reservar
                    </Button>
                    <Button variant="contained" color="error" size='big' style={{marginTop: 10, marginLeft: 10}}
                    onClick={() => {
                        setEmail('');
                        setMatricula('');
                        setNome('');
                        setSenha('');
                    }}
                    >
                        Limpar
                    </Button>
                </Box>
            </Modal>
        <TableContainer style={{background: "linear-gradient(180deg, rgba(86,50,50,1) 0%, rgba(132,36,12,1) 100%)"}} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell style={{color: "white"}}>Nome</TableCell>
                    <TableCell style={{color: "white"}} align="right">Matrícula</TableCell>
                    <TableCell style={{color: "white"}} align="right">Email</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    style={{color: "white"}}
                    key={row.nome}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell style={{color: "white"}} component="th" scope="row">
                        {row.nome}
                    </TableCell>
                    <TableCell style={{color: "white"}} align="right">{row.matricula}</TableCell>
                    <TableCell style={{color: "white"}} align="right">{row.email}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <FormControl  style={{marginTop: 40}}>
                <Button  style={{color: "white"}} variant="outlined" onClick={() => {
                    setOpen(true);
                }}>Cadastrar Usuário</Button>  
            </FormControl>

    </div>
  );
}