import Carousel from 'react-bootstrap/Carousel';
import Rooms from './room';
import R from './r';

function Home() {
  return (
    <>
    <Carousel>
      <Carousel.Item>
       <img
          className="d-block w-100"
          src="/image/slider1.jfif"
     
          style={{ height: '400px', objectFit: 'cover' }} // Keeps image clean and un-stretched
        />
        <Carousel.Caption className='custom-caption-left caption-simple'>
          <h1>sale : 50 %</h1>
          <button> BUY now</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/image/slider3.jfif"
     
          style={{ height: '400px', objectFit: 'cover' }} // Keeps image clean and un-stretched
        />
        <Carousel.Caption className='caption-simple' >
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/image/slioder2.jfif"
     
          style={{ height: '400px', objectFit: 'cover' }} // Keeps image clean and un-stretched
        />
        <Carousel.Caption className='caption-simple'>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <h1 className='text-center m-5 '> rooms </h1>
<Rooms></Rooms>

    </>
  );
}

export default Home;