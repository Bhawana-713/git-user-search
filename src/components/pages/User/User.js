import React, { useState, useEffect } from "react";
import site from "../../assests/site.png";
import github from "../../assests/github.png";
import location from "../../assests/location.png";
import user from "../../assests/user.png";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";
import Repo from "../../ui/Repo";
import { Button, Container, Flex, Box, Text, Heading } from "@chakra-ui/react";
const User = () => {
  const { login } = useParams();

  //UserInformation
  const [userInfo, setUserInfo] = useState({});
  //User repos
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await Promise.all([
          axios.get(`/users/${login}`),
          axios.get(`/users/${login}/repos`),
        ]);
        setUserInfo(response[0].data);
        setRepos(response[1].data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInformation();
  }, []);
  return (
    <Container maxWidth="85rem">
      <Link to="/">
        <Button mt={10} mb={2} colorScheme={"teal"}>
          Back
        </Button>
      </Link>
      <Flex bg="#333" p={10} borderRadius="12px" height="300px">
        <Box width="200px">
          <img src={userInfo?.avatar_url} alt="" />
        </Box>
        <Box p={5}>
          <Text color="gray.300">{userInfo?.name}nolhn</Text>
          <Text color="gray.300">{userInfo?.bio}</Text>
          <Flex color="gray.300" gap={2} mt={3}>
            <Box width="20px">
              <img src={user} alt="" />
            </Box>
            {userInfo?.followers} Followers. Following {userInfo?.following}
          </Flex>
          <Flex color="gray.300" gap={2}>
            {userInfo?.location && (
              <>
                <Box width="20px">
                  <img src={location} alt="" />
                </Box>
                <Text> {userInfo?.location}</Text>
              </>
            )}
          </Flex>
          <Flex gap={2} color="gray.300">
            {userInfo?.blog && (
              <>
                <Box width="20px">
                  <img src={site} alt="" />
                </Box>
                <Text> {userInfo?.blog}</Text>
              </>
            )}
          </Flex>
          <Flex gap={2} color="gray.300">
            <Box width="20px">
              <img src={github} alt="" />
            </Box>
            <a href={userInfo?.html_url}>View GitHub Profile</a>
          </Flex>
        </Box>
      </Flex>
      <Flex flexDirection={"column"}>
        <Heading p={2} color="teal">
          List of Repositories
        </Heading>
        {repos ? (
          repos.map((repo) => {
            return <Repo repo={repo} key={repo.id} />;
          })
        ) : (
          <Text>No repos for this user...</Text>
        )}
      </Flex>
    </Container>
  );
};

export default User;
