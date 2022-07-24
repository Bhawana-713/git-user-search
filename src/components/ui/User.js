import { Box, Image, Flex, Text, Divider } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import { AiOutlineFork, AiTwotoneStar } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
const User = ({ user }) => {
  const {
    name,
    owner,
    watchers,
    stargazers_count,
    forks,
    description,
    updated_at,
  } = user;
  const formattedDate = Moment(updated_at).format("MMMM Do YYYY");
  return (
    <Box p={5}>
      <Flex gap={5} height="300px">
        <Box width="250px">
          <Image src={owner?.avatar_url} alt={owner?.login} />
        </Box>

        <Box>
          <Text>Author Name: {owner?.login}</Text>
          <Text>Repository Name: {name}</Text>
          <Text>Description: {description}</Text>
          <Flex mt={2} gap={10}>
            <Box>
              <AiTwotoneStar />
              {stargazers_count}
            </Box>
            <Box>
              <AiOutlineFork />
              {forks}
            </Box>

            <Box>
              <IoEyeSharp />
              {watchers}
            </Box>
          </Flex>
          <Text>Last Updated at {formattedDate}</Text>
          <Link to={`/user/${owner?.login}`}>
            <Text color={"teal"}> View full profile</Text>
          </Link>
        </Box>
      </Flex>
      <Divider border="2px solid" orientation="horizontal" />
    </Box>
  );
};

export default User;
