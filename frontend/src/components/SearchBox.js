import React from 'react'
import { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search')
    };

    return (
        <div>
            <Form className="d-flex me-auto" onSubmit={submitHandler}>
                <InputGroup>
                    <FormControl
                        type='text'
                        name='q'
                        id='q'
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="search products..."
                        aria-label='Search Products'
                        aria-describedby='button-search'
                    >

                    </FormControl>
                    <Button variant='outline-primary'
                        type='submit'
                        id='button-search'
                    >
                        <FaSearch />
                    </Button>
                </InputGroup>
            </Form>

        </div>
    )
}
