import React from 'react';
import { MDBFooter, MDBContainer,  MDBBtn } from 'mdb-react-ui-kit';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { SiGmail } from 'react-icons/si'

export default function Footer() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-3' fluid>
        <div className='contact-us mb-2'>Contact Us</div>
        <section className='mb-1'>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FaFacebookF />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FaTwitter />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FaLinkedinIn />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FaInstagram />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <SiGmail />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FaGithub />
          </MDBBtn>
        </section>

      </MDBContainer>
    </MDBFooter>
  );
}