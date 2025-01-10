const title = 'Hello World !'

function App() {

  const hangleCLick = () => {
    alert("J'ai cliqué sur le titre !")
  }

  return <>
    <h1 onClick={hangleCLick} style={{color: 'orange', backgroundColor: 'black'}}>{title}</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vero, asperiores doloribus praesentium ipsam, saepe accusamus doloremque expedita possimus recusandae alias illum facilis omnis. Veniam libero voluptatibus enim expedita porro.</p>
  </>
}

export default App