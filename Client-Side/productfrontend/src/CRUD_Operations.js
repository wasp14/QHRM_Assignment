//import axios from 'axios';
import { Fragment } from 'react';
import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';



const CRUD_Operation =()=>
{

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[id, setId] = useState('');
  const[name, setName] = useState('');
  const[description, setDescription] = useState('');
  const[price, setPrice] = useState('');


  const[updatename, setUpdateName] = useState('');
  const[updatedescription, setUpdateDescription] = useState('');
  const[updateprice, setUpdatePrice] = useState('');

  
    // const empdata = [
    //     {
    //         id : 1, 
    //         name : 'ThinkPad',
    //         description : 'Good for coding',
    //         price : 90000.000
    //     },
    //     {
    //         id : 2,
    //         name : 'MacBook',
    //         description : 'Good for coding',
    //         price : 120000.000
    //     },
    //     {
    //         id : 3,
    //         name : 'Asus VivoBook 16x',
    //         description : 'Good for coding',
    //         price : 90000.000
    //     },

    // ];

    const[data,setData] = useState([]);


    const getData = () =>{
        axios.get('https://localhost:7228/api/Product/all',).then((response)=>{
        const result = response.data;    
        setData(result)
        }).catch((error)=>{
            console.log(error);
        })
      };

    

    useEffect(()=> {
        getData();
    },[]);

    

    const handleUpdate=(id)=>
    {
       handleShow();
    }
    const handleAdd=()=>
    {
        handleShow();
    }

    
    const handleUpdate2=()=>
    {
     const url = 'https://localhost:7228/api/Product';
     const data ={
            
            'id' : id,
             'name' : name,
             'description' : description,
             'price' : price

     };
     axios.post(url,data,{
        headers: {
          'Content-Type': 'application/json',
        },}).then((response)=>{
            const result = response.data;    
            setData(result)
            });
            clear();
    };

    

    const clear=()=>
    {
        setId('');
        setName('');
        setDescription('');
        setPrice('');
    } ;
    const handleDelete=(id)=>
    {  const url2 = `https://localhost:7228/api/Product/${id}`;
    const data2 = {
            
        'id' : id,
         'name' : name,
         'description' : description,
         'price' : price

 };

        if(window.confirm("Sure you want to delete this ProductInfo?")===true)
    {
       axios.delete(url2).then((response)=>{
            getData();
            });
    }
    }

    return(
        <Fragment>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length>0 ?
            data.map((item,index)=>{
                return(
                    <tr key ={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td colSpan={2}>
                    <Button variant="outline-primary" onClick={()=>handleUpdate(item.id)}>Update</Button>{' '} &nbsp;
                    <Button variant="outline-danger" onClick={()=>handleDelete(item.id)}>Delete</Button>{' '}
                        </td>
                    </tr>
        
                )
            })
            : 'Loading.....'
        }
        
        
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={(e) => setUpdateName(e.target.value)}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              onChange={(e) => setUpdateDescription(e.target.value)}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"
            onChange={(e)=>setUpdatePrice(e.target.value)}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="outline-primary" onClick={()=>handleAdd()}>Add</Button>{' '}


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={(e) => setId(e.target.value)}>
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="number"
                
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={(e) => setName(e.target.value)}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              onChange={(e) => setDescription(e.target.value)}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"
            onChange={(e)=>setPrice(e.target.value)}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate2}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
   
        </Fragment>
    )
}

export default CRUD_Operation;


