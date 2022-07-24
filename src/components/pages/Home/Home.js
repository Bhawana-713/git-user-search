import React, { useState, useEffect } from "react";

import axios from "../../../axios";
import User from "../../ui/User";
import {
  Container,
  Flex,
  Heading,
  Box,
  Input,
  Button,
  Text,
  Select,
  Spacer,
} from "@chakra-ui/react";
const Home = () => {
  const [query, setQuery] = useState("");
  //Users fetched from the API
  const [repo, setRepo] = useState([]);
  //Page
  const [page, setPage] = useState(1);
  //Per page
  const [limit, setLimit] = useState(10);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };
  const handlePrevPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const fetchRepos = async () => {
    try {
      const { data } = await axios.get("/search/repositories?q=" + query, {
        params: {
          page,
          per_page: limit,
        },
      });
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if (query) {
      const items = await fetchRepos();
      setRepo(items);
    } else {
      console.log("Your query is empty...");
    }
  };

  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (query) {
        const items = await fetchRepos();
        setRepo(items);
      }
    };

    displayUsersOnChange();
  }, [page, limit]);

  return (
    <Container maxWidth="85rem" mt={10} mb={10}>
      <Flex
        gap={3}
        flexDir={"column"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Box>
          <Heading>GitHub Repository Search</Heading>
        </Box>

        <Box mb={10}>
          <form>
            <Input
              value={query}
              onChange={handleQueryInput}
              placeholder="Enter Repository name....."
            />
            <Button colorScheme={"teal"} mt={5} onClick={handleSearchUsers}>
              Search
            </Button>
          </form>
        </Box>
      </Flex>
      <Flex flexDirection={"column"} bg="gray.100" gap={5}>
        <Flex p={5} gap={2}>
          <Text>Per Page</Text>

          <Box>
            <Select onChange={handlePageLimit}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Select>
          </Box>
          <Spacer />
          <Box>
            <Box>
              <Button onClick={handlePrevPage}>Prev</Button>
              <Button onClick={handleNextPage}>Next</Button>
            </Box>
          </Box>
        </Flex>

        <Box>
          {repo ? (
            repo.map((repos) => {
              return <User user={repos} key={repos.id} />;
            })
          ) : (
            <Text>There is nothing to display...</Text>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
