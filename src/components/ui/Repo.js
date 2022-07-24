import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Repo = ({ repo }) => {
  const { name, html_url, description, open_issues, default_branch } = repo;
  return (
    <Box p={3} mb={5}>
      <Flex flexDirection={"column"}>
        <Text color="teal">
          <a href={html_url}>Repository Name: {name}</a>
        </Text>
        <Text>{description}</Text>
        <Text>Total open issues: {open_issues}</Text>
        <Text>Default Branch: {default_branch} </Text>
      </Flex>
    </Box>
  );
};

export default Repo;
