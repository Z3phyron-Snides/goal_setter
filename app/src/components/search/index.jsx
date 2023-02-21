// SearchBar.js

import React, { useState } from "react";
import { Container, Input, Suggestions } from "./styles";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const suggestionList = ["apple", "banana", "cherry", "date", "elderberry"];

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredSuggestions = suggestionList.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <Suggestions>
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </Suggestions>
      )}
    </Container>
  );
};

export default SearchBar;
