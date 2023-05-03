import styled from 'styled-components';

export const GalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const Alert = styled.p`
  position: absolute;
  top: 140px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.accentLight};
  padding: 20px;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  font-style: italic;
  color: ${props => props.theme.colors.error};
`;
