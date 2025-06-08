import { styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Link = styled(RouterLink)`
  text-decoration: none;
  color: black;
  padding: 1rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export { Link };
