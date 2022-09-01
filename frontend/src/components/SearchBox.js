import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}/` : "/search");
  };
  return (
    <Form className="d-flex me-auto" onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          value={query}
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products ..."
          aria-label="Search Products"
          aria-describedby="button-search"
        />
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search">Icono</i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
