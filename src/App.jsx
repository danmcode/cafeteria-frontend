import { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { red } from '@mui/material/colors';

const baseUrl='http://localhost:8080/api/v1/products/'

function App() {

  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert]=useState(false);



  const requestGet = async() => {
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data.data);
    })
  }

  useEffect(()=>{
     requestGet();
  },[]);

  //Funcions
  const openCloseModalInsert = ()=> setModalInsert(!modalInsert);

  //Modals body
  const bodyInsert=(
    <div>
      <h3>Agregar Nueva Consola</h3>
      <TextField name="nombre" label="Nombre"/>
      <br />
      <TextField name="empresa" label="Empresa"/>
      <br />
      <TextField name="lanzamiento" label="Lanzamiento"/>
      <br />
      <TextField name="unidades_vendidas" label="Unidades Vendidas"/>
      <br /><br />
      <div align="right">
        <Button color="primary"> Insertar </Button>
        <Button> Cancelar </Button>
      </div>
    </div>
  )



  return (
    <>
    <Button onClick={ ()=>openCloseModalInsert() }>Crear Producto</Button>
    <div>
    <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Peso</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Fecha de creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { data.map( product =>(
              <TableRow key = { product.id }>
                <TableCell> {product.id} </TableCell>
                <TableCell> {product.name} </TableCell>
                <TableCell> {product.reference} </TableCell>
                <TableCell> {product.price} </TableCell>
                <TableCell> {product.weight} </TableCell>
                <TableCell> {product.category} </TableCell>
                <TableCell> {product.stock} </TableCell>
                <TableCell> {product.createdAt} </TableCell>
                <TableCell> 
                  <Edit></Edit> 
                  &nbsp;&nbsp;&nbsp;
                  <Delete></Delete> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

    <Modal
     open={modalInsert}
     onClose={openCloseModalInsert}>
        {bodyInsert}
     </Modal>
    </>
  )
}

export default App
