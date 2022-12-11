import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(RouterLink)`
  text-decoration: none;
  outline: none;
  &:focus,
  &:hover {
    text-decoration: underline;
    color: blue;
  }
`;
